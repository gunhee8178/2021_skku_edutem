FROM python:3.7.11

WORKDIR /app
# COPY . /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "import nltk; nltk.download('punkt')"
RUN python3 -m spacy download en
# RUN bash -c "./setup.sh"
CMD CUDA_VISIBLE_DEVICES=0 FLASK_APP=api.py flask run --host=0.0.0.0 --port=5000
