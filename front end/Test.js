import React, { useState } from 'react'
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';





const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, Prec, Rec, F_05 ) {
  return { name, Prec, Rec, F_05 };
}



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Test() {
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [dataset,setDataSet] = useState("에듀템 제공 문장")
    const [condition,setCondition] = useState("GOOD")
    const [incorr, setIncorr] = useState(null)
    const [corr, setCorr] = useState(null)
    const [loading, setLoading ] =useState(false)
    const [models, setModels] = useState(["GECTor", "Copy-augmented-Model" ])
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
                trows.append( createData(
                    models[i] + " ("+ scorer[j] +")" ,
                    result[ models[i] ][ scorer[j] ][ 'precision' ] ,
                    result[ models[i] ][ scorer[j] ][ 'recall' ] ,
                    result[ models[i] ][ scorer[j] ][ 'f0.5' ]
                ))
            }
        }
        setRows(trows)
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
                    if(result['data']=="FAIL"){
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
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    {/*<div style={{float: "left", margin : "1%"}}>비교 데이터 : {dataset}</div>*/}
                      <TableRow>
                        <StyledTableCell>GEC AI MODEL (SCORER)</StyledTableCell>
                        <StyledTableCell align="right">Prec</StyledTableCell>
                        <StyledTableCell align="right">Rec</StyledTableCell>
                        <StyledTableCell align="right">F_0.5</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.Prec}</StyledTableCell>
                          <StyledTableCell align="right">{row.Rec}</StyledTableCell>
                          <StyledTableCell align="right">{row.F_05}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
             </div>
         </div>
    );
}

export default Test
