import { useState, useEffect } from 'react'
import { Box, Divider, Grid, Stack, Typography, TextField, TextareaAutosize } from '@mui/material'
import Alert from '@mui/material/Alert'
import { LoadingButton } from '@mui/lab'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { request } from '@/utils/request'

// import './styles.css'
import Styles from './styles.css'
const RFSyntaxCheck = () => {
  const [rfTxt, setRFTxt] = useState('')
  const [informMsg, setInformMsg] = useState('')
  const [checkResult, setCheckResult] = useState([])

  const [loading, setLoading] = useState(false)
  const handleRFTxthange = (e) => {
    // setRFTxt(e.target.value)
    setRFTxt(e.target.value.replace('\ufeff', ''))
  }

  const checkSyntax = () => {
    setCheckResult([])
    setInformMsg('')
    if (rfTxt.length === 0) {
      setRFTxt('请输入 RF脚本')
      return
    }
    setLoading(true)
    let rfType = 'testcase'
    if (rfTxt.includes('*** Test Cases ***')) {
      rfType = 'testcase'
    } else if (rfTxt.includes('*** Keywords ***')) {
      rfType = 'keyword'
    } else {
      setInformMsg('脚本既不包含*** Test Cases ***，也不包含*** Keywords ***')
    }
    request('api/utils/checkrfsyntax', { rfTxt, rfType })
      .then(res => {
        // console.log('convert ok');
        const { result } = res.data
        console.log(result)
        setCheckResult(result)
        setLoading(false)
      })
      .catch(res => {
        console.log('check error', res)
        setLoading(false)
      })
  }

  const checkResultList = () => {
    const retJsx = checkResult.map((item, idx) => (
      <li key={idx} className={ Styles.warnText }><span>{item.pos.row !== -1 ? `行：${item.pos.row + 1}, ` : ''}</span>{item.message}</li>
    ))
    return retJsx
  }

  return (
    <>
      {informMsg.length > 0 ? <Alert severity="error">{informMsg}</Alert> : null}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextareaAutosize
            minRows={20}
            maxRows={30}
            placeholder="输入cli RF脚本"
            value={rfTxt}
            onChange={handleRFTxthange}
            /* onFocus={selOnFocus} */
            style={{ width: '100%' }}
          ></TextareaAutosize>
        </Grid>
        <Grid item xs={12} md={6}>
          <ul>
            {checkResultList()}
          </ul>
          <TextareaAutosize
            minRows={20}
            placeholder=""
            value={''}
    /* onChange={handleRFTxthange} */
            style={{ width: '100%' }}
          ></TextareaAutosize>
        </Grid>
      </Grid>
      <LoadingButton
        onClick={checkSyntax}
        loading={loading}
        endIcon={<ChangeCircleIcon />}
        loadingPosition="end"
        variant="contained"
      >
        Check
      </LoadingButton>

    </>
  )
}

export default RFSyntaxCheck
