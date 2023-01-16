import { useState, useEffect } from 'react'
import { Button, TextField, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { Link } from 'react-router-dom'
import { twoColJsx } from '@/utils/uiutils'
import { LoadingButton } from '@mui/lab'

import { request } from '@/utils/request'

const cliTextField = (props = { defaultValue: 'red' }) => {
  return (
    <TextField
      multiline
      fullWidth
      maxRows={30}
      minRows={30}
      /* defaultValue="Defaulsssdft Value" */
      {...props}
    />
  )
}

const expectTextField = (props = { defaultValue: 'red' }) => {
  return (
    <Box>
    <TextField
      multiline
      fullWidth
      maxRows={5}
      minRows={1}
      /* defaultValue="Defaulsssdft Value" */
      {...props}
    />
    <TextField
      multiline
      fullWidth
      maxRows={5}
      minRows={1}
      /* defaultValue="Defaulsssdft Value" */
      {...props}
    />
    </Box>
  )
}

const AutoRf = () => {
  const [loading, setLoading] = useState(false)
  const [convertMsg, setConvertMsg] = useState('')
  const [cli, setCli] = useState('')
  const [rfScript, setRFScript] = useState('')

  const cli2Rf = () => {
    setLoading(true)
    setConvertMsg('')
    request('api/autorf/cli2rf', { cli })
      .then(res => {
        setConvertMsg('cli to rf OK')
        setLoading(false)
        setRFScript(res.data)
      })
      .catch(res => {
        console.log('convert error', res)
        setLoading(false)
        setConvertMsg('cli to rf failed')
      })
  }

  const keydownHandler = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      if (cli.length === 0) {
        return
      }
      cli2Rf()
    }
  }

  const onCliTextFieldChange = (e) => {
    setCli(e.target.value)
  }
  const onCliTextFieldFocus = (e) => {
    // const stepId = e.target.getAttribute('data-stepid')
    setCli(e.target.value)
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler])

  const cliRFPair = (_stepId, _desc) => {
    const cliTextFieldAttr = {
      placeholder: _desc || '#输入cli\n(按Ctrl+Enter 转换)',
      inputProps: { 'data-stepid': _stepId },
      onFocus: onCliTextFieldFocus,
      onChange: onCliTextFieldChange
    }
    const rfTextFieldAttr = {
      value: rfScript
    }

    return (
      twoColJsx(
        { text: '', comp: cliTextField, compAttr: cliTextFieldAttr },
        { text: '', comp: cliTextField, compAttr: rfTextFieldAttr }
      )
    )
  }

  const expectRFPair = (_stepId, _desc) => {
    const cliTextFieldAttr = {
      placeholder: _desc || '#cli',
      inputProps: { 'data-stepid': _stepId },
      onFocus: onCliTextFieldFocus,
      onChange: onCliTextFieldChange
    }
    return (
      twoColJsx(
        { text: '', comp: expectTextField, compAttr: cliTextFieldAttr },
        { text: '', comp: cliTextField }
      )
    )
  }

  return (
    <>
      <Box
        sx={{ fontWeight: '700', color: '#5EA85D' }}
      >
        Step:
      </Box>
      { cliRFPair(1) }

      <a href={`${SERVER_URL}/static/executeCli.txt` } download="" >{'execute key下载'}</a>
      {/* <Box */}
      {/*   sx={{ fontWeight: '700', color: '#5EA85D' }} */}
      {/* > */}
      {/*   Expect: */}
      {/* </Box> */}
      {/* { expectRFPair(1, 'show xxx') } */}
    </>
  )
}

export default AutoRf
