import { useState, useEffect } from 'react'
import {
  Button, TextField, Box, Divider, Grid, Stack, Typography,
  TextareaAutosize,
  Container,
  Alert
} from '@mui/material'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import SubmitButton from '@/components/FormsUI/SubmitButton'

import { validateIP } from '@/utils/jsutils'
import { request } from '@/utils/request'
const INITIAL_FORM_STATE = {
}

const FORM_VALIDATION = Yup.object().shape({
  // name: Yup.string()
  //   .required('Required'),
})

const ExecuteCmd = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [cmdResult, setCmdResult] = useState('')

  const runCmd = () => {
    setMessage('')

    const _lstIp = deviceIpInput.split(',').map(i => i.trim())
    for (const ip of _lstIp) {
      if (ip && !validateIP(ip)) {
        setMessage('please input correct ipv4 address')
        return
      }
    }
    const uniqueipLst = _lstIp.filter((item, index) => _lstIp.indexOf(item) === index)
    if (uniqueipLst.length !== 2) {
      setMessage('请输入2个设备IP地址，用逗号分隔')
      return
    }

    setLoading(true)
    request('api/utils/executeCmd', { lstIp: uniqueipLst, lstcommand: commandInput })
      .then(res => {
        console.log(res)
        setLoading(false)
        setCmdResult(res.data.result)
      })
      .catch(res => {
        console.log('failed', res)
        setLoading(false)
      })
  }

  const [deviceIpInput, setDeviceIpInput] = useState('')
  const [commandInput, setCommandInput] = useState('')

  const handleChange = (e) => {
    setDeviceIpInput(e.target.value)
  }

  const handleCommandChange = (e) => {
    setCommandInput(e.target.value)
  }

  return (
        <Container maxWidth="md">
          <div>
            {message && <Alert severity="error">{message}</Alert>}
            {/* {loading && <Loading />} */}

            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                console.log('values', values)
                runCmd()
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      请输入设备IP地址
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField value={deviceIpInput} onChange={handleChange}
                               style={{ width: 350 }}
                               placeholder="请输入2个设备IP地址，用逗号分隔"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField value={commandInput} onChange={handleCommandChange}
                               style={{ width: 350 }}
                               placeholder="要运行的命令,逗号分隔,eg:configure terminal,xxx,yyy"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <SubmitButton disabled={!!loading} fullWidth={false}>
                      Submit
                    </SubmitButton>
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      minRows={20}
                      maxRows={35}
                      value={cmdResult}
                      style={{ width: '100%' }}
                    ></TextareaAutosize>

                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
  )
}

export default ExecuteCmd
