mkdir data

echo Loading bert-gec
git clone https://github.com/kanekomasahiro/bert-gec.git

echo Loading bert-nmt
git clone https://github.com/bert-nmt/bert-nmt.git bert-gec/bert-nmt

cd bert-gec/scripts

###########################################################

echo Loading subword
git clone https://github.com/rsennrich/subword-nmt.git ../subword

echo Loading gec-pseudodata
git clone https://github.com/butsugiri/gec-pseudodata.git ../gec-pseudodata

echo Loading pre-trained GEC model
mkdir -p ../pseudo_model
wget -P ../pseudo_model https://gec-pseudo-data.s3-ap-northeast-1.amazonaws.com/ldc_giga.spell_error.pretrain.checkpoint_last.pt

echo Loading pre-trained BERT model
mkdir -p ../bert-base-cased
wget "https://huggingface.co/bert-base-cased/resolve/main/vocab.txt" -O ../bert-base-cased/vocab.txt
wget "https://huggingface.co/bert-base-cased/resolve/main/config.json" -O ../bert-base-cased/config.json
wget "https://huggingface.co/bert-base-cased/resolve/main/pytorch_model.bin" -O ../bert-base-cased/pytorch_model.bin

echo Loading Google Download Tool
git clone https://github.com/chentinghao/download_google_drive.git

echo Loading pre-trained BERT-GEC model
mkdir ../bert-fuse
python download_google_drive/download_gdrive.py 15q6hg8y78aipdJU2SeJlte61PsAWCMbP ../bert-fuse/checkpoint_best.pt
python download_google_drive/download_gdrive.py 1a8r-WbZTjKa8Lu_tO1--QS33D9_3Lfmq ../bert-fuse/dict.src.txt
python download_google_drive/download_gdrive.py 1rt-987jWppWLPlkjpkh-gee_KZp59NAl ../bert-fuse/dict.trg.txt