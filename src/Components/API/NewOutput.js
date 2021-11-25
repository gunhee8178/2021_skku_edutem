import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

function NewOutput(props){
    var fResult = [];
    var mResult = [];
    var tResult = [];
    var textDeco = [];
    var wrongword=[];
    var rightword=[];
    var offset;
    var oldOffset = 0;
    var len;
    var tid=[]
    var replacement;
    var index =[];
    var newSetence =[];
    var wrongWordsList = [];
    let[result, setResult] = useState(null)
    let [buttonText, setButtonText] = useState(wrongWordsList);

    function resetButtonText(){
        if(props.result && props.result.matches){
            wrongWordsList = []
            for (let i = 0; i < props.result.matches.length; i++) {
                if(props.result.matches[i].replacements[0]){
                    wrongWordsList.push( props.result.matches[i].replacements[0].value )
                    // wrongWordsList.push( props.result.matches[i].replacements[0].value ) ;
                }
            }
            setButtonText (wrongWordsList)
        }
    }

    function changeTextByClick(i, newWord){
        var newArr = [...wrongword];
        newArr[i]= <div className= 'correction' style={{color : 'black'}}>{newWord}</div>
        console.log(newWord);
        console.log(newArr[i]);
        wrongword = newArr;
        // setButtonText(newArr);

    }



    useEffect(()=>{
        setResult(props.result)
        resetButtonText()
    }, [props.result]);


    if(result){
        if(result['error']){
            return <div key='serverError'>Server has an Error</div>
        }
        if( !(result["matches"] && result["matches"].length) ){
            return  <div key = "noError">There is No error.</div>
        }


        for (let i = 0; i < result.matches.length; i++) {
            tResult = [];
            offset = result.matches[i].offset
            len = result.matches[i]["length"]

            tid.push(result.text.substring(oldOffset,offset))
            wrongword.push(<div className= 'correction' style={{color : 'red'}}>{result.text.substring(offset,offset+len)}</div>)

            if (len) {
                // console.log(len)
                tid.push(wrongword[i])
                // console.log(wrongword[i])
            }

            oldOffset = offset+len;

            if(result.matches[i].replacements[0].value==''){
                rightword.push('blank')
                mResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={'blank'} onClick={() => changeTextByClick(i, 'blank')} >{'blank'}</Button>);
                //console.log(rightword[i])
            }
            else{
                rightword.push(result.matches[i].replacements[0].value)
                mResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[0].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[0].value)} >{result.matches[i].replacements[0].value}</Button>);
                //console.log(rightword[i])
            }


        }
        // console.log('wrongword')
        //console.log(wrongword)
        newSetence.push(result.text.substring(oldOffset))
        tid.push(result.text.substring(oldOffset))
        tid.push(mResult)


        if(result !=""){
            tResult.push(<div key="newSetence" >{tid}</div>)
        }

        return tResult;
    }
    else{
        // console.log("NOTHING")
        buttonText = [];
        return <div></div>
    }
}

export default NewOutput
