import { useState, useEffect } from 'react'
import { Button, Container, MenuItem, TextField, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Link } from 'react-router-dom'
import { twoColJsx, CollapsableLayout, HorizontalDivs } from '@/utils/uiutils'
import { LoadingButton } from '@mui/lab'
import { request } from '@/utils/request'
import { makeStyles } from '@mui/styles'

import AddRFTypeModal from './AddRFTypeModal'
import { OneColumnFormLabel } from '@/layout/OneColumn'

import * as Yup from 'yup'

import UploadFiles from '@/components/UploadFiles'
import { useForm, Controller } from 'react-hook-form'

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
  const [showAddTypeModal, setShowAddTypeModal] = useState(false)
  const { handleSubmit, control } = useForm()
  const onSubmit = data => {
    request('api/autorf/addrfscript', data).then(res => {
      console.log(res)
    }).catch(rej => {
      console.log('addrfscript failed:', rej)
    })
  }

  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [convertMsg, setConvertMsg] = useState('')
  const [cli, setCli] = useState('')
  const [rfScript, setRFScript] = useState('')
  const [RFType, setRFType] = useState([])
  const [curRFType, setCurRFType] = useState('')

  useEffect(() => {
    request('api/autorf/getrftype')
      .then(res => {
        setRFType(res.data.result.map(i => i.RFTypeName))
        if (res.data.result.length > 0) { setCurRFType(res.data.result[0].RFTypeName) }
      })
  }, [])

  const addtoRFType = (_RFType) => {
    setRFType([...RFType, _RFType])
  }
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

  const handleClose = () => {
    console.log('close')
    // request('api/autorf/getrftypes').then(res => {
    //   console.log('receive types of rfscript', res.data)
    // })
    setShowAddTypeModal(false)
  }

  const modalJsxAddType = () => {
    return (
      <AddRFTypeModal show={showAddTypeModal} onClose={handleClose} addtoRFType={addtoRFType}/>
    )
  }

  const handleAddType = () => {
    setShowAddTypeModal(true)
    // open modal
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

  const labels = [
    '拓扑名称',
    '类型',
    '描述',
    '配置Cli',
    ''
  ]

  const handleSelectRFTypeChange = (e) => {
    setCurRFType(e.target.value)
  }
  const RFTypeSelectMenuitemJsx = () => {
    if (RFType) {
      return RFType.map((el, i) => (<MenuItem key={i} value={el}>{ el }</MenuItem>
      ))
    }
    return null
  }
  return (
    <Container maxWidth="md">
      {modalJsxAddType()}
      <form key={1} onSubmit={handleSubmit(onSubmit)}>
        <OneColumnFormLabel labels={labels}>
          <Controller
            render={({ field }) => <TextField {...field} />}
            name="topName"
            rules={{ required: true }}
            control={control}
            defaultValue=""
            className="materialUIInput"
          />

          <Controller
            render={({ field }) => (
              <Box>
                <Select {...field} value={curRFType} onChange={handleSelectRFTypeChange}>
                {RFTypeSelectMenuitemJsx()}
              </Select>
                <Button onClick={ handleAddType }>Add</Button>
              </Box>
            )}
            name="RFType"
            control={control}
          />
          <Controller
            render={({ field }) => <TextField multiline {...field} />}
            name="desc"
            rules={{ required: false }}
            control={control}
            defaultValue=""
          />

          <Controller
            render={({ field }) => <TextField multiline {...field} />}
            name="cli"
            rules={{ required: false }}
            control={control}
            defaultValue=""
          />

          <input type="submit" />

        </OneColumnFormLabel>
      </form>
    </Container>
  )
  return (
    <>
      <Stack spacing={2}>
        <Box>上传配置文件转换</Box>
        <UploadFiles title={'选择配置文件'} id={'selTestCaseId'} setFileList={setFileList} />
      </Stack>
      <Divider sx={{ m: 2 }}/>

      <CollapsableLayout
        description='输入cli转换'
      >
        <Box
          sx={{ fontWeight: '700', color: '#5EA85D' }}
        >
          Step:
        </Box>

        { cliRFPair(1) }
        <a href={`${SERVER_URL}/static/executeCli.txt` } download="" >{'execute key下载'}</a>
      </CollapsableLayout>

      <Box>
      </Box>
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
