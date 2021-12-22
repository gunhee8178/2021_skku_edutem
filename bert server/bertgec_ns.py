"""
Translate raw text with a trained model. Batches data on-the-fly.
"""
import time
import os
import sys
import argparse
import numpy as np
import re

import errant
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize as word_tokenize_nltk

from flask import request, Response
from flask_restx import Resource, Namespace, reqparse

# append system path in bert-gec
sys.path.append('bert-gec/bert-nmt')
from fairseq import checkpoint_utils, tasks, utils
from bert import BertTokenizer

from fairseq_utils import *
from my_utils import *
import detok

def replaceQuot(sent):
    while sent.find("``") > -1:
        sent = sent.replace("``", '"')
    while sent.find("''") > -1:
        sent = sent.replace("''", '"')

    while sent.find("“") > -1:
        sent = sent.replace("“", '"')
    while sent.find("”") > -1:
        sent = sent.replace("”", '"')

    while sent.find("`") > -1:
        sent = sent.replace("`", "'")

    while sent.find("’") > -1:
        sent = sent.replace("’", "'")
    while sent.find("‘") > -1:
        sent = sent.replace("‘", "'")


    return sent

args = argparse.Namespace(beam=5, bert_first=True, bert_gates=[1, 1, 1, 1, 1, 1], bert_model_name='bert-base-cased',
        bert_output_layer=-1, bert_ratio=1.0, buffer_size=1024, change_ratio=False, cpu=False,
        criterion='cross_entropy', data='bert-gec/bert-fuse', dataset_impl='cached', decoder_no_bert=False, diverse_beam_groups=-1,
        diverse_beam_strength=0.5, encoder_bert_dropout=False, encoder_bert_dropout_ratio=0.25, encoder_bert_mixup=False, encoder_ratio=1.0,
        finetune_bert=False, force_anneal=None, fp16=False, fp16_init_scale=128, fp16_scale_tolerance=0.0, fp16_scale_window=None,
        gen_subset='test', input='-', lazy_load=False, left_pad_source='True', left_pad_target='False', lenpen=1, log_format='simple', log_interval=1000,
        lr_scheduler='fixed', lr_shrink=0.1, mask_cls_sep=False, match_source_len=False, max_len_a=0, max_len_b=200, max_sentences=32,
        max_source_positions=1024, max_target_positions=1024, max_tokens=None, memory_efficient_fp16=False, min_len=1, min_loss_scale=0.0001,
        model_overrides='{}', momentum=0.99, nbest=5, no_beamable_mm=False, no_early_stop=False, no_progress_bar=True, no_repeat_ngram_size=0,
        num_shards=1, num_workers=0, optimizer='nag', path='bert-gec/bert-fuse/checkpoint_best.pt', prefix_size=0, print_alignment=False, quiet=False,
        raw_text=False, remove_bpe='@@ ', replace_unk=None, required_batch_size_multiple=8, results_path=None, sacrebleu=False, sampling=False, sampling_topk=-1,
        score_reference=False, seed=1, shard_id=0, skip_invalid_size_inputs_valid_test=False, source_lang='src', target_lang='trg', task='translation',
        tbmf_wrapper=False, temperature=1.0, tensorboard_logdir='', threshold_loss_scale=None, unkpen=0, unnormalized=False, upsample_primary=1, user_dir=None,
        warmup_from_nmt=False, warmup_nmt_file='checkpoint_nmt.pt', warmup_updates=0, weight_decay=0.0)

utils.import_user_module(args)

if args.buffer_size < 1:
    args.buffer_size = 1
if args.max_tokens is None and args.max_sentences is None:
    args.max_sentences = 1

assert not args.sampling or args.nbest == args.beam, \
    '--sampling requires --nbest to be equal to --beam'
assert not args.max_sentences or args.max_sentences <= args.buffer_size, \
    '--max-sentences/--batch-size cannot be larger than --buffer-size'

use_cuda = torch.cuda.is_available() and not args.cpu

# Setup task, e.g., translation
task = tasks.setup_task(args)

# Load ensemble
print('| loading model(s) from {}'.format(args.path))
models, _model_args = checkpoint_utils.load_model_ensemble(
    args.path.split(':'),
    arg_overrides=eval(args.model_overrides),
    task=task,
)

# Set dictionaries
src_dict = task.source_dictionary
tgt_dict = task.target_dictionary

