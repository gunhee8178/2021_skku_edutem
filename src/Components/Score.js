import axios from 'axios';
import React, { useState } from 'react'
import img_1 from './img/sign1.PNG'
import img_2 from './img/sign2.PNG'

import NewOutput from './API/NewOutput';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {ProgressBar} from 'react-bootstrap';
/*import Popup */
import Popup from './Popup'

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
    let numcount = 0;

    let [bertGecGunTime, setBertGecGunTime] = useState(0);
    let [resultBertGecGun, setResultBertGecGun] = useState(null);
    let [bertGecGunHypo, setBertGecGunHypo] = useState(0);
    let [detail,setdetail] = useState(true);
    const [score, setscore] = useState(0)
    let [errorword, seterrorword] =useState(0);
    const [datanumber, setdatanumber] = useState(numcount);

    const [state, setState] = React.useState({
        bertGecGunChecked: true,
    });

    const handleChange_c = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setText(event.target.value)
    }



    /*Pop up*/
    const [buttonPopup, setbuttonPopup] = useState(false);

    const [type, setType] = useState(null);

    const clear = () =>{

        setBertGecGunTime(0);
        setResultBertGecGun(null);
        setBertGecGunHypo(0);
        setType(null);
        setdetail(true);

    }

    const clearAll = () => {
        setText("");
        setNoText("문장을 입력해주세요.")
        clear();
    }

    const postBertGun = () => {
        let count=0;
        const data= { text : text };
        let wordsArr = data.text.trim().split(' ' || '&nbsp;'||',');
        numcount = 0;
        for(let i=0; i<wordsArr.length; i++){
            if(wordsArr[i]!=''){
                numcount = numcount +1;
            }
        }
        setdatanumber(numcount)
        console.log('I am data')
        console.log(data)
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
                console.log(result['matches'])
                seterrorword(result['matches']["length"])
                setResultBertGecGun(result)
                setBertGecGunTime(result['time'])
                setBertGecGunHypo(result['hypo'])
                setType(result)
                setdetail(false);
                count=type['type_dict']["Grammar"]+type['type_dict']["Usage"]+type['type_dict']["Spelling"]+type['type_dict']["Punctuation"]+type['type_dict']["Other"];
                setscore(100-(count*5));
                console.log(score);
                // setdatanumber(numcount)
            })
            .catch(error => {
                console.error(error);
            });

    }

    const  post = () =>{
        if(state['bertGecGunChecked']){postBertGun()};
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

        axios.post('/getrandom', data)
            .then( (result) => {
                setText(result['data']['text']);
            })
            .catch(error => {
                console.error(error);
            });
    }


    const xsvg =  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#F36C3D"/>
                    <path d="M35 15L15 35" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 15L35 35" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

    const plussvg = <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill="#39B54A"/>
                      <path d="M25 13.3335V36.6668" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.332 25H36.6654" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

    const arrow = <svg id="arrow" width="50" height="36" viewBox="0 0 50 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.8886 33.1891C26.8873 35.665 23.1127 35.665 21.1114 33.1891L1.2711 8.64309C-1.37177 5.37338 0.955417 0.499995 5.15967 0.499995L44.8403 0.499999C49.0446 0.499999 51.3718 5.37339 48.7289 8.64309L28.8886 33.1891Z" fill="black"/>
                  </svg>



    const propsStyle = {
        fontFamily: 'Spartan',
        fontSize: "17pt",
    }

  return (
    <div className="App">
        <div id='wrapper'>
        <Popup trigger={buttonPopup} setTrigger={setbuttonPopup} type={type}>
        </Popup>
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

            <div id="informationPanel">
            <ProgressBar now={score} />

              <div id = "aiInformation">
                  <div>
                      AI correction
                      <Switch
                          checked={true}
                          // onChange={}
                          name="aiInformation"
                        color="primary"
                      />
                  </div>
                  <div id="information-summary">
                    <div>
                      단어 수 : {datanumber} words
                    </div>
                    <div>
                      AI 첨삭 속도 : {bertGecGunTime} sec
                    </div>
                  </div>
              </div>
              <div id="information-result">
                <div id="infromation-type">
                  {arrow}
                  <div id="show-detail">
                    <div>유형별 점수 확인</div>
                    <button className="ImageButton" style={{border:'none', background:'none', }} disabled={detail} onClick={() => setbuttonPopup(true)}>{plussvg}</button>
                  </div>
                </div>
              </div>
            </div>

            <div id="outputPanel">
                <div id="outputPanel-inner" >
                    <div id="outputPanel-lower">
                        <NewOutput result = {resultBertGecGun}/>
                    </div>
                </div>



            </div>




        </div>
    </div>
  );
}

export default Test;
