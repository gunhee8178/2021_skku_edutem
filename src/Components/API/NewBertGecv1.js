import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

function NewBertGec(props){
    var fResult = [];
    var mResult = [];
    var tResult = [];
    var textDeco = [];
    var offset;
    var oldOffset = 0;
    var len;
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
            textDeco = [];
            tResult = [];
            index= [];
            offset = result.matches[i].offset
            len = result.matches[i]["length"]
            // tid = result.content.substring(offset, offset+len) + i ;
            // if(result.matches[i].replacements[0]){
            //     buttonText.push(result.matches[i].replacements[0].value); // 좋지 않은 방식 바꾸어 주어야 함.!
            // }
            newSetence.push(result.text.substring(oldOffset,offset))
            if (len) {
              textDeco.push(<div className='wrong' key= {result.text.substring(offset,offset+len)+"wrong"} >{ result.text.substring(offset,offset+len) }</div> )
            }
            if (buttonText[i]) {
              textDeco.push(<div className='right' key= {result.text.substring(offset,offset+len)+"right"} >{ buttonText[i] }</div>)
            }
            if(result.matches[i].hypo && result.matches[i].hypo.length > 0) {
                textDeco.push(<div className="hypo" key={result.matches[i].hypo[0]}>{result.matches[i].hypo.join("\t")}</div>)
            }

            if (buttonText[i] && len>0) {
                newSetence.push(<div className= 'correction'>{textDeco}</div>)
            }
            else{
                newSetence.push(<div className= 'correction' style={{gridColumnGap : '0'}}>{textDeco}</div>)
            }
            oldOffset = offset+len;

            // index.push(<span>{i+1}{".\t"}</span> )
            // index.push(len?result.text.substring(offset,offset+len):"X")  // offset lengh 계산!!!
            // index.push( <BsArrowRight/>)
            // tResult.push(<div>{index}</div>)
            // if (result.matches[i].replacements[0].value) {
            //     tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[0].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[0].value)} >{result.matches[i].replacements[0].value}</Button>);
            // }
            // else {
            //     tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[0].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[0].value)} >{"X" }</Button>);
            // }
            // tResult.push(<Button variant="outline-danger" style={ {margin: '0.3%'}} key={ result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i]["length"] ) + "n" } onClick={() => changeTextByClick(i, result.matches[i]["length"]? result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i]["length"]) : "" )} >IGNORE</Button>);
            // mResult.push(<div style={{margin: '2%', display:"flex", alignItems:"center", justifyContent:"space-between"}} key={i}>{tResult}</div>)

        }
        newSetence.push(result.text.substring(oldOffset))

        fResult.push(<div key="newSetence" >{newSetence}</div>)
        fResult.push(<div className="changeButtons" key="mResult" >{mResult}</div>)
    //  
        console.log(props)
        return fResult;
    }
    else{
        // console.log("NOTHING")
        buttonText = [];
        return <div></div>
    }
}

export default NewBertGec
