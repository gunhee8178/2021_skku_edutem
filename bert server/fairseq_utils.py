from collections import namedtuple
import fileinput

import torch

Batch = namedtuple('Batch', 'ids src_tokens src_lengths bert_input')
Translation = namedtuple('Translation', 'src_str hypos pos_scores alignments')


def buffered_read(input, buffer_size):
    buffer = []
    with fileinput.input(files=[input], openhook=fileinput.hook_encoded("utf-8")) as h:
        for src_str in h:
            buffer.append(src_str.strip())
            if len(buffer) >= buffer_size:
                yield buffer
                buffer = []
    if len(buffer) > 0:
        yield buffer


def make_batches(lines, args, task, max_positions, encode_fn, bertdict):
    oldlines = lines
    lines = oldlines[0::2]
    bertlines = oldlines[1::2]
    tokens = [
        task.source_dictionary.encode_line(
            encode_fn(src_str), add_if_not_exist=False
        ).long()
        for src_str in lines
    ]
    def getbert(line):
        line = line.strip()
        line = '{} {} {}'.format('[CLS]', line, '[SEP]')
        tokenizedline = bertdict.tokenize(line)
        if len(tokenizedline) > bertdict.max_len:
            tokenizedline = tokenizedline[:bertdict.max_len - 1]
            tokenizedline.append('[SEP]')
        words = bertdict.convert_tokens_to_ids(tokenizedline)
        nwords = len(words)
        ids = torch.IntTensor(nwords)
        for i, word in enumerate(words):
            ids[i] = word
        return ids.long()
    berttokens = [getbert(x) for x in bertlines]
    lengths = torch.LongTensor([t.numel() for t in tokens])
    bertlengths = torch.LongTensor([t.numel() for t in berttokens])
    itr = task.get_batch_iterator(
        dataset=task.build_dataset_for_inference(tokens, lengths, berttokens, bertlengths, bertdict),
        max_tokens=args.max_tokens,
        max_sentences=args.max_sentences,
        max_positions=max_positions,
    ).next_epoch_itr(shuffle=False)
    for batch in itr:
        yield Batch(
            ids=batch['id'],
            src_tokens=batch['net_input']['src_tokens'], src_lengths=batch['net_input']['src_lengths'],
            bert_input=batch['net_input']['bert_input']
        )