import React, { useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

function LanguageToolNgram(props){
    var result = props.result ;
    var fResult = [];
    var mResult = [];
    var tResult = [];
    var oldOffset = 0;
    var start;
    var end;
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
        if(!result["matches"].length){
            return  <div key = "noError">There is No error.</div>
        }

        for (let i = 0; i < result.matches.length; i++) {
            tResult = [];
            start = result.matches[i].start
            end = result.matches[i].end
            // tid = result.content.substring(offset, offset+len) + i ;

            newSetence.push(result.text.substring(oldOffset,start))
            newSetence.push(<span className='wrong' key= {result.matches[i].word} >{ buttonText[i] }</span>)
            oldOffset = end;
            tResult.push((i+1)+". ")
            tResult.push(result.text.substring(start, end ))  // offset lengh 계산!!!
            tResult.push( <BsArrowRight/> )

            if(result.matches[i].replacements.length){
                for(let j=0; j< Math.min(result.matches[i].replacements.length,3); j++){
                    tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={result.matches[i].replacements[j].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[j].value)} >{result.matches[i].replacements[j].value}</Button>);
                }
            }
            else{
                tResult.push(<Button variant="outline-dark" style={{margin: '2%'}} key={"noReplacement"} onClick={() => changeTextByClick(i, "")} >{"\t"}</Button>);
            }

            // ignore = result.text.substring(offset, offset+len )
            tResult.push(<Button variant="outline-danger" style={ {float: 'right', margin: '0.3%'}} key={ result.matches[i].word + "n" } onClick={() => changeTextByClick(i, result.matches[i].word )} >IGNORE</Button>);
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
        buttonText = [];
        return <div></div>
    }
}

export default LanguageToolNgram
