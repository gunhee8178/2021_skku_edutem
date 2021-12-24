import re

def get_json_result(id, annotator, src_sent, tgt_sents, final_hypo, matches, data_path='data', bert_gec_path='bert-gec'):
    # print(f'src_sent : {src_sent}')
    # print(f'tgt_sent : {tgt_sent}')
    # print(f'matches : {matches}')
    type_dict = {
        "Grammar" : 0 ,
        "Usage" : 0,
        "Spelling" : 0,
        "Punctuation" : 0,
        "Other" : 0
    }
    result = {'matches' : []}
    offset_list = []
    orig = annotator.parse(src_sent)

    for seq in range(0, len(tgt_sents) ):
        tgt_sent = tgt_sents[seq]

        if tgt_sent.strip()[len(tgt_sent.strip())-1] == ',':
            tgt_sent = list(tgt_sent.strip())
            tgt_sent[len(tgt_sent)-1] = "."
            tgt_sent = ''.join(tgt_sent)

        cor = annotator.parse(tgt_sent)
        edits = annotator.annotate(orig, cor)
        source = src_sent.split()

        sub = 0
        for e in edits:
            offset = 0
            length = 0
            start_word = e.o_start
            end_word = e.o_end
            #no error is found
            if int(start_word) == -1 and int(end_word) == -1:
                continue

            tmp_c_str=e.c_str
            c_str = e.c_str
            p = re.compile('[0-9]+[.,] [0-9]+')
            m = p.search(tmp_c_str)
            while (m != None):
                tmp_c_str = tmp_c_str.replace( m.group(), ''.join(m.group().split()) )
                m = p.search(tmp_c_str)

            print("tmp_c_str", " e.o_str", tmp_c_str , e.o_str)
            if tmp_c_str == e.o_str :
                continue
            else :
                c_str = tmp_c_str

            p = re.compile(' "')
            m = p.search(tmp_c_str)
            while (m != None):
                tmp_c_str = tmp_c_str.replace( m.group(), "\"" )
                m = p.search(tmp_c_str)

            print("tmp_c_str", " e.o_str", tmp_c_str , e.o_str)
            if tmp_c_str == e.o_str :
                continue

            comp_word = e.o_str
            if start_word == end_word :
                if start_word == len(source):
                    value = ' '+c_str
                else:
                    value = c_str + ' '

            else :
                value = c_str

            comp_idx = comp_word.find('’')
            if comp_idx != -1 :
                if str(comp_word[:comp_idx]) == str(value[:comp_idx]) and str(comp_word[comp_idx +1 :]) == str(value[comp_idx +1 :]):
                    continue
            for t in source[:int(start_word)]:
                offset = offset + len(t) + 1

            for t in source[int(start_word):int(end_word)]:
                length = length + len(t)

            if c_str == '':
                length +=1

            sub = int(end_word)-int(start_word)
            if sub > 1 :
                    length += sub - 1

            # get offset from aligned text
            # try:
            #     offset = matches[offset]
            # except KeyError:
            #     print(f'** KeyError Occured at index {offset}. Check out the log file. **')
            #     with open('log.txt', 'a') as file:
            #         file.write(src_sent)
                # return {f'message' : 'KeyError occured from matches ({offset}). Check it out.', 'matches' : matches}


            cat = sort_category(e.type)

            hypo = final_hypo[seq][e.c_start: e.c_end].tolist()
            if seq == 0 :
                result['matches'].append({'replacements':[{'value':value, 'hypo': hypo , 'type' : e.type, 'category' : cat}], 'offset' : offset, 'length' : length })
                offset_list.append(offset);
                try:
                    type_dict[cat] += 1
                except Exception as e:
                    pass

            else :
                try:
                    t_idx = offset_list.index( offset )
                    if result['matches'][t_idx]['length'] == length:
                        for replacement in result['matches'][t_idx]['replacements'] :
                            if replacement['value'] == value :
                                flag = 0
                                break
                        if flag :
                            result['matches'][t_idx]['replacements'].append({'value':value, 'hypo': hypo , 'type' : e.type, 'category' : cat})
                        flag = 1

                except Exception as err:
                    pass

        # print("hypo",hypo)
    result["type_dict"] = type_dict
    return result

def sort_category(e):
    type_dict = {}
    type_dict['Grammar'] = ['ADJ', 'ADV', 'NOUN', 'PART', 'PREP', 'PRON', 'VERB', 'WO', 'NOUN:INFL', 'VERB:FORM', 'VERB:INFL']
    type_dict['Usage'] = ['CONJ', 'DET', 'CONTR', 'MORPH', 'ORTH', 'ADJ:FORM', 'NOUN:NUM', 'NOUN:POSS', 'VERB:SVA', 'VERB:TENSE']
    type_dict['Spelling'] = ['SPELL']
    type_dict['Punctuation'] = ['PUCNT']
    type_dict['Other'] = ['OTHER']

    type_info = e.split(':', 1)[-1]
    category = 'Other'
    for key in type_dict.keys():
        if type_info in type_dict[key]:
            category = key
            break

    return category
