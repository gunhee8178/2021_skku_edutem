import React, { useState } from 'react'
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, scorer, Prec, Rec, F_05, origin, gec, answer ) {
  return {
      name: name,
      scorer: scorer,
      Prec: Prec,
      Rec: Rec,
      F_05: F_05,
      example: [
          { name : "Original", sentence: origin},
          { name: name, sentence: gec },
          { name: 'Answer', sentence: answer },
        ],
    };
}

function Row(props) {
  const { row } = props;
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const addIdx = (event) => {
      setIdx((idx+1)%10)
  }
  const takeeIdx = (event) => {
      setIdx((idx+9)%10)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}    ({row.scorer})
        </TableCell>
        <TableCell align="right">{row.Prec}</TableCell>
        <TableCell align="right">{row.Rec}</TableCell>
        <TableCell align="right">{row.F_05}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Example
              </Typography>
              <Table size="small" aria-label="purchases">
                <caption>Compared with answer setence Using {row.scorer}

                    <span style={{float:"right"}}>
                        <TiArrowLeftThick key='down' onClick={takeeIdx} size="24"/>
                        <TiArrowRightThick key='up' onClick={addIdx} size="24"/>
                    </span>
                 </caption>
                <TableHead>
                  <TableRow>
                    <TableCell  width="15%">GEC Model</TableCell>
                    <TableCell>Sentence No.{idx+1}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.example.map((exampleRow) => (
                    <TableRow key={exampleRow.name}>
                      <TableCell component="th" scope="row">
                        {exampleRow.name}
                      </TableCell>
                      <TableCell>{exampleRow.sentence[ idx ] }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     Prec: PropTypes.number.isRequired,
//     Rec: PropTypes.number.isRequired,
//     F_05: PropTypes.number.isRequired,
//     example: PropTypes.arrayOf(
//       PropTypes.shape({
//         Sentence: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//   }).isRequired,
// };





const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Test() {
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [dataset,setDataSet] = useState("")
    const [condition,setCondition] = useState("GOOD")
    const [incorr, setIncorr] = useState(null)
    const [corr, setCorr] = useState(null)
    const [loading, setLoading ] =useState(false)
    const [models, setModels] = useState(["GECToR", "Copy-augmented-Model" ])
    const [scorer, setScorer] = useState(["errant", "m2scorer"])
    var i,j

    const onChangeIncorr = (event) =>{
        setIncorr(event.target.files[0])
        console.log("incorr", event.target.files[0])
    }
    const onChangeCorr = (event) =>{
        setCorr(event.target.files[0])
        console.log("corr",event.target.files[0])
    }

    function setTableData(result){
        console.log("result : ", result);
        var trows = [];
        for ( i = 0; i < models.length; i++) {
            for ( j = 0; j < scorer.length; j++) {
                try {
                    trows.push( createData(
                        models[i],
                         scorer[j],
                        result[ models[i] ][ scorer[j] ][ 'precision' ] ,
                        result[ models[i] ][ scorer[j] ][ 'recall' ] ,
                        result[ models[i] ][ scorer[j] ][ 'f0.5' ],
                        result[ 'incorrect' ]['examples'],
                        result[ models[i] ]['examples'],
                        result[ 'correct' ]['examples']
                    ))
                } catch (e) {
                    console.log(e);
                }
            }
        }
        setRows(trows)
        console.log(rows);
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        try {
            setCondition("LOADING");
            setLoading(true)
            var data = new FormData();
            data.append('incorr', incorr, "incorrect.txt");
            data.append('corr', corr, 'correct.txt');
            // FormData의 key 확인
            for (let value of data.values()) {
                console.log("value" ,value);
            }
            console.log('data', data)
            axios.post('/fileupload', data)
                .then( (result) => {
                    if(result['data']['state']==false){
                        setCondition("FAIL")
                        setRows([])
                    }
                    else{
                        console.log(result['data']);
                        setCondition("GOOD")
                        setTableData(result['data'])
                    }
                })
                .then( ()=>{
                    setLoading(false)
                })
                .catch(error => {
                    console.log("NOPE")
                    setCondition("FAIL")
                    console.error(error);
                    setLoading(false);
                });
        } catch (err) {
            if(!(incorr & corr)){
                alert("You have to put origin and corrcect txt file")
            }
            console.log(err)
            setCondition("FAIL")
            setLoading(false)
        }

    }

    const onLoad = (event) =>{
        event.preventDefault();
        try {
            setCondition("LOADING");
            setLoading(true)
            var data = {'id' : 'edutem'}

            axios.post('/loadExist', data)
                .then( (result) => {
                    if(result['data']=="FAIL"){
                        setCondition("FAIL")
                        setRows([])
                    }
                    else{
                        console.log(Object.keys(result['data']));
                        setCondition("GOOD")
                        setTableData(result['data'])
                    }
                })
                .then( ()=>{
                    setDataSet("에듀템 제공")
                    setLoading(false)
                })
                .catch(error => {
                    console.log("NOPE")
                    setCondition("FAIL")
                    console.error(error);
                    setLoading(false);
                });
        } catch (err) {
            console.log(err)
            setCondition("FAIL")
            setLoading(false)
        }

    }


    const tableStyle = {
        width : '80%',
        margin : '5%',
        justifyContent: "center"
    }

    return (
          <div>

            <div className="container" style={tableStyle}>
        	   <div className="row">

                   <div className="col-md-6">
        	           <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your Origin File </label>
                                <input type="file" disabled={loading} className="form-control" multiple="" accept=".txt" onChange={onChangeIncorr}/>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
	                   <form method="post" action="#" id="#">
                            <div className="form-group files color">
                                <label>Upload Your Correct File </label>
                                <input type="file" disabled={loading} className="form-control" multiple="" accept=".txt" onChange={onChangeCorr}/>
                            </div>

                        </form>

                    </div>
                </div>
                <div style={{float: "left", margin : "1%"}}>상태 : {condition}</div>
                <button type="button" disabled={loading} className="btn btn-success btn-block" style={{float:'right', margin:"1%"}} onClick={onSubmit}>Submit</button>
                <button type="button" disabled={loading} className="btn btn-success btn-block" style={{float:'right', margin:"1%"}} onClick={onLoad}>Load</button>
                <button type="button" disabled={loading} className="btn btn-success btn-block" style={{float:'right', margin:"1%"}}>Clear</button>
            </div>
                <div style={tableStyle}>
                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <StyledTableRow>
                            <TableCell>{dataset}</TableCell>
                            <TableCell>GEC AI MODEL (SCORER)</TableCell>
                            <TableCell align="right">Prec</TableCell>
                            <TableCell align="right">Rec</TableCell>
                            <TableCell align="right">F_0.5</TableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          {rows&&rows.map((row) => (
                            <Row key={row.name + row.scorer} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                </div>
            </div>
    );
}

export default Test
