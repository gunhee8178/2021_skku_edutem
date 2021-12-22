// import GrammarBot from './API/GrammarBot';
// import LanguageTool from './API/LanguageTool';
// import LanguageToolPy from './API/LanguageToolPy';
// import LanguageTooljava from './API/LanguageToolJava';
// import LanguageToolNgram from './API/LanguageToolNgram';

// import TextGears from './API/TextGears';
// import ProWritingAid from './API/ProWritingAid';
// import Gector from './API/Gector';
// import FairSeq from './API/FairSeq';
// import BertGec from './API/BertGec';
//import NewOutput from './API/NewOutput';


// import GingerIt from './API/GingerIt';

// let [grammarBotTime, setGrammarBotTime] = useState(0);
// let [resultGrammarBot, setResultGrammarBot] = useState(null);
//
// let [languageToolTime, setLanguageToolTime] = useState(0);
// let [resultLanguageTool, setResultLanguageTool] = useState(null);
// // 추가한부분
// let[languageToolJavaTime, setLanguageToolJavaTime]=useState(0);
// let [resultLanguageToolJava, setResultLanguageToolJava]=useState(null);
//
// let [languageToolPyTime, setLanguageToolPyTime] = useState(0);
// let [resultLanguageToolPy, setResultLanguageToolPy] = useState(null);
//
// let [languageToolNgramTime, setLanguageToolNgramTime] = useState(0);
// let [resultLanguageToolNgram, setResultLanguageToolNgram] = useState(null);

// const [state, setState] = React.useState({
    // languageToolJavaChecked: true,
    // languageToolNgramChecked: true,
    // gectorChecked: true,
    // bertChecked: true,
    // fairseqChecked: true,
// });

// let [textGearsTime, setTextGearsTime] = useState(0);
// let [resultTextGears, setResultTextGears] = useState(null);
//
// let [proWritingAidTime, setProWritingAidTime] = useState(0);
// let [resultProWritingAid, setResultProWritingAid] = useState(null);
//
// let [gectorTime, setGectorTime] = useState(0);
// let [resultGector, setResultGector] = useState(null);
//
// let [fairSeqTime, setFairSeqTime] = useState(0);
// let [resultFairSeq, setResultFairSeq] = useState(null);
// let [fairSeqLoading, setFairSeqLoading] =useState(null);
//
// let [bertGecTime, setBertGecTime] = useState(0);
// let [resultBertGec, setResultBertGec] = useState(null);
// let [bertGecLoading, setBertGecLoading] = useState(false)
//
// let [gingerItTime, setGingerItTime] = useState(0);
// let [resultGingerIt, setResultGingerIt] = useState(null);
// let [result, setResult] = useState("");

// setGrammarBotTime(0);
// setResultGrammarBot(null);
//
// setLanguageToolTime(0);
// setResultLanguageTool(null);
//
// setTextGearsTime(0);
// setResultTextGears(null);
// // 추가한 부분
// setLanguageToolJavaTime(0);
// setResultLanguageToolJava(null);
//
// setLanguageToolNgramTime(0);
// setResultLanguageToolNgram(null);
//
// setLanguageToolPyTime(0);
// setResultLanguageToolPy(null);
//
// setProWritingAidTime(0);
// setResultProWritingAid(null);
//
// setGectorTime(0);
// setResultGector(null);
//
// setFairSeqTime(0);
// setResultFairSeq(null);
//
// setBertGecTime(0);
// setResultBertGec(null);
//
// setGingerItTime(0);
// setResultGingerIt(null);

