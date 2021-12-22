import React, { useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

function Gector(props){
    var result = props.result ;
    var fResult = [];
    var mResult = [];
    var tResult = [];
    var offset;
    var oldOffset = 0;
    var len;
    var replacement;
    var newSetence =[];
    var wrongWordsList = [];
    let [buttonText, setButtonText] = useState(wrongWordsList);

    function resetButtonText(){
        if(result && result.matches){
            wrongWordsList = []
            for (let i = 0; i < result.matches.length; i++) {
                if(result.matches[i].replacements[0]){
                    wrongWordsList.push( result.matches[i].replacements[0].value) ;
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
        resetButtonText()
    }, [props]);


    if(result){
        // <div style={{margin:'0%'}}>Grammar Bot<span style={{float:"right"}}>{grammarBotTime} ms</span></div>
        if(!result["matches"] || !result['matches'].length){
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
            replacement = (len ?  result.text.substring(offset, offset+len) : "X");

            newSetence.push(result.text.substring(oldOffset,offset))
            newSetence.push(<span className='wrong' key= {result.text.substring(offset,offset+len)? result.text.substring(offset,offset+len) : "blank"+i} >{ buttonText[i] }</span>)
            oldOffset = offset+len;
            tResult.push((i+1)+". ")

            tResult.push( replacement )  // offset lengh 계산!!!
            tResult.push( <BsArrowRight/> )
            for(let j=0; j< Math.min(result.matches[i].replacements.length,3); j++){
                if (result.matches[i].replacements[j].value) {
                    tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[j].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[j].value)} >{result.matches[i].replacements[j].value}</Button>);
                }
                else {
                    tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[j].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[j].value)} >{"X" }</Button>);
                }
            }
            // ignore = result.text.substring(offset, offset+len )
            tResult.push(<Button variant="outline-danger" style={ {float: 'right', margin: '0.3%'}} key={ result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i]["length"] ) + "n" } onClick={() => changeTextByClick(i, result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i]["length"]) )} >IGNORE</Button>);
            // tResult.push(<button style={{flow: 'right', margin: '0.3%'}} key={ignore} onClick={() => console.log({ignore}) } >IGNORE</button>);
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

export default Gector
