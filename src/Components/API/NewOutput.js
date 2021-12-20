import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { BsArrowRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import {UncontrolledCollapse} from 'reactstrap';

function NewOutput(props){
    

    // if(props.result && props.result.matches){
    //     for(let i = 0; i < props.result.matches.length; i++){
    //         wrongword.push(props.result.text.substring(props.result.matches[i].offset,props.result.matches[i].offset+props.result.matches[i]["length"]))
    //     }
    // }
    var eachtype;
    var formattype;
    var w_word;
    var r_word;
    var wrongword=[];
    var mResult = [];
    var tResult = [];
    var rightword=[];
    var offset;
    var oldOffset = 0;
    var len;
    var tid=[]
    var space =[]
    let[buttonText, setButtonText] = useState(wrongword);
    let[result, setResult] = useState(null)
    function resetButtonText(){
        if(props.result && props.result.matches){
            console.log('props good ')
            console.log(props)
            for (let i = 0; i < props.result.matches.length; i++) {
                if(props.result.matches[i].replacements[0]){
                    if (props.result.matches[i]["length"]==0){
                        for(let j=0;j<props.result.matches[i].replacements[0]['value'].length; j++){
                            space.push(<span>&nbsp;</span>)
                        }
                        console.log(props.result.matches[i].replacements[0]['value'].length)
                        wrongword.push( <span className="errorword" onClick={() =>classchange(i)} id={'name'+i}>{space}</span> )
                    }
                    else{
                        wrongword.push( <span className="errorword" onClick={() =>classchange(i)} id={'name'+i}>{props.result.text.substring(props.result.matches[i].offset,props.result.matches[i].offset+props.result.matches[i]["length"])}</span> )
                    }
                    space = []
                    // wrongWordsList.push( props.result.matches[i].replacements[0].value ) ;
                }
                
            }
            //wrongword.push(props.result.matches.length)
            setButtonText (wrongword)
            //setButtonText (rightword)
        }
    }
    /*set color on wrong word*/

    function changeTextByClick(i, newWord){
        var newarray = [...buttonText]
        //newarray[newarray.length-1] = newarray[newarray.length-1] -1
        newarray[i] = newWord
        setButtonText(newarray)
        document.getElementById('col'+i).className= 'parent';
        // for(let j=0;j<newarray.length-1;j++){
        //     if(j==i){
        //         document.getElementById('col'+j).className= 'parent';
        //     }
        //     else{
        //         document.getElementById('col'+j).className= 'ch_parent';
        //     }
        // }
             
    }

    function classchange(i){
        
        if(document.getElementById('col'+i).className=='parent'){
            document.getElementById('col'+i).className= 'ch_parent';
        }
        else{
            document.getElementById('col'+i).className= 'parent';
        }
        
        

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
        tid=[]
        tResult=[]
        
        for (let i = 0; i < result.matches.length; i++) {
            tResult = []
            offset = result.matches[i].offset
            len = result.matches[i]["length"]
            w_word =result.text.substring(offset,offset+len)
            console.log('wrongword')
            console.log(w_word)
            r_word =result.matches[i].replacements[0]['value']
            console.log('rightword')
            console.log(r_word)

            tid.push(result.text.substring(oldOffset,offset))
            
            //setButtonText(wrongword[i])
            tid.push(buttonText[i])
            if(result.text[offset+len-1]==' '){
                tid.push(' ')
            }
            /* right word updata */
            eachtype = result.matches[i].replacements[0]['type']
            if(r_word == w_word+'.'||r_word == w_word+','||w_word ==r_word+'.'||w_word ==r_word+','){
                formattype='Punctuation error'
            }
            else if(eachtype=='R:SPELL'){
                formattype='Spelling error'
            }
            else if(eachtype=='M:PUNCT'||eachtype=='U:PUNCT'||eachtype=='R:PUNCT'){
                formattype='Punctuation error'
            }
            else if(eachtype=='M:OTHER'||eachtype=='U:OTHER'||eachtype=='R:OTHER'){
                formattype='Other error'
            }
            else if(eachtype=='R:ADJ'||eachtype=='R:ADV'||eachtype=='R:CONJ'||eachtype=='R:DET'||eachtype=='R:NOUN'||eachtype=='R:PART'||eachtype=='R:PREP'||eachtype=='R:PRON'||eachtype=='R:VERB'||eachtype=='R:CONTR'){
                formattype='Usage error'
            }
            else{
                formattype='Grammar error'
            }
          

            if(result.matches[i].replacements[0].value==''){
                rightword.push('')
                mResult.push(<div className='parent' id={'col'+i}><UncontrolledCollapse toggler={'#'+'name'+i}><span className="errorbutton"><div className="errortypes">모델 : {result.matches[i].replacements[0].type} error <br/>{formattype} <br/></div><del>{result.text.substring(offset,offset+len)}</del> -&gt; <Button className="btn-name" id={'name'+i} style={{margin: '2%'}} key={'blank'} onClick={() =>changeTextByClick(i, '')} >삭제</Button></span></UncontrolledCollapse></div>);
                
            }
            else if(len==0){
                mResult.push(<div className='parent'id={'col'+i}><UncontrolledCollapse toggler={'#'+'name'+i}><span className="errorbutton"> <div className="errortypes">모델 : {result.matches[i].replacements[0].type} error <br/>{formattype} <br/></div> <span>{buttonText[i]}</span>-&gt; <Button className="btn-name" id={'name'+i} style={{margin: '2%'}} key={'blank'} onClick={() =>changeTextByClick(i, result.matches[i].replacements[0].value)} >{result.matches[i].replacements[0].value}</Button></span></UncontrolledCollapse></div>);
            }
            else{
                rightword.push(result.matches[i].replacements[0].value)
                mResult.push(<div className='parent'id={'col'+i}><UncontrolledCollapse toggler={'#'+'name'+i}><span className="errorbutton"> <div className="errortypes">모델 : {result.matches[i].replacements[0].type} error <br/>{formattype} <br/></div><del>{result.text.substring(offset,offset+len)}</del> -&gt; <Button className="btn-name" id={'name'+i} style={{margin: '2%'}} key={result.matches[i].replacements[0].value} onClick={() => changeTextByClick(i, result.matches[i].replacements[0].value)} >{result.matches[i].replacements[0].value}</Button></span></UncontrolledCollapse></div>);
                
            }
            /* update sentence */
                
            
            //tid.push(rightword[i])
                
            oldOffset = offset+len;
            //format.push(<div className='outputformat'>{wrongword[i]} : {rightword[i]}</div>)
            
        
        }
        
        
        tid.push(result.text.substring(oldOffset))
        tid.push(<br/>)
        tid.push(<br/>)
        //tid.push(<span className="wrongsnum">틀린 단어가 {buttonText[buttonText.length-1]}개 남았습니다</span>)
        //tid.push(format)
        tid.push(mResult)
        


        
        if(result !=""){
            tResult.push(<div key="newSetence" >{tid}</div>)
        }
        return tResult;
    }
    else{
        buttonText = [];
        return <div></div>
    }
}





export default NewOutput