// const postGrammarbot = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/grammarbot', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             setResultGrammarBot(result)
//             setGrammarBotTime(result['time'])
//
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister()
// }
//
// const postLanguageTool = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/languagetool', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             setResultLanguageTool(result)
//             setLanguageToolTime(result['time'])
//         })
//         .catch(error => {
//             setResultLanguageTool(null)
//             console.error(error);
//         });
//         // unregister()
// }
//
// const postLanguageToolpY = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/languagetoolpy', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             // console.log(result)
//             setResultLanguageToolPy(result)
//             setLanguageToolPyTime(result['time'])
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister()
// }
//
// // 추가한 부분
// const postLanguageToolNgram = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/languagetoolngram', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             // console.log(result)
//             setResultLanguageToolNgram(result)
//             setLanguageToolNgramTime(result['time'])
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister()
// }
//
// const postLanguageToolJava = () => {
//     const data={text : text};
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/languagetooljava', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             // console.log(result)
//             setResultLanguageToolJava(result)
//             setLanguageToolJavaTime(result['time'])
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister()
// }
//
// const postTextGears = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/textGears', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             setResultTextGears(result)
//             setTextGearsTime(result['time'])
//             // console.log("textGears", result)
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister(
// }
//
// const postProWritingGaid = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/proWritingAid', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             setResultProWritingAid(result)
//             setProWritingAidTime(result['time'])
//             // console.log("proWritingAid" , result)
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister(
// }
//
// const postGector = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/gector', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             setResultGector(result)
//             setGectorTime(result['time'])
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
//
// const postFairSeq = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//     setFairSeqLoading(true)
//     // fetch('/api/fairseq', requestOptions)
//     //     .then(response => response.json())
//     //     .then( (result) => {
//     //         // console.log(result)
//     //         setResultFairSeq(result)
//     //         setFairSeqTime(result['time'])
//     //     })
//     //     .catch(error => {
//     //         console.error(error);
//     //     });
//         // unregister
//
//     fetch('/postFairseq', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             // console.log(result)
//             setResultFairSeq(result)
//             setFairSeqTime(result['time'])
//             setFairSeqLoading(false);
//         })
//         .catch(error => {
//             console.error(error);
//             setFairSeqLoading(false);
//         });
// }
//
// const postBertGec = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//     setBertGecLoading(true)
//     fetch('/api/bertgec', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             // console.log(result)
//             setResultBertGec(result)
//             setBertGecTime(result['time'])
//             setBertGecLoading(false)
//             // console.log("proWritingAid" , result)
//         })
//         .catch(error => {
//             console.error(error);
//             setBertGecLoading(false);
//         });
//         // unregister(
// }
//
// const postGingerIt = () => {
//     const data= { text : text };
//
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//         },
//         body : JSON.stringify(data)
//     };
//
//     fetch('/api/gingerit', requestOptions)
//         .then(response => response.json())
//         .then( (result) => {
//             // console.log(result)
//             setResultGingerIt(result)
//             setGingerItTime(result['time'])
//             // console.log("proWritingAid" , result)
//         })
//         .catch(error => {
//             console.error(error);
//         });
//         // unregister(
// }

{/*
    <TextField
        style={inputStyle}
        id="standard-multiline-flexible"
        multiline
        rows={2}
        size='Normal'
        value={text}
        onChange={handleChange}
        placeholder={noText}
        inputProps={ {style: {
            fontSize : '20pt', lineHeight : '1.5em'
        }}}
    />
     <div className="apis">
    <div style={{margin:'0% 0% 3% 0%'}}>Language ToolPy<span style={{float:"right"}}>{languageToolPyTime} ms</span></div>
    <LanguageToolPy result = {resultLanguageToolPy}/>
</div>

<div className="apis">
    <div style={{margin:'0% 0% 3% 0%'}}>Language Tool Ngram<span style={{float:"right"}}>{languageToolNgramTime} ms</span></div>
    <LanguageToolNgram result = {resultLanguageToolNgram}/>
</div>

<div className="apis">
    <div style={{margin:'0% 0% 3% 0%'}}>Language Tool Java<span style={{float:"right"}}>{languageToolJavaTime} ms</span></div>
    <LanguageTooljava result = {resultLanguageToolJava}/>
</div>

<div className="apis">
    <div style={{margin:'0% 0% 3% 0%'}}>GECToR<span style={{float:"right"}}>{gectorTime} ms</span></div>
    <Gector result = {resultGector}/>
</div>

<div className="apis">
    <div style={{margin:'0% 0% 3% 0%'}}>BERT-GEC<span style={{float:"right"}}>{bertGecTime} ms</span></div>
    <BertGec result = {resultBertGec}/>
</div>

<div className="apis">
    <div style={{margin:'0% 0% 3% 0%'}}>Copy-augmented Model<span style={{float:"right"}}>{fairSeqTime} ms</span></div>
    <FairSeq result = {resultFairSeq}/>
</div>
*/}

{/*
<Card border="dark" className="apis">
    <Card.Header>
        BERT-GEC-EDUTEM
        <div style={{float:"right", fontSize:"13pt"}}>{gectorTime} ms</div>
        <Switch
            style={{float:'right'}}
            checked={state.gectorChecked}
            onChange={handleChange_c}
            name="gectorChecked"
          color="primary"
        />
    </Card.Header>
    <Card.Body>
        <Card.Text>
            <Gector result = {resultGector}/>
        </Card.Text>
   </Card.Body>
</Card>

<Card border="dark" className="apis">
    <Card.Header>
        BERT-GEC
        <div style={{float:"right", fontSize:"13pt"}}>{bertGecTime} ms</div>
        <Switch
            style={{float:'right'}}
            checked={state.bertChecked}
            onChange={handleChange_c}
            name="bertChecked"
          color="primary"
        />
    </Card.Header>
    <Card.Body>
        <Card.Text>
            <BertGec result = {resultBertGec}/>
        </Card.Text>
   </Card.Body>
 </Card>

 <Card border="dark" className="apis">
     <Card.Header>
        Copy-augmented Model
        <span style={{float:"right", fontSize:"13pt"}}>{fairSeqTime} ms</span>
        <Switch
            style={{float:'right'}}
            checked={state.fairseqChecked}
            onChange={handleChange_c}
            name="fairseqChecked"
          color="primary"
        />
    </Card.Header>
    <Card.Body>
         <Card.Text>
             <FairSeq style={{fontSize:"30pt"}} result = {resultFairSeq}/>
         </Card.Text>
    </Card.Body>
  </Card>

<Card border="dark" className="apis">
    <Card.Header>
        Language Tool Java
        <div style={{float:"right", fontSize:"13pt"}}>{languageToolJavaTime} ms</div>
        <Switch
            style={{float:'right'}}
            checked={state.languageToolJavaChecked}
            onChange={handleChange_c}
            name="languageToolJavaChecked"
          color="primary"
        />
    </Card.Header>
    <Card.Body>
        <Card.Text>
            <LanguageTooljava result = {resultLanguageToolJava}/>
        </Card.Text>
   </Card.Body>
 </Card>

<Card border="dark" className="apis">
    <Card.Header>
        Language Tool Ngram
        <div style={{float:"right", fontSize:"13pt"}}>{languageToolNgramTime} ms</div>
        <Switch
            style={{float:'right'}}
            checked={state.languageToolNgramChecked}
            onChange={handleChange_c}
            name="languageToolNgramChecked"
          color="primary"
        />
    </Card.Header>
    <Card.Body>
        <Card.Text>
            <LanguageToolNgram result = {resultLanguageToolNgram}/>
        </Card.Text>
   </Card.Body>
 </Card>
 */}

 {/*
     <Card border="primary" className="apis">
     <Card.Header>Header</Card.Header>
     <Card.Body>
     <Card.Title>Primary Card Title</Card.Title>
     <Card.Text>
     Some quick example text to build on the card title and make up the bulk
     of the card's content.
     </Card.Text>
     </Card.Body>
     </Card>
 <div className="apis">
     <div style={{margin:'0% 0% 3% 0%'}}>Grammar Bot<span style={{float:"right"}}>{grammarBotTime} ms</span></div>
     <GrammarBot result = {resultGrammarBot}/>
 </div>

 <div className="apis">
     <div style={{margin:'0% 0% 3% 0%'}}>Language Tool<span style={{float:"right"}}>{languageToolTime} ms</span></div>
     <LanguageTool result = {resultLanguageTool}/>
 </div>

 <div className="apis">
     <div style={{margin:'0% 0% 3% 0%'}}>GingerIt<span style={{float:"right"}}>{gingerItTime} ms</span></div>
     <GingerIt result = {resultGingerIt}/>
 </div>

 <div className="apis">
     <div style={{margin:'0% 0% 3% 0%'}}>Pro Writing Aid (NOT WORKING)<span style={{float:"right"}}>{proWritingAidTime} ms</span></div>
     <ProWritingAid result = {resultProWritingAid}/>
 </div>

 <div className="apis">
     <div style={{margin:'0% 0% 3% 0%'}}>Text Gears<span style={{float:"right"}}>{textGearsTime} ms</span></div>
     <TextGears result = {resultTextGears}/>
 </div>
 */}