# Optimize ensemble for generation
for model in models:
    model.make_generation_fast_(
        beamable_mm_beam_size=None if args.no_beamable_mm else args.beam,
        need_attn=args.print_alignment,
    )
    if args.fp16:
        model.half()
    if use_cuda:
        model.cuda()

# Initialize generator
generator = task.build_generator(args)

# Hack to support GPT-2 BPE
if args.remove_bpe == 'gpt2':
    from fairseq.gpt2_bpe.gpt2_encoding import get_encoder
    decoder = get_encoder(
        'fairseq/gpt2_bpe/encoder.json',
        'fairseq/gpt2_bpe/vocab.bpe',
    )
    encode_fn = lambda x: ' '.join(map(str, decoder.encode(x)))
else:
    decoder = None
    encode_fn = lambda x: x

# Load alignment dictionary for unknown word replacement
# (None if no unknown word replacement, empty if no path to align dictionary)
align_dict = utils.load_align_dict(args.replace_unk)

max_positions = utils.resolve_max_positions(
    task.max_positions(),
    *[model.max_positions() for model in models]
)

bertdict = BertTokenizer.from_pretrained(args.bert_model_name)
annotator = errant.load('en')

print('Model Ready')


bertgec_ns = Namespace(
	name='BERT-GEC',
	description='BERT-GEC API'
)

parser = reqparse.RequestParser()
parser.add_argument('text', required=True, type=str, location='form', default='I goed to school with my friend.', help='문법 교정을 실행할 텍스트')

