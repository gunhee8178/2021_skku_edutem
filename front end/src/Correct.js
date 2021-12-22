import axios from 'axios';
import React, { useState } from 'react'
import img_1 from './img/sign1.PNG'
import img_2 from './img/sign2.PNG'


// import GrammarBot from './API/GrammarBot';
// import LanguageTool from './API/LanguageTool';
// import LanguageToolPy from './API/LanguageToolPy';
// import LanguageTooljava from './API/LanguageToolJava';
// import LanguageToolNgram from './API/LanguageToolNgram';

// import TextGears from './API/TextGears';
// import ProWritingAid from './API/ProWritingAid';
// import Gector from './API/Gector';
// import FairSeq from './API/FairSeq';
// import BertGec from './API/BertGec';
import NewBertGec from './API/NewBertGec';
//import NewOutput from './API/NewOutput';


// import GingerIt from './API/GingerIt';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Card from 'react-bootstrap/Card'

import {
  alpha,
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme
} from "@material-ui/core/styles";

function Test() {
    // const ref = React.useRef();

    let [text, setText] = useState("");
    let [noText, setNoText] = useState("영어 문장을 입력해주세요.");
    const [loading, setLoading] = useState(false);

    // let [grammarBotTime, setGrammarBotTime] = useState(0);
    // let [resultGrammarBot, setResultGrammarBot] = useState(null);
    //
    // let [languageToolTime, setLanguageToolTime] = useState(0);
    // let [resultLanguageTool, setResultLanguageTool] = useState(null);
    // // 추가한부분
    // let[languageToolJavaTime, setLanguageToolJavaTime]=useState(0);
    // let [resultLanguageToolJava, setResultLanguageToolJava]=useState(null);
    //
    // let [languageToolPyTime, setLanguageToolPyTime] = useState(0);
    // let [resultLanguageToolPy, setResultLanguageToolPy] = useState(null);
    //
    // let [languageToolNgramTime, setLanguageToolNgramTime] = useState(0);
    // let [resultLanguageToolNgram, setResultLanguageToolNgram] = useState(null);

    let [bertGecSeungTime, setBertGecSeungTime] = useState(0);
    let [resultBertGecSeung, setResultBertGecSeung] = useState(null);
    let [bertGecSeungHypo, setBertGecSeungHypo] = useState(0);

    let [bertGecGunTime, setBertGecGunTime] = useState(0);
    let [resultBertGecGun, setResultBertGecGun] = useState(null);
    let [bertGecGunHypo, setBertGecGunHypo] = useState(0);

    let [bertGecEduTime, setBertGecEduTime] = useState(0);
    let [resultBertGecEdu, setResultBertGecEdu] = useState(null);

    let [bertGecDanhoTime, setBertGecDanhoTime] = useState(0);
    let [resultBertGecDanho, setResultBertGecDanho] = useState(null);
    let [bertGecDanhoHypo, setBertGecDanhoHypo] = useState(0);

    let [bertGecJunTime, setBertGecJunTime] = useState(0);
    let [resultBertGecJun, setResultBertGecJun] = useState(null);
    let [bertGecJunHypo, setBertGecJunHypo] = useState(0);

    let [bertGecPaperTime, setBertGecPaperTime] = useState(0);
    let [resultBertGecPaper, setResultBertGecPaper] = useState(null);
    let [bertGecPaperHypo, setBertGecPaperHypo] = useState(0);

    // let [textGearsTime, setTextGearsTime] = useState(0);
    // let [resultTextGears, setResultTextGears] = useState(null);
    //
    // let [proWritingAidTime, setProWritingAidTime] = useState(0);
    // let [resultProWritingAid, setResultProWritingAid] = useState(null);
    //
    // let [gectorTime, setGectorTime] = useState(0);
    // let [resultGector, setResultGector] = useState(null);
    //
    // let [fairSeqTime, setFairSeqTime] = useState(0);
    // let [resultFairSeq, setResultFairSeq] = useState(null);
    // let [fairSeqLoading, setFairSeqLoading] =useState(null);
    //
    // let [bertGecTime, setBertGecTime] = useState(0);
    // let [resultBertGec, setResultBertGec] = useState(null);
    // let [bertGecLoading, setBertGecLoading] = useState(false)
    //
    // let [gingerItTime, setGingerItTime] = useState(0);
    // let [resultGingerIt, setResultGingerIt] = useState(null);
    // let [result, setResult] = useState("");

    const [state, setState] = React.useState({
        // languageToolJavaChecked: true,
        // languageToolNgramChecked: true,
        // gectorChecked: true,
        // bertChecked: true,
        // fairseqChecked: true,
        bertGecSeungChecked: true,
        bertGecGunChecked: true,
        bertGecEduChecked: true,
        bertGecDanhoChecked: true,
        bertGecJunChecked: true,
        bertGecPaperChecked : true,
    });

    const handleChange_c = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const clear = () =>{
        // setGrammarBotTime(0);
        // setResultGrammarBot(null);
        //
        // setLanguageToolTime(0);
        // setResultLanguageTool(null);
        //
        // setTextGearsTime(0);
        // setResultTextGears(null);
        // // 추가한 부분
        // setLanguageToolJavaTime(0);
        // setResultLanguageToolJava(null);
        //
        // setLanguageToolNgramTime(0);
        // setResultLanguageToolNgram(null);
        //
        // setLanguageToolPyTime(0);
        // setResultLanguageToolPy(null);
        //
        // setProWritingAidTime(0);
        // setResultProWritingAid(null);
        //
        // setGectorTime(0);
        // setResultGector(null);
        //
        // setFairSeqTime(0);
        // setResultFairSeq(null);
        //
        // setBertGecTime(0);
        // setResultBertGec(null);
        //
        // setGingerItTime(0);
        // setResultGingerIt(null);

        setBertGecSeungTime(0);
        setResultBertGecSeung(null);

        setBertGecGunTime(0);
        setResultBertGecGun(null);
        setBertGecGunHypo(0);

        setBertGecDanhoTime(0);
        setResultBertGecDanho(null);

        setBertGecJunTime(0);
        setResultBertGecJun(null);

        setBertGecPaperTime(0);
        setResultBertGecPaper(null);

    }

    const clearAll = () => {
        setText("");
        setNoText("문자을 입력해주세요.")
        clear();
        setResultBertGecEdu(null)
    }

    // const postGrammarbot = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/grammarbot', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             setResultGrammarBot(result)
    //             setGrammarBotTime(result['time'])
    //
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister()
    // }
    //
    // const postLanguageTool = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/languagetool', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             setResultLanguageTool(result)
    //             setLanguageToolTime(result['time'])
    //         })
    //         .catch(error => {
    //             setResultLanguageTool(null)
    //             console.error(error);
    //         });
    //         // unregister()
    // }
    //
    // const postLanguageToolpY = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/languagetoolpy', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             // console.log(result)
    //             setResultLanguageToolPy(result)
    //             setLanguageToolPyTime(result['time'])
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister()
    // }
    //
    // // 추가한 부분
    // const postLanguageToolNgram = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/languagetoolngram', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             // console.log(result)
    //             setResultLanguageToolNgram(result)
    //             setLanguageToolNgramTime(result['time'])
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister()
    // }
    //
    // const postLanguageToolJava = () => {
    //     const data={text : text};
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/languagetooljava', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             // console.log(result)
    //             setResultLanguageToolJava(result)
    //             setLanguageToolJavaTime(result['time'])
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister()
    // }
    //
    // const postTextGears = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/textGears', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             setResultTextGears(result)
    //             setTextGearsTime(result['time'])
    //             // console.log("textGears", result)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister(
    // }
    //
    // const postProWritingGaid = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/proWritingAid', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             setResultProWritingAid(result)
    //             setProWritingAidTime(result['time'])
    //             // console.log("proWritingAid" , result)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister(
    // }
    //
    // const postGector = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/gector', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             setResultGector(result)
    //             setGectorTime(result['time'])
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    //
    // const postFairSeq = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //     setFairSeqLoading(true)
    //     // fetch('/api/fairseq', requestOptions)
    //     //     .then(response => response.json())
    //     //     .then( (result) => {
    //     //         // console.log(result)
    //     //         setResultFairSeq(result)
    //     //         setFairSeqTime(result['time'])
    //     //     })
    //     //     .catch(error => {
    //     //         console.error(error);
    //     //     });
    //         // unregister
    //
    //     fetch('/postFairseq', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             // console.log(result)
    //             setResultFairSeq(result)
    //             setFairSeqTime(result['time'])
    //             setFairSeqLoading(false);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setFairSeqLoading(false);
    //         });
    // }
    //
    // const postBertGec = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //     setBertGecLoading(true)
    //     fetch('/api/bertgec', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             // console.log(result)
    //             setResultBertGec(result)
    //             setBertGecTime(result['time'])
    //             setBertGecLoading(false)
    //             // console.log("proWritingAid" , result)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setBertGecLoading(false);
    //         });
    //         // unregister(
    // }
    //
    // const postGingerIt = () => {
    //     const data= { text : text };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //         },
    //         body : JSON.stringify(data)
    //     };
    //
    //     fetch('/api/gingerit', requestOptions)
    //         .then(response => response.json())
    //         .then( (result) => {
    //             // console.log(result)
    //             setResultGingerIt(result)
    //             setGingerItTime(result['time'])
    //             // console.log("proWritingAid" , result)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    //         // unregister(
    // }

    const postBertPaper = () => {
        const data= { text : text };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body : JSON.stringify(data)
        };

        fetch('/api/bertpaper', requestOptions)
            .then(response => response.json())
            .then( (result) => {
                // console.log(result)
                setResultBertGecPaper(result);
                setBertGecPaperTime(result['time']);
                setBertGecPaperHypo(result['hypo'])
                // console.log("proWritingAid" , result)
            })
            .catch(error => {
                console.error(error);
            });
            // unregister(
    }

    const postBertSeungjae = () => {
        const data= { text : text };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body : JSON.stringify(data)
        };

        fetch('/api/bertseungjae', requestOptions)
            .then(response => response.json())
            .then( (result) => {
                // console.log(result)
                setResultBertGecSeung(result);
                setBertGecSeungTime(result['time']);
                setBertGecSeungHypo(result['hypo']);
                // console.log("proWritingAid" , result)
            })
            .catch(error => {
                console.error(error);
            });
            // unregister(
    }

    const postBertGun = () => {
        const data= { text : text };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body : JSON.stringify(data)
        };

        fetch('/api/bertgun', requestOptions)
            .then(response => response.json())
            .then( (result) => {
                // console.log(result)
                setResultBertGecGun(result)
                setBertGecGunTime(result['time'])
                setBertGecGunHypo(result['hypo'])
                // console.log("proWritingAid" , result)
            })
            .catch(error => {
                console.error(error);
            });
            // unregister(
    }
    const postBertDanho = () => {
        const data= { text : text };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body : JSON.stringify(data)
        };

        fetch('/api/bertdanho', requestOptions)
            .then(response => response.json())
            .then( (result) => {
                // console.log(result)
                setResultBertGecDanho(result);
                setBertGecDanhoTime(result['time']);
                setBertGecDanhoHypo(result['hypo']);
                // console.log("proWritingAid" , result)
            })
            .catch(error => {
                console.error(error);
            });
            // unregister(
    }
    const postBertJun = () => {
        const data= { text : text };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body : JSON.stringify(data)
        };

        fetch('/api/bertjun', requestOptions)
            .then(response => response.json())
            .then( (result) => {
                // console.log(result)
                setResultBertGecJun(result);
                setBertGecJunTime(result['time']);
                setBertGecJunHypo(result['hypo']);
                // console.log("proWritingAid" , result)
            })
            .catch(error => {
                console.error(error);
            });
            // unregister(
    }

    const  post = () =>{
        // if(state['gectorChecked']) {postGector() ;}
        // if(state['fairseqChecked']){postFairSeq() ;}
        // if(state['bertChecked']){postBertGec() ;}
        // if(state['languageToolNgramChecked']){postLanguageToolNgram();}
        // if(state['languageToolJavaChecked']){postLanguageToolJava();}
        // postGrammarbot();
        // postLanguageTool()
        // postTextGears();
        // postProWritingGaid()
        // postLanguageToolpY()

        // postGingerIt()
        if(state['bertGecSeungChecked']){postBertSeungjae();}
        if(state['bertGecGunChecked']){postBertGun()};
        if(state['bertGecDanhoChecked']){postBertDanho();}
        if(state['bertGecJunChecked']){postBertJun();}
        if(state['bertGecPaperChecked']){postBertPaper();}
    }

    const postData = async ()  =>{
         if( !text ){
             setNoText("빈칸은 허용되지 않습니다.")
             console.log("No DATA")
             return;
         }

         await clear();
         setLoading(true);
         try {
             post();
         } catch (e) {
             Error(e)
         }finally{
             setLoading(false)
         }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const getRandom = async () =>{
        var num = getRandomInt(1346);
        var data = { 'num': num };
        await setResultBertGecEdu(null);

        axios.post('/getrandom', data)
            .then( (result) => {
                setText(result['data']['text']);
                if(state['bertGecEduChecked']){setResultBertGecEdu(result['data'])};
            })
            .catch(error => {
                console.error(error);
            });
    }


    // const inputStyle = {
    //         height : "60px",
    //         width:"70%",
    //     }

    const propsStyle = {
        fontFamily: 'Spartan',
        fontSize: "17pt",
        // lineHeight: "1.3em",
    }


  return (
    <div className="App">
        <div id='wrapper'>
            <div id="inputPanel">

                <div id="inputPanel-upper">
                    <div>
                        <textarea id='input'  value={text} onChange={handleChange} placeholder={noText}/>
                    </div>
                </div>

                <div id="inputPanel-lower">
                    <Button  variant="outline-primary"  size='sm' onClick={ ()=> postData() } >Submit</Button>
                    <ButtonGroup id='buttonPanel'>
                        <Button  variant="outline-primary"  onClick={ () => getRandom()}>Random</Button>
                        <Button  variant="outline-primary"  onClick={ ()=> clearAll() } >Clear</Button>
                    </ButtonGroup >
                </div>
            </div>

            <div id="apiPanel" >


                {/*
                    <TextField
                        style={inputStyle}
                        id="standard-multiline-flexible"
                        multiline
                        rows={2}
                        size='Normal'
                        value={text}
                        onChange={handleChange}
                        placeholder={noText}
                        inputProps={ {style: {
                            fontSize : '20pt', lineHeight : '1.5em'
                        }}}
                    />
                     <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Language ToolPy<span style={{float:"right"}}>{languageToolPyTime} ms</span></div>
                    <LanguageToolPy result = {resultLanguageToolPy}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Language Tool Ngram<span style={{float:"right"}}>{languageToolNgramTime} ms</span></div>
                    <LanguageToolNgram result = {resultLanguageToolNgram}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Language Tool Java<span style={{float:"right"}}>{languageToolJavaTime} ms</span></div>
                    <LanguageTooljava result = {resultLanguageToolJava}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>GECToR<span style={{float:"right"}}>{gectorTime} ms</span></div>
                    <Gector result = {resultGector}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>BERT-GEC<span style={{float:"right"}}>{bertGecTime} ms</span></div>
                    <BertGec result = {resultBertGec}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Copy-augmented Model<span style={{float:"right"}}>{fairSeqTime} ms</span></div>
                    <FairSeq result = {resultFairSeq}/>
                </div>
                */}

                {/*
                <Card border="dark" className="apis">
                    <Card.Header>
                        BERT-GEC-EDUTEM
                        <div style={{float:"right", fontSize:"13pt"}}>{gectorTime} ms</div>
                        <Switch
                            style={{float:'right'}}
                            checked={state.gectorChecked}
                            onChange={handleChange_c}
                            name="gectorChecked"
                          color="primary"
                        />
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Gector result = {resultGector}/>
                        </Card.Text>
                   </Card.Body>
                </Card>

                <Card border="dark" className="apis">
                    <Card.Header>
                        BERT-GEC
                        <div style={{float:"right", fontSize:"13pt"}}>{bertGecTime} ms</div>
                        <Switch
                            style={{float:'right'}}
                            checked={state.bertChecked}
                            onChange={handleChange_c}
                            name="bertChecked"
                          color="primary"
                        />
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <BertGec result = {resultBertGec}/>
                        </Card.Text>
                   </Card.Body>
                 </Card>

                 <Card border="dark" className="apis">
                     <Card.Header>
                        Copy-augmented Model
                        <span style={{float:"right", fontSize:"13pt"}}>{fairSeqTime} ms</span>
                        <Switch
                            style={{float:'right'}}
                            checked={state.fairseqChecked}
                            onChange={handleChange_c}
                            name="fairseqChecked"
                          color="primary"
                        />
                    </Card.Header>
                    <Card.Body>
                         <Card.Text>
                             <FairSeq style={{fontSize:"30pt"}} result = {resultFairSeq}/>
                         </Card.Text>
                    </Card.Body>
                  </Card>

                <Card border="dark" className="apis">
                    <Card.Header>
                        Language Tool Java
                        <div style={{float:"right", fontSize:"13pt"}}>{languageToolJavaTime} ms</div>
                        <Switch
                            style={{float:'right'}}
                            checked={state.languageToolJavaChecked}
                            onChange={handleChange_c}
                            name="languageToolJavaChecked"
                          color="primary"
                        />
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <LanguageTooljava result = {resultLanguageToolJava}/>
                        </Card.Text>
                   </Card.Body>
                 </Card>

                <Card border="dark" className="apis">
                    <Card.Header>
                        Language Tool Ngram
                        <div style={{float:"right", fontSize:"13pt"}}>{languageToolNgramTime} ms</div>
                        <Switch
                            style={{float:'right'}}
                            checked={state.languageToolNgramChecked}
                            onChange={handleChange_c}
                            name="languageToolNgramChecked"
                          color="primary"
                        />
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <LanguageToolNgram result = {resultLanguageToolNgram}/>
                        </Card.Text>
                   </Card.Body>
                 </Card>
                 */}



                    <Card className="apis">
                      <Card.Header>
                        <div>
                              Bert-Gec (오승재)
                              <Switch
                                  checked={state.bertGecSeungChecked}
                                  onChange={handleChange_c}
                                  name="bertGecSeungChecked"
                                color="primary"
                              />
                          </div>
                          <div>{bertGecSeungTime} sec</div>
                      </Card.Header>
                      <Card.Body>
                           <Card.Text>
                               <NewBertGec result = {resultBertGecSeung}/>
                           </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div>
                          Score : {bertGecSeungHypo}
                        </div>
                      </Card.Footer>
                    </Card>

                    <Card  className="apis">
                        <Card.Header >
                           <div>
                               Bert-Gec (한건희)
                               <Switch
                                   checked={state.bertGecGunChecked}
                                   onChange={handleChange_c}
                                   name="bertGecGunChecked"
                                 color="primary"
                               />
                               </div>
                           <div>{bertGecGunTime} sec</div>
                        </Card.Header>
                       <Card.Body>
                           <Card.Text>
                               <NewBertGec result = {resultBertGecGun}/>
                           </Card.Text>
                       </Card.Body>
                       <Card.Footer>
                         <div>
                           Score : {bertGecGunHypo}
                         </div>
                       </Card.Footer>
                    </Card>

                    <Card  className="apis">
                        <Card.Header >
                           <div>
                                튜터 첨삭
                                <Switch
                                    checked={state.bertGecEduChecked}
                                    onChange={handleChange_c}
                                    name="bertGecEduChecked"
                                  color="primary"
                                />
                            </div>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <NewBertGec result = {resultBertGecEdu}/>
                            </Card.Text>
                       </Card.Body>
                     </Card>

                    <Card  className="apis">
                       <Card.Header >
                           <div>
                               Bert-Gec (정단호)
                               <Switch
                                   checked={state.bertGecDanhoChecked}
                                   onChange={handleChange_c}
                                   name="bertGecDanhoChecked"
                                 color="primary"
                               />
                               </div>
                           <div>{bertGecDanhoTime} sec</div>
                       </Card.Header>
                       <Card.Body>
                           <Card.Text>
                               <NewBertGec result = {resultBertGecDanho}/>
                           </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div>
                          Score : {bertGecDanhoHypo}
                        </div>
                      </Card.Footer>
                    </Card>

                    <Card  className="apis">
                       <Card.Header >
                           <div>
                               Bert-Gec (김준섭)
                               <Switch
                                   checked={state.bertGecJunChecked}
                                   onChange={handleChange_c}
                                   name="bertGecJunChecked"
                                 color="primary"
                               />
                               </div>
                           <div>{bertGecJunTime} sec</div>
                       </Card.Header>
                       <Card.Body>
                           <Card.Text>
                               <NewBertGec result = {resultBertGecJun}/>
                           </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div>
                          Score : {bertGecJunHypo}
                        </div>
                      </Card.Footer>
                    </Card>

                    <Card  className="apis">
                         <Card.Header >
                            <div>
                                M. Kaneko (Author)
                                 <Switch
                                     checked={state.bertGecPaperChecked}
                                     onChange={handleChange_c}
                                     name="bertGecPaperChecked"
                                   color="primary"
                                 />
                             </div>
                             <div>{bertGecPaperTime} sec</div>

                         </Card.Header>
                         <Card.Body>
                             <Card.Text>
                                 <NewBertGec result = {resultBertGecPaper}/>
                             </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <div>
                            Score : {bertGecPaperHypo}
                          </div>
                        </Card.Footer>
                      </Card>



                {/*
                    <Card border="primary" className="apis">
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                    <Card.Title>Primary Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                    </Card.Text>
                    </Card.Body>
                    </Card>
                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Grammar Bot<span style={{float:"right"}}>{grammarBotTime} ms</span></div>
                    <GrammarBot result = {resultGrammarBot}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Language Tool<span style={{float:"right"}}>{languageToolTime} ms</span></div>
                    <LanguageTool result = {resultLanguageTool}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>GingerIt<span style={{float:"right"}}>{gingerItTime} ms</span></div>
                    <GingerIt result = {resultGingerIt}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Pro Writing Aid (NOT WORKING)<span style={{float:"right"}}>{proWritingAidTime} ms</span></div>
                    <ProWritingAid result = {resultProWritingAid}/>
                </div>

                <div className="apis">
                    <div style={{margin:'0% 0% 3% 0%'}}>Text Gears<span style={{float:"right"}}>{textGearsTime} ms</span></div>
                    <TextGears result = {resultTextGears}/>
                </div>
                */}
            </div>
        </div>
    </div>
  );
}

export default Test;
