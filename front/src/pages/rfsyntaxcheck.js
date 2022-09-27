import { useState, useEffect } from 'react'
import { Box, Divider, Grid, Stack, Typography, TextField, TextareaAutosize } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { requestGet } from '@/utils/request'

const RFSyntaxCheck = () => {
  const [rfTxt, setRFTxt] = useState('')
  const [checkResult, setCheckResult] = useState('')

  const [loading, setLoading] = useState(false)
  const handleRFTxthange = (e, v) => {

  }

  const selOnFocus = (e) => {
    const { target } = e
    if (target.value && target.value.length > 0) {
      target.focus()
      target.setSelectionRange(0, target.value.length)
    }
  }

  const checkSyntax = () => {
    setCheckResult('')
    if (rfTxt.length === 0) {
      setRFTxt('请输入 RF脚本')
      return
    }
    setLoading(true)
    requestGet('api/utils/checkrfsyntax', { rf: rfTxt })
      .then(res => {
        // console.log('convert ok');
        const { result } = res.data
        setLoading(false)
      })
      .catch(res => {
        console.log('convert error', res)
        setLoading(false)
      })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextareaAutosize
            minRows={20}
            placeholder="输入cli RF脚本"
            value={rfTxt}
            onChange={handleRFTxthange}
            onFocus={selOnFocus}
            style={{ width: '100%' }}
          ></TextareaAutosize>
        </Grid>
        <Grid item xs={12} md={6}>
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
