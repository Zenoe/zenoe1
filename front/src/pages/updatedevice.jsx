import { useState, useEffect } from 'react'
import {
  Button, TextField, Box, Divider, Grid, Stack, Typography,
  List, ListItem, ListItemText,
  Container,
  Alert
} from '@mui/material'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Textfield from '@/components/FormsUI/Textfield'
import Select from '@/components/FormsUI/Select'
import DateTimePicker from '@/components/FormsUI/DataTimePicker'
import Checkbox from '@/components/FormsUI/Checkbox'
import SubmitButton from '@/components/FormsUI/SubmitButton'

import { validateIP } from '@/utils/jsutils'
import { LeftRight } from '@/utils/uiutils'
import { request } from '@/utils/request'
const INITIAL_FORM_STATE = {
}

const FORM_VALIDATION = Yup.object().shape({
  // name: Yup.string()
  //   .required('Required'),
})

const UpdateDevice = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const subscribe = () => {
    setLoading(true)
    request('api/utils/updatedevicebin', { lstIp })
      .then(res => {
        setLoading(false)
      })
      .catch(res => {
        console.log('subscribe failed', res)
        setLoading(false)
      })
  }

  const [lstIp, setDeviceIpList] = useState([])
  const [deviceIpInput, setDeviceIpInput] = useState('')

  const handleChange = (e) => {
    setDeviceIpInput(e.target.value)
  }

  const handleAdd = (e) => {
    if (deviceIpInput === '') return
    setMessage('')
    const _lstIp = deviceIpInput.split(',').map(i => i.trim())

    for (const ip of _lstIp) {
      if (ip && !validateIP(ip)) {
        setMessage('please input correct ipv4 address')
        return
      }
    }
    e.preventDefault()
    const combineList = [...lstIp, ..._lstIp]
    const uniqueipLst = combineList.filter((item, index) => combineList.indexOf(item) === index)

    setDeviceIpList(uniqueipLst)
    setDeviceIpInput('')
  }

  const handleDelete = (index) => {
    const newDeviceIpList = [...lstIp]
    newDeviceIpList.splice(index, 1)
    setDeviceIpList(newDeviceIpList)
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
                subscribe()
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      Please input the IP of devices need to be updated
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick = {handleAdd}
                    >Add</Button>
                    <TextField value={deviceIpInput} onChange={handleChange}
                               style={{ width: 350 }}
                               placeholder="多个IP用逗号分开: 10.1.1.2,10.1.1.3,10.1.1.4"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ul>
                      {lstIp.map((deviceIp, index) => (
                        <li key={index}>
                          <LeftRight>
                            {deviceIp}
                            <Button onClick={() => handleDelete(index)}>Delete</Button>
                          </LeftRight>
                        </li>
                      ))}
                    </ul>
                  </Grid>

                  <Grid item xs={12}>
                    <SubmitButton fullWidth={false}>
                      Submit
                    </SubmitButton>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
  )
}

export default UpdateDevice
