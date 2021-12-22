import React, { useState, useEffect } from 'react';
import img_1 from './img/sign1.PNG'


function Popup(props) {

    var offset;
    var len;
    var wrongword
    var rightword
    let eachtype;
    let typecount =[0,0,0,0,0] //grammar usage spelling punctuation other
    let [typenum , settypenum] = useState(typecount)
    let [totalCount, setTotalCount] = useState(0)
    let [comment, setComment] = useState("Not too bad.");
    const comments = ["Perfect", "Excellent~!", "Good Job~!", "Not too bad.", "Try Harder" ]


    useEffect(()=>{
      console.log('type')
      console.log(props)
      if(props.type !=null){
        for(let i=0;i < props.type.matches.length;i++){
          eachtype = props.type.matches[i].replacements[0]['type']
          offset = props.type.matches[i]["offset"]
          len = props.type.matches[i]["length"]
          wrongword =props.type.text.substring(offset,offset+len)
          rightword = props.type.matches[i].replacements[0]['value']
          if(rightword == wrongword+'.'||rightword == wrongword+','||wrongword == rightword+'.'||wrongword == rightword+','){
              typecount[3] +=1
          }
          else if(eachtype=='R:SPELL'){
              typecount[2] +=1
          }
          else if(eachtype=='M:PUNCT'||eachtype=='U:PUNCT'||eachtype=='R:PUNCT'){
              typecount[3] +=1
          }
          else if(eachtype=='M:OTHER'||eachtype=='U:OTHER'||eachtype=='R:OTHER'){
              typecount[4] +=1
          }
          else if(eachtype=='R:ADJ'||eachtype=='R:ADV'||eachtype=='R:CONJ'||eachtype=='R:DET'||eachtype=='R:NOUN'||eachtype=='R:PART'||eachtype=='R:PREP'||eachtype=='R:PRON'||eachtype=='R:VERB'||eachtype=='R:CONTR'){
              typecount[1] +=1
          }
          else{
              typecount[0] +=1
          }
        }
        settypenum(typecount)
        setTotalCount (typecount[0]+typecount[1]+typecount[2]+typecount[3]+typecount[4]);
        if (typecount[0]+typecount[1]+typecount[2]+typecount[3]+typecount[4] == 0) {
          setComment(comments[0]);
          console.log(comments[0]);
        }else if((typecount[0]+typecount[1]+typecount[2]+typecount[3]+typecount[4])/2 < 3){
          setComment(comments[parseInt(((typecount[0]+typecount[1]+typecount[2]+typecount[3]+typecount[4])/2)+1)]);
          console.log( parseInt(((typecount[0]+typecount[1]+typecount[2]+typecount[3]+typecount[4])/2)+1) , comments[((typecount[0]+typecount[1]+typecount[2]+typecount[3]+typecount[4])/2)+1]);
        }else{
          console.log(comments[4]);
          setComment(comments[4]);
           }
      }
      // if (props.type != null) {
      //      console.log('popup')
      //      console.log(props)
      //      setTotalCount (props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"]);
      //      if (props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"] == 0) {
      //          setComment(comments[0]);
      //          console.log(comments[0]);
      //      }else if((props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"])/2 < 3){
      //          setComment(comments[parseInt(((props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"])/2)+1)]);
      //          console.log( parseInt(((props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"])/2)+1) , comments[((props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"])/2)+1]);
      //      }else{
      //         console.log(comments[4]);
      //          setComment(comments[4]);
      //      }
      // }
     },[props]);

    const xsvg = <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="25" cy="25" r="25" fill="#39B54A"/>
                  <path d="M35 15L15 35" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15 15L35 35" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


    return(props.trigger)&&(props.type != null) ? (
        <div className="popup">
            <div className="popup-inner">
                <div id="popup-header">
                  <div id="popup-title">유형별 결과</div>
                  <button className="close-btn" onClick={()=>props.setTrigger(false)}>{xsvg}</button>
                  {props.children}
                </div>
                <div id="popup-content">
                    <div id="content-left">
                      <div>
                        <div id="comment">
                            {comment}
                        </div>
                      </div>
                      <div id="total-score">
                          <div id="total-score-text">total Score</div>
                          <div id="total-score-count">{100-(totalCount*5)}</div>
                      </div>

                    </div>
                    <div id="content-right">
                        <div className="error">
                          <div id="grammar" className="type">Grammar (문법)</div>
                          <div id="grammar-count" className="count">{typenum[0]}개</div>
                        </div>
                        <div className="error">
                          <div id="usage" className="type">Usage (어법)</div>
                          <div id="usage-count" className="count">{typenum[1]}개</div>
                        </div>
                        <div className="error">
                        <div id="spelling" className="type">Spelling (맞춤법)</div>
                        <div id="spelling-count" className="count">{typenum[2]}개</div>
                        </div>
                        <div className="error">
                        <div id="punctuation" className="type">Punctuation (구두법)</div>
                        <div id="punctuation-count" className="count">{typenum[3]}개</div>
                        </div>
                        <div className="error">
                        <div id="other" className="type">Other (기타)</div>
                        <div id="other-count" className="count">{typenum[4]}개</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    ): "";

  }

export default Popup
