import {useEffect, useState, useContext} from 'react';
import { requestGet } from '@/utils/request';
import { useNavigate } from 'react-router-dom';

import "./styles.css";

const WordCount = (props) => {
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([])

  const onFileClick = (in_fileName) => {
    console.log(in_fileName);
    navigate(`/wordcount/${in_fileName}`)
  }

  const fileListJsx = fileList.map((it, idx) => (
      <li
        key={idx}
        onClick={() => onFileClick(it)}
      >
        {it}
      </li>
  ))
  useEffect(() => {

    requestGet('wordcount').then((response) => {
      // console.log(response.data);
      const _fileList = []
      response.data.split('\n').forEach(line => {
        if(line.length > 0)
          _fileList.push(line)
      })

      setFileList(_fileList)
    })
  }, [])

  return (
    <div>
      <ul>
        {fileListJsx}
      </ul>
    </div>
  )
}

export default WordCount;
