import {useEffect, useState, useRef} from 'react';
import { requestGet } from '@/utils/request';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


import InputNumber from '@/components/InputNumber'
import BasicChart from '@/components/d3/chart'
import {csvParse} from 'd3'

import styles from "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderWidth: "1px",
    color: "red",
    // height: "100vh"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));

const WordCountChart = (props) => {
  const cs = useStyles();

  const containerRef = useRef(null)
  // const [gridH, setGridH] = useState(undefined)
  // const [gridW, setGridW] = useState(undefined)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [minicount, setMinicount] = useState(5)
  const [miniCharCount, setMiniCharCount] = useState(2)

  const { fileName } = useParams();

  // const setMinicount = (in_number) =>

  //   console.log(in_number);
  // }
  useEffect(()=>{
    if(containerRef.current){
      // console.log(containerRef.current.clientWidth);
      // console.log(containerRef.current.clientHeight);
      // setGridW(containerRef.current.clientWidth)
      // setGridH(containerRef.current.clientHeight)
    }
  }, [containerRef])

  useEffect(() => {
    requestGet(`wordcount/${fileName}`).then((response) => {
      const parseResult = csvParse(response.data);
      // setData(parseResult.filter(d=>d.count>10).map(d=>({word: d.word, count: d.count})))
      setData(parseResult.map(d=>({word: d.word, count: +d.count})))
      // console.log(parseResult);
    })
  }, [])

  useEffect(() => {
    setFilteredData(data
                    .filter(d=>d.count>minicount)
                    .filter(d=>d.word.length >= miniCharCount))
  }, [data])

  useEffect(() => {
    setFilteredData(data.filter(d=>d.count > minicount)
                        .filter(d=>d.word.length >= miniCharCount)
                   )
  }, [minicount, miniCharCount])

    return (
    <div className={styles.thiscontainer} ref={containerRef} >
      <div className={styles.flexDiv}>
        <div>最小出现次数</div>
        <InputNumber numberValue={minicount} setNumberValue={setMinicount}/>
        <div>最小字符长度</div>
        <InputNumber numberValue={miniCharCount} setNumberValue={setMiniCharCount}/>
      </div>
      <BasicChart data={filteredData}/>
      <h3>
        <Link to='/wordcount'>Back</Link>
      </h3>
    </div>
  )
}

export default WordCountChart;
