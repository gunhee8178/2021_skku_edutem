#!/usr/bin/env python3 -u
########  imports  ##########
from __future__ import print_function
import json
import requests
import re
from flask import Flask, jsonify, request, render_template, Response
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS
import time, os
import subprocess, shlex
from werkzeug.utils import secure_filename
import errant
from pprint import pprint
from nltk.tokenize import sent_tokenize

# import torch
# from fairseq import bleu, options, progress_bar, tasks, tokenizer, utils
# from fairseq.utils import import_user_module


app = Flask(__name__)
api = Api(app)


parser = reqparse.RequestParser()
parser.add_argument('text')


@app.route('/')
@app.route('/home')
def home():
    return 'Hello, World!'





@app.route('/api/bertgec', methods=['POST', 'OPTIONS'])
def use_bertgec():
    #errant_prac()
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)
        received_frontend_text = '\n'.join([' '.join(string.split()) for string in received_frontend_text.split('\n')]) + '\n'

        # sentence split
        sent_split_txt = '\n'.join(sent_tokenize(received_frontend_text))

        diff = [i for i, (c_a, c_b) in enumerate(zip(received_frontend_text, sent_split_txt)) if c_a != c_b]
        print(f'diff : {diff}')

        dir = 'bert_gec_data'
        if not os.path.isdir(dir):
            os.makedirs(dir)
        id = str(time.time()).split('.')[1]

        incorr_name = f'{dir}/incorr_{id}.txt'
        corr_name = f'{dir}/corr_{id}.json'
        input_done_name = f'{dir}/input_done_{id}.txt'
        output_done_name = f'{dir}/output_done_{id}.txt'

        with open(incorr_name, 'w') as file:
            file.write(sent_split_txt)

        with open(input_done_name, 'w') as file:
            pass

        # wait until output done
        while True:
            if os.path.isfile(output_done_name):
                break
            else:
                time.sleep(0.01)

        with open(corr_name) as file:
            matches = json.load(file)

        os.remove(corr_name)
        os.remove(output_done_name)

        sending_api_result = {}
        sending_api_result['text'] = received_frontend_text[:-1]
        sending_api_result['matches'] = matches['matches']
        # sending_api_result['correct'] = matches['correct']
        sending_api_result['time'] = "{:.1f}".format(time.time() -start)
        response.set_data(json.dumps(sending_api_result, indent=2))

        print(sending_api_result)

    return response

@app.route('/api/bertpaper', methods=['POST', 'OPTIONS'])
def use_newbertgec():
    #errant_prac()
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)
        # received_frontend_text = '\n'.join([' '.join(string.split()) for string in received_frontend_text.split('\n')]) + '\n'

        # header={ 'accept' : "application/json", "Content-Type": "application/x-www-form-urlencoded"}
        data = {'text': received_frontend_text}
        res = requests.post("http://localhost:5001/api/bertgec", data=data)
        print(res.json())
        sending_api_result = res.json()
        sending_api_result['time'] = "{:.1f}".format(time.time() -start)
        response.set_data(json.dumps(sending_api_result, indent=2))

    return response

@app.route('/api/bertseungjae', methods=['POST', 'OPTIONS'])
def use_bertseungjaegec():
    #errant_prac()
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)
        # received_frontend_text = '\n'.join([' '.join(string.split()) for string in received_frontend_text.split('\n')]) + '\n'

        # header={ 'accept' : "application/json", "Content-Type": "application/x-www-form-urlencoded"}
        data = {'text': received_frontend_text}
        res = requests.post("http://localhost:5000/api/bertgec", data=data)
        print(res.json())
        sending_api_result = res.json()
        sending_api_result['time'] = "{:.1f}".format(time.time() -start)
        response.set_data(json.dumps(sending_api_result, indent=2))

    return response

@app.route('/api/bertgun', methods=['POST', 'OPTIONS'])
def use_bertgungec():
    #errant_prac()
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']

        # print(received_frontend_text)
        # received_frontend_text = '\n'.join([' '.join(string.split()) for string in received_frontend_text.split('\n')]) + '\n'

        # header={ 'accept' : "application/json", "Content-Type": "application/x-www-form-urlencoded"}
        data = {'text': received_frontend_text}

        res = requests.post("http://localhost:5002/api/bertgec", data=data)
        print(res.json())
        sending_api_result = res.json()
        sending_api_result['time'] = "{:.1f}".format(time.time() -start)
        response.set_data(json.dumps(sending_api_result, indent=2))

    return response

@app.route('/api/bertdanho', methods=['POST', 'OPTIONS'])
def use_bertdanhogec():
    #errant_prac()
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)
        # received_frontend_text = '\n'.join([' '.join(string.split()) for string in received_frontend_text.split('\n')]) + '\n'

        # header={ 'accept' : "application/json", "Content-Type": "application/x-www-form-urlencoded"}
        data = {'text': received_frontend_text}
        res = requests.post("http://localhost:5003/api/bertgec", data=data)
        print(res.json())
        sending_api_result = res.json()
        sending_api_result['time'] = "{:.1f}".format(time.time() -start)
        response.set_data(json.dumps(sending_api_result, indent=2))

    return response

