from flask import Flask
from flask_restx import Api

from bertgec_ns import bertgec_ns

app = Flask(__name__)
api = Api(app=app,
		  version="1.0",
		  title="Edutem BERT-GEC API",
		  description="""Grammatical Error Correction API with BERT-GEC""")

api.add_namespace(bertgec_ns, '/api/bertgec')

if __name__ == "__main__":
	app.run(debug=False, host='0.0.0.0', port=5000)
