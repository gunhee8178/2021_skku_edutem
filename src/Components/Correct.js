import axios from 'axios';
import React, { useState } from 'react'
import img_1 from './img/sign1.PNG'
import img_2 from './img/sign2.PNG'

import NewBertGec from './API/NewBertGec';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/api.css";

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



    const [state, setState] = React.useState({
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

        setBertGecSeungTime(0);
        setResultBertGecSeung(null);
        setBertGecSeungHypo(0);

        setBertGecGunTime(0);
        setResultBertGecGun(null);
        setBertGecGunHypo(0);

        setBertGecDanhoTime(0);
        setResultBertGecDanho(null);
        setBertGecDanhoHypo(0);

        setBertGecJunTime(0);
        setResultBertGecJun(null);
        setBertGecJunHypo(0);

        setBertGecPaperTime(0);
        setResultBertGecPaper(null);

    }

    const clearAll = () => {
        setText("");
        setNoText("문자을 입력해주세요.")
        clear();
        setResultBertGecEdu(null)
    }


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
                console.log("jae", result)
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
                console.log(result)
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
                console.log("jun", result);
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

    const propsStyle = {
        fontFamily: 'Spartan',
        fontSize: "17pt",
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
                <Card className="apis">
                  <Card.Header>
                    <div>
                          오승재
                          <Switch
                              checked={state.bertGecSeungChecked}
                              onChange={handleChange_c}
                              name="bertGecSeungChecked"
                            color="primary"
                          />
                      </div>
                      <div>Score : {bertGecSeungHypo} ({bertGecSeungTime}s)</div>
                  </Card.Header>
                  <NewBertGec result = {resultBertGecSeung}/>
                </Card>

                <Card  className="apis">
                    <Card.Header >
                       <div>
                           한건희
                           <Switch
                               checked={state.bertGecGunChecked}
                               onChange={handleChange_c}
                               name="bertGecGunChecked"
                             color="primary"
                           />
                           </div>
                       <div> Score : {bertGecGunHypo} ({bertGecGunTime}s)</div>
                    </Card.Header>
                   <NewBertGec result = {resultBertGecGun}/>
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
                    <NewBertGec result = {resultBertGecEdu}/>
                 </Card>

                <Card  className="apis">
                   <Card.Header >
                       <div>
                           정단호
                           <Switch
                               checked={state.bertGecDanhoChecked}
                               onChange={handleChange_c}
                               name="bertGecDanhoChecked"
                             color="primary"
                           />
                           </div>
                       <div>Score : {bertGecDanhoHypo} ({bertGecDanhoTime}s)</div>
                   </Card.Header>
                   <NewBertGec result = {resultBertGecDanho}/>
                </Card>

                <Card  className="apis">
                   <Card.Header >
                       <div>
                           김준섭
                           <Switch
                               checked={state.bertGecJunChecked}
                               onChange={handleChange_c}
                               name="bertGecJunChecked"
                             color="primary"
                           />
                           </div>
                       <div>Score : {bertGecJunHypo} ({bertGecJunTime}s)</div>
                     </Card.Header>
                     <NewBertGec result = {resultBertGecJun}/>

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
                         <div>Score : {bertGecPaperHypo} ({bertGecPaperTime}s)</div>

                     </Card.Header>
                     <NewBertGec result = {resultBertGecPaper}/>
                </Card>
            </div>
        </div>
    </div>
  );
}

export default Test;
