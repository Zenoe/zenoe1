import { useState, useEffect } from 'react'
import { Modal, Box, Button, Divider, Grid, Stack, Typography, TextField, TextareaAutosize } from '@mui/material'
import Alert from '@mui/material/Alert'
import { LoadingButton } from '@mui/lab'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { request } from '@/utils/request'

// import './styles.css'
import Styles from './styles.css'
const RFSyntaxCheck = () => {
  const [rfTxt, setRFTxt] = useState('')
  const [modifyRFtxt, setModifyRFtxt] = useState('')
  const [informMsg, setInformMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [checkResult, setCheckResult] = useState([])
  const [patchList, setPatchList] = useState([])

  const [showPatchModal, setShowPatchModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 4
  }

  const handleRFTxthange = (e) => {
    // setRFTxt(e.target.value)
    setRFTxt(e.target.value.replace('\ufeff', ''))
  }

  const checkSyntax = () => {
    setCheckResult([])
    setModifyRFtxt('')
    setInformMsg('')
    setErrorMsg('')
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
      setErrorMsg('脚本既不包含*** Test Cases ***，也不包含*** Keywords ***')
    }
    request('api/utils/checkrfsyntax', { rfTxt, rfType })
      .then(res => {
        // console.log('convert ok');
        const { result, modifyRFtxt, patchList } = res.data
        setPatchList(patchList || [])
        setModifyRFtxt(modifyRFtxt.join('\n'))
        console.log(result)
        setCheckResult(result)
        if (result.length === 0) { setInformMsg('未发现语法错误') }
        setLoading(false)
      })
      .catch(res => {
        console.log('check error', res)
        setLoading(false)
      })
  }

  const showPatchList = () => {
    setShowPatchModal(true)
  }
  const handleClose = () => setShowPatchModal(false)
  const checkResultList = () => {
    if (checkResult.length > 0) {
      return (
        <Box>
          {patchList.length > 0
            ? <Button variant="outlined" onClick={showPatchList}>{'查看修改内容'}</Button>
            : null
          }

          {checkResult.map((item, idx) => (
            <li key={idx} className={ Styles.warnText }><span>{item.pos.row !== -1 ? `行：${item.pos.row + 1}, ` : ''}</span>{item.message}</li>
          ))}
        </Box>
      )
    } else {
      return null
    }
  }

  const modalJsx = () => {
    return (
      <Modal
        open={showPatchModal}
        onClose={handleClose}
      >
        <Box sx={style}>
          {
            patchList.map((item, idx) => (
              <Box key={idx}>
                <Box sx={{ color: 'red' }}>-{ item.ori }</Box>
                <Box sx={{ color: 'green' }}>+{ item.mod }</Box>
                <Divider sx={{ mb: 1 }}/>
              </Box>
            ))
          }
        </Box>
      </Modal>
    )
  }
  return (
    <>
      {modalJsx()}
      {errorMsg.length > 0 ? <Alert severity="error">{errorMsg}</Alert> : null}
      {informMsg.length > 0 ? <Alert severity="info">{informMsg}</Alert> : null}
      <Box className={Styles.errListContainer}>
        <ul>
          {checkResultList()}
        </ul>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextareaAutosize
            minRows={20}
            maxRows={35}
            placeholder="输入cli RF脚本"
            value={rfTxt}
            onChange={handleRFTxthange}
    /* onFocus={selOnFocus} */
            style={{ width: '100%' }}
          ></TextareaAutosize>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextareaAutosize
            minRows={20}
            maxRows={35}
            placeholder="修订后的参考脚本(只修改result, global_result, 中文逗号，以及等号前后多余空格)"
            value={modifyRFtxt}
            readOnly
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
