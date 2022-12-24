import { useState, useEffect } from 'react'
import { Button, TextField, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { twoColJsx } from '@/utils/uiutils'
import { LoadingButton } from '@mui/lab'

import { request } from '@/utils/request'

const cliTextField = (props = { defaultValue: 'red' }) => {
  return (
    <TextField
      multiline
      fullWidth
      maxRows={5}
      minRows={5}
      /* defaultValue="Defaulsssdft Value" */
      {...props}
    />
  )
}

const AutoRf = () => {
  const [loading, setLoading] = useState(false)
  const [convertMsg, setConvertMsg] = useState('')
  const [cli, setCli] = useState('')

  const cli2Rf = () => {
    setLoading(true)
    setConvertMsg('')
    request('api/autorf/cli2rf', { cli })
      .then(res => {
        setConvertMsg('cli to rf OK')
        setLoading(false)
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
    console.log('change', e.target.value)
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

  const cliRFPair = (_stepId) => {
    const cliTextFieldAttr = {
      placeholder: '#cli',
      inputProps: { 'data-stepid': _stepId },
      onFocus: onCliTextFieldFocus,
      onChange: onCliTextFieldChange
    }
    return (
      twoColJsx(
        { text: '', comp: cliTextField, compAttr: cliTextFieldAttr },
        { text: '', comp: cliTextField }
      )
    )
  }
  return (
    <Box>
      { cliRFPair(1) }
    </Box>
  )
}

export default AutoRf
