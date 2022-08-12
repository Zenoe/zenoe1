import {useEffect, useState, useRef} from 'react';
import { requestGet } from '@/utils/request';
import { useParams } from 'react-router-dom';

import LineChart from '@/components/d3/LineChart'
import {csvParse} from 'd3'

import styles from "../styles.css";

const TimeStampTrend = (props) => {

  // const [gridH, setGridH] = useState(undefined)
  // const [gridW, setGridW] = useState(undefined)
  const [data, setData] = useState([])

  const { fileName } = useParams();

const testdata = [
    {value: 10},
    {value: 50},
    {value: 30},
    {value: 40},
    {value: 40},
    {value: 20},
    {value: 70},
    {value: 20},
    {value: 50}
  ]

  useEffect(() => {
    requestGet(`api/viz/gettimestampdata`).then((response) => {
      let _tmp = response.data.split('\n')
      _tmp = Array.from(new Set(_tmp))
      _tmp = _tmp.filter(i=> i.length > 0)
      // console.log(_tmp);
      setData(_tmp.map(i=>({value: +i.replace(' ','').replace(/:/g,'')})))
      // setData(testdata)
    })
  }, [])

  // useEffect(() => {
  //   console.log('xxxx', data);
  // }, [data])


  return (
    <div className={styles.thiscontainer} >
      <LineChart data={data}/>
    </div>
  )
}

export default TimeStampTrend;
