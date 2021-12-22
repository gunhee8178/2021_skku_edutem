import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

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
    var styleList_for_reset = [];
    var init_hypo = [];
    let [result, setResult] = useState(null)
    let [buttonText, setButtonText] = useState(wrongWordsList);
    let [hypos, setHypos] = useState(init_hypo);
    let [styleList, setStyleList] = useState(styleList_for_reset);
    let [suggestion, setSuggestion] = useState(null);
    let [suggestionOn, setOn] = useState(false);

    function resetButtonText(){
        if(props.result && props.result.matches){
            wrongWordsList = []
            for (let i = 0; i < props.result.matches.length; i++) {
                if(props.result.matches[i].replacements[0]){
                    wrongWordsList.push( props.result.matches[i].replacements[0].value );
                    init_hypo.push( props.result.matches[i].replacements[0].hypo );
                    // wrongWordsList.push( props.result.matches[i].replacements[0].value ) ;
                }
                if (!(props.result.matches[i]["length"] && props.result.matches[i].replacements[0].value)) {
                  styleList_for_reset.push("blank");
                }else{
                  styleList_for_reset.push("");
                }
            }
            setStyleList(styleList_for_reset);
            setButtonText (wrongWordsList)
            setHypos(init_hypo);
        }
    }

    function changeTextByClick(i,j, newWord){
        var newArr = [...buttonText];
        var newHypo = [...hypos]
        newArr[i] = newWord;
        newHypo[i] = props.result.matches[i].replacements[j].hypo
        setButtonText(newArr);
        setHypos(newHypo);
        setOn(false);
    }

    function changeSuggestion(i) {
        var sug = [];
        var front = [];
        var wrongWord = result.text.substring(result.matches[i].offset, result.matches[i].offset + result.matches[i].length);
        if (wrongWord) {
            front.push(<div className="wrongWord">{wrongWord}</div>);
        }else{
            front.push(<div style={{textDecoration : "none"}}className="wrongWord">{"\t"} </div>)
        }
        front.push(<BsArrowRight/>)

        sug.push(front);
        for (let j = 0; j < props.result.matches[i].replacements.length; j++) {
            if (props.result.matches[i].replacements[j].value) {
                sug.push(<button className="newWord" onClick={() => changeTextByClick(i,j, result.matches[i].replacements[j].value)} >{props.result.matches[i].replacements[j].value}</button>)
            }else{
                sug.push(<button className="newWord" onClick={() => changeTextByClick(i,j, result.matches[i].replacements[j].value)} >{"\t"}</button>)
            }

        }
        setOn(true);
        setSuggestion(sug);
    }

    useEffect(()=>{
        setResult(props.result);
        resetButtonText();
        setSuggestion(null);
    }, [props.result]);


    if(result){
        // if(result['error']){
        //     return
        //             <>
        //                 <Card.Body>
        //                     <Card.Text>
        //                         Server has an Error
        //                     </Card.Text>
        //                 </Card.Body>
        //                 <Card.Footer>
        //                     Place For Suggestion
        //                 </Card.Footer>
        //             </>
        // }
        // <div style={{margin:'0%'}}>Grammar Bot<span style={{float:"right"}}>{grammarBotTime} ms</span></div>
        if( !(result["matches"] && result["matches"].length) ){
            return(
                <>
                    <Card.Body>
                        <Card.Text>
                            There is No error.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </>
              );
        }

        try {
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
              if(hypos[i] && hypos[i].length > 0) {
                  textDeco.push(<div className="hypo" key={hypos[i][0]}>{hypos[i].join("\t")}</div>)
              }

              if (buttonText[i] && len>0) {
                  newSetence.push(<button className= {'correction '+styleList[i]} onClick={()=>changeSuggestion(i)} >{textDeco}</button>)
              }
              else{
                  newSetence.push(<button className= {'correction '+styleList[i]} onClick={()=>changeSuggestion(i)}  >{textDeco}</button>)
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
        } catch (e) {
          return
                  <>
                      <Card.Body>
                          <Card.Text>
                              Server has an Error
                          </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                      </Card.Footer>
                  </>
        }

        return(
                <>
                    <Card.Body>
                        <Card.Text>
                            {fResult}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {suggestionOn&&suggestion}
                    </Card.Footer>
                </>
        );

    }
    else{
        // console.log("NOTHING")
        buttonText = [];
        return (
                <>
                    <Card.Body>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </>
            );
    }
}

export default NewBertGec
