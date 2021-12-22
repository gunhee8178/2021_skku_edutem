import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

function EduBertGec(props){
    var fResult = [];
    var mResult = [];
    var tResult = [];
    var offset;
    var oldOffset = 0;
    var len;
    var replacement;
    var newSetence =[];
    var wrongWordsList = [];
    let[result, setResult] = useState(null)
    let [buttonText, setButtonText] = useState(wrongWordsList);

    function resetButtonText(){
        if(props.result && props.result.matches){
            wrongWordsList = []
            for (let i = 0; i < props.result.matches.length; i++) {
                if(props.result.matches[i].replacements[0]){
                    wrongWordsList.push( props.result.matches[i].replacements[0].value.length ? props.result.matches[i].replacements[0].value+" ":props.result.matches[i].replacements[0].value )
                    // wrongWordsList.push( props.result.matches[i].replacements[0].value ) ;
                }
            }
            setButtonText (wrongWordsList)
        }
    }

    function changeTextByClick(i, newWord){
        var newArr = [...buttonText];
        newArr[i] = newWord;
        setButtonText(newArr);
    }



    useEffect(()=>{
        setResult(props.result)
        resetButtonText()
    }, [props.result]);


    if(result){
        if(result['error']){
            return <div key='serverError'>Server has an Error</div>
        }
        // <div style={{margin:'0%'}}>Grammar Bot<span style={{float:"right"}}>{grammarBotTime} ms</span></div>
        if( !(result["matches"] && result["matches"].length) ){
            return  <div key = "noError">There is No error.</div>
        }


        for (let i = 0; i < result.matches.length; i++) {
            tResult = [];
            offset = result.matches[i].offset
            len = result.matches[i]["length"]
            // tid = result.content.substring(offset, offset+len) + i ;
            // if(result.matches[i].replacements[0]){
            //     buttonText.push(result.matches[i].replacements[0].value); // 좋지 않은 방식 바꾸어 주어야 함.!
            // }
            newSetence.push(result.text.substring(oldOffset,offset))
            newSetence.push(<span className='wrong' key= {result.text.substring(offset,offset+len)} >{ buttonText[i] }</span>)
            oldOffset = offset+len;
            tResult.push(<span>{i+1}. </span> )
            console.log(offset,offset+len)
            tResult.push(len?result.text.substring(offset,offset+len):"X")  // offset lengh 계산!!!
            tResult.push( <BsArrowRight/>)

            if (result.matches[i].replacements[0].value) {
                tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[0].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[0].value)} >{result.matches[i].replacements[0].value}</Button>);
            }
            else {
                tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[0].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[0].value)} >{"X" }</Button>);
            }

            tResult.push(<Button variant="outline-danger" style={ {float: 'right', margin: '0.3%'}} key={ result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i]["length"] ) + "n" } onClick={() => changeTextByClick(i, result.matches[i]["length"]? result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i]["length"]) : "" )} >IGNORE</Button>);
            mResult.push(<div style={{margin: '2%'}} key={i}>{tResult}</div>)
        }
        newSetence.push(result.text.substring(oldOffset))

        fResult.push(<div key="newSetence" >{newSetence}</div>)
        fResult.push(<div key="mResult" >{mResult}</div>)
    //
        return fResult;
    }
    else{
        // console.log("NOTHING")
        buttonText = [];
        return <div></div>
    }
}

export default EduBertGec