@bertgec_ns.route('')
class Bertgec(Resource):
    @bertgec_ns.expect(parser)
    def post(self):
        """문법 교정 결과를 가져옵니다."""
        print('============================================================')
        try:
            original_text = request.form['text']
        except KeyError:
            return Response('{"message" : "text가 필요합니다."}', status=403, mimetype='application/json')
        tgt_sents = []
        final_hypos = []
        file_id = str(time.time()).split('.')[1]
        print(f'file id : {file_id}')
        data_path = 'data'
        bert_gec_path = 'bert-gec'
        file = {
            'bpe_src' : f'{data_path}/test_{file_id}.bpe.src',
            'bert_src' : f'{data_path}/test_{file_id}.bert.src',
            'cat_src' : f'{data_path}/test_{file_id}.cat.src',
            'incorr' : f'{data_path}/incorr_{file_id}.txt',
        }

        # take off spaces and split
        original_sentences = original_text.split('\n')
        for i in range(0,len(original_sentences)):
            original_sentences[i]  = replaceQuot(original_sentences[i] )
            # print("original_sentences[i]", original_sentences[i])
        original_text = '\n'.join(original_sentences)
        print(original_text)

        p1 = re.compile('[.,?!]{2,}')
        m = p1.search(original_text)
        while (m != None):
            original_text = original_text.replace(m.group(), m.group()[0])
            # print("m.group() : ",m.group(), "m.group()[0] : ", m.group()[0])
            m = p1.search(original_text)

        p2 = re.compile('[^a-zA-Z0-9 .,?!]{2,}')
        m = p2.search(original_text)
        while (m != None):
            original_text = original_text.replace(m.group(), '')
            # print("m.group() : ",m.group(), "m.group()[0] : ", m.group()[0])
            m = p2.search(original_text)


        # model_input_text = ' '.join(original_words)
        #
        # model_input_text = '\n'.join(sent_tokenize(model_input_text))



        original_sentences = sent_tokenize(original_text)
        # start for
        matches = {}
        sentence_idx = 0
        for original_sentence in original_sentences:
            original_sentence = replaceQuot(original_sentence)
            with open(file["incorr"], 'w') as write_file:
                write_file.write(original_sentence)

            # aligned_text = '\n'.join([' '.join(string.split()) for string in original_text.split('\n')])
            # aligned_text = '\n'.join(sent_tokenize(aligned_text))

            # get matches


            # preprocessing part
            os.system(f'{bert_gec_path}/subword/apply_bpe.py -c {bert_gec_path}/gec-pseudodata/bpe/bpe_code.trg.dict_bpe8000 < {file["incorr"]} > {file["bpe_src"]}')
            detok.main(['', file['incorr'], file['bert_src']])
            os.system(f'paste -d "\n" {file["bpe_src"]} {file["bert_src"]} > {file["cat_src"]}')

            # model prediction part
            start_id = 0
            besthypo = 0

            special_tok = ["n\'t", "\'m", "\'re", "\'s", "\'ve", "\'ll", ".", ",", "!", "?", "\'", "\"" ]
            for inputs in buffered_read(file["cat_src"], args.buffer_size):
                results = []
                for batch in make_batches(inputs, args, task, max_positions, encode_fn, bertdict):
                    src_tokens = batch.src_tokens
                    src_lengths = batch.src_lengths
                    bert_input = batch.bert_input
                    if use_cuda:
                        src_tokens = src_tokens.cuda()
                        src_lengths = src_lengths.cuda()
                        bert_input = bert_input.cuda()
                    sample = {
                        'net_input': {
                            'src_tokens': src_tokens,
                            'src_lengths': src_lengths,
                            'bert_input': bert_input
                        },
                    }
                    translation_start = time.time()
                    translations = task.inference_step(generator, models, sample)
                    translation_end = time.time()
                    print(f'trans time : {format(translation_end - translation_start, ".4f")}s')

                    for i, (id, hypos) in enumerate(zip(batch.ids.tolist(), translations)):
                        src_tokens_i = utils.strip_pad(src_tokens[i], tgt_dict.pad())
                        results.append((start_id + id, src_tokens_i, hypos))
                # sort output to match input order
                for id, src_tokens, hypos in sorted(results, key=lambda x: x[0]):
                    if src_dict is not None:
                        src_str = src_dict.string(src_tokens, args.remove_bpe)
                        # print('S-{}\t{}'.format(id, src_str))

                    # Process top predictions
                    for i, hypo in enumerate(hypos[:min(len(hypos), 3)]):
                        result_str = []
                        hypo_tokens, hypo_str, alignment = utils.post_process_prediction(
                            hypo_tokens=hypo['tokens'].int().cpu(),
                            src_str=src_str,
                            alignment=hypo['alignment'].int().cpu() if hypo['alignment'] is not None else None,
                            align_dict=align_dict,
                            tgt_dict=tgt_dict,
                            remove_bpe=args.remove_bpe,
                        )
                        # do n't
                        if decoder is not None:
                            hypo_str = decoder.decode(map(int, hypo_str.strip().split()))
                        '''
                        print('H-{}\t{}\t{}'.format(id, hypo['score'], hypo_str))
                        print('P-{}\t{}'.format(
                            id,
                            ' '.join(map(lambda x: '{:.4f}'.format(x), hypo['positional_scores'].tolist()))
                        ))
                        if args.print_alignment:
                            print('A-{}\t{}'.format(
                                id,
                                ' '.join(map(lambda x: str(utils.item(x)), alignment))
                            ))
                        '''

                        # save only for the best one

                        final_hypo = []
                        hypo_str_list = hypo_str.split()
                        hypo_list = hypo['positional_scores'].tolist()
                        for seq in range(0, len(hypo_str_list)):
                            if hypo_str_list[seq] in special_tok :
                                try:
                                    tmp = final_hypo.pop()
                                    final_hypo.append( (hypo_list[seq]+tmp)/2  )
                                except Exception as e:
                                    final_hypo.append(hypo_list[seq])
                            else :
                                final_hypo.append(hypo_list[seq])


                        final_hypo = np.exp(final_hypo)
                        final_hypo = np.round(final_hypo,2)
                        if sentence_idx==0:
                            final_hypos.append(final_hypo)

                            result_str.append(hypo_str)
                            tgt_sents.append('\n'.join(list(map(detok.detok, result_str))))

                        else:
                            final_hypos[i] = np.concatenate((final_hypos[i], final_hypo))
                            # final_hypos[i].extend(final_hypo)
                            result_str.append(hypo_str)
                            tgt_sents[i] = tgt_sents[i] + '\n' +('\n'.join(list(map(detok.detok, result_str))))

                        if i==0:
                            besthypo = np.exp(hypo['score'])

                # update running id counter
                start_id += len(inputs)/2
            # remove every file created
            for _, name in file.items():
                os.remove(name)
            sentence_idx = sentence_idx+1
        # end for
        src_sent = original_text


        # get offset by errant
        result = get_json_result(file_id, annotator, src_sent, tgt_sents, final_hypos, matches, data_path, bert_gec_path)
        result["text"] = original_text
        result["corText"] = tgt_sents[0]
        result['hypo'] = round(besthypo,2)
        return result