@app.route('/api/bertjun', methods=['POST', 'OPTIONS'])
def use_bertjungec():
    #errant_prac()
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)
        # received_frontend_text = '\n'.join([' '.join(string.split()) for string in received_frontend_text.split('\n')]) + '\n'

        # header={ 'accept' : "application/json", "Content-Type": "application/x-www-form-urlencoded"}
        data = {'text': received_frontend_text}
        res = requests.post("http://localhost:5004/api/bertgec", data=data)
        print(res.json())
        sending_api_result = res.json()
        sending_api_result['time'] = "{:.1f}".format(time.time() -start)
        response.set_data(json.dumps(sending_api_result, indent=2))

    return response


@app.route('/fileupload', methods=['POST'])
def upload_file():
    path = '/home/ubuntu/workspace/edutem/ai/test_bash'
    try:
        os.remove(os.path.join(path, 'result.json'))
    except Exception as e:
        pass

    print(os.getcwd())

    incorr = request.files['incorr']
    corr = request.files['corr']

    incorrName = secure_filename(incorr.filename)
    corrName = secure_filename(corr.filename)
    try:
        incorr.save(os.path.join(path, incorrName))
        corr.save(os.path.join(path, corrName))
    except Exception as e:
        return "FAIL"

    print("bash " + path + "/execute.sh " + path)

    subprocess.call("bash " + path + "/execute.sh " + path, shell=True)

    with open(os.path.join(path, 'result.json')) as file:
        result = json.load(file)


    N = 10
    try:
        with open(os.path.join(path, 'incorrect.txt') , encoding='utf-8') as file:
            result['incorrect'] = { 'examples' : [next(file) for x in range(N)] }

        with open(os.path.join(path, 'correct.txt') , encoding='utf-8') as file:
            result['correct'] =  {'examples' : [next(file) for x in range(N)] }

        with open(os.path.join(path,'data', 'fairseq.txt'), encoding='utf-8') as file:
            result['Copy-augmented-Model']['examples'] = [next(file) for x in range(N)]

        with open(os.path.join(path,'data', 'gector.txt') , encoding='utf-8') as file:
            result['GECToR']['examples'] = [next(file) for x in range(N)]

    except Exception as e:
        result['state'] = False

    result['state'] = True

    return result

@app.route('/loadExist', methods=['POST'])
def load_ExistFile():
    path = '/home/ubuntu/workspace/edutem/ai/test_bash'
    received_frontend_data = request.get_json()

    received_frontend_id = received_frontend_data['id']
    result={}
    try:
        print('id : ', 'result_'+received_frontend_id+'.json' )
        with open(os.path.join(path,'data', received_frontend_id, 'result.json')) as file:
            result = json.load(file)
    except Exception as e:
        result['state'] = False

    N = 10
    try:
        with open(os.path.join(path,'data', received_frontend_id, 'incorrect.txt') , encoding='utf-8') as file:
            result['incorrect'] = { 'examples' : [next(file) for x in range(N)] }

        with open(os.path.join(path,'data', received_frontend_id, 'correct.txt') , encoding='utf-8') as file:
            result['correct'] =  {'examples' : [next(file) for x in range(N)] }

        with open(os.path.join(path,'data', received_frontend_id, 'fairseq.txt'), encoding='utf-8') as file:
            result['Copy-augmented-Model']['examples'] = [next(file) for x in range(N)]

        with open(os.path.join(path,'data', received_frontend_id, 'gector.txt') , encoding='utf-8') as file:
            result['GECToR']['examples'] = [next(file) for x in range(N)]

    except Exception as e:
        result['state'] = False

    result['state'] = True
    return result

@app.route('/getrandom', methods=['POST'])
def randomSentence():
    response = Response()
    received_frontend_data = request.get_json()
    number = str(received_frontend_data['num'])

    result = examples[number]
    response.set_data(json.dumps(result, indent=3))

    return response

# request 내용을 그대로 반환해주는 함수
def proxy_request(request, url):
    resp = requests.request(
        method=request.method,
        # url=request.url.replace(':5000', ':4200'),
        url=url,
        headers={key: value for (key, value) in request.headers if key != 'Host'},
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False)
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in resp.raw.headers.items()
            if name.lower() not in excluded_headers]
    response = Response(resp.content, resp.status_code, headers)

    return response

@app.route('/api/tts', methods=['POST'])
def get_tts():
    return proxy_request(request, 'http://localhost:5100/api/tts')

@app.route('/api/tts_t2', methods=['POST'])
def get_tts_t2():
    return proxy_request(request, 'http://localhost:5100/api/tts_t2')

@app.route('/api/tts_t3', methods=['POST'])
def get_tts_t3():
    return proxy_request(request, 'http://localhost:5100/api/tts_t3')

@app.route('/api/stt_v2', methods=['POST'])
def get_stt():
    return proxy_request(request, 'http://localhost:5101/api/wav2vec')

@app.route('/api/gpt_j', methods=['POST'])
def get_gpt_j():
	return proxy_request(request, 'http://localhost:5102/api/gpt_j')

@app.route('/api/paraphrase', methods=['POST'])
def get_paraphrase():
	return proxy_request(request, 'http://localhost:5103/api/paraphrase')

# api.add_resource(UseFairseq, '/postFairseq')
if __name__ == '__main__':

    path = '/home/ubuntu/workspace/edutem/demoPage/backend/data'
    with open(os.path.join('./testData/test.json') ) as file:
        examples = json.load(file)

    app.run(host='0.0.0.0', port=8888, debug=True)
