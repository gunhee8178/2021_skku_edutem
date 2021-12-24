# SKKU_EDUTEM AI MODEL 영어 문법 교정

## 시스템 구조도
![image](https://user-images.githubusercontent.com/22341303/147368307-69979245-1998-4ca4-ac24-543fbc7b4370.png)

### Front End
In Front end folder
```
npm start
``` 

### Back End
In Back end folder
```
python3 backend.py
```

### Bert-Gec Server
In Bert server folder 
```
git clone https://github.com/kanekomasahiro/bert-gec 
cd scripts
./setup.sh
```

## Requirements
- python >= 3.5
- torch == 1.1.0
- [bert-nmt](https://github.com/bert-nmt/bert-nmt)
- [subword](https://github.com/rsennrich/subword-nmt)
- [gec-pseudodata](https://github.com/butsugiri/gec-pseudodata)
- [ERRANT v2.3.0](https://github.com/chrisjbryant/errant)
