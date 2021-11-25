import React from "react";
import img_1 from './img/sign1.PNG'
function Popup(props) {
    let totalCount = 0
    const comments = ["Well done~!", "Excellent~!", "Good Job~!", "Not too bad.", "Try Harder" ]
    if (props.type != null) {
     totalCount  = props.type["Grammar"]+props.type["Usage"]+props.type["Spelling"]+props.type["Punctuation"]+props.type["Other"];
    }
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
                            총 {totalCount}개
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
                          <div id="grammar-count" className="count">{props.type["Grammar"]}개</div>
                        </div>
                        <div className="error">
                          <div id="usage" className="type">Usage (어법)</div>
                          <div id="usage-count" className="count">{props.type["Usage"]}개</div>
                        </div>
                        <div className="error">
                        <div id="spelling" className="type">Spelling (맞춤법)</div>
                        <div id="spelling-count" className="count">{props.type["Spelling"]}개</div>
                        </div>
                        <div className="error">
                        <div id="punctuation" className="type">Punctuation (구두법)</div>
                        <div id="punctuation-count" className="count">{props.type["Punctuation"]}개</div>
                        </div>
                        <div className="error">
                        <div id="other" className="type">Other (기타)</div>
                        <div id="other-count" className="count">{props.type["Other"]}개</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    ): "";

}
export default Popup
