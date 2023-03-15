import { useState, useEffect } from 'react'
import { Alert, Modal, Container, MenuItem, TextField, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import { request } from '@/utils/request'

import { OneColumnFormLabel } from '@/layout/OneColumn'

import * as Yup from 'yup'

import { useForm, Controller } from 'react-hook-form'

import { LeftRight, renderOrNot } from '@/utils/uiutils'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflowY: 'auto',
  p: 4
}

export default function AddRFTypeModal ({ show, onClose, addtoRFType }) {
  const [informMsg, setInformMsg] = useState('')
  const {
    control: control2,
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2
  } = useForm({
    mode: 'onBlur'
  })
  const handleClose = () => {
    setInformMsg('')
    onClose()
  }

  const onSubmit = (data) => {
    console.log(data.addedType)
    setInformMsg('')
    request('api/autorf/addrftype', { rftype: data.addedType }).then(res => {
      console.log(res.data)
      if (res.data.status === 1) {
        addtoRFType(data.addedType)
      } else {
        setInformMsg(res.data.message)
      }
    })
  }
  const labels = ['新增类型']
  return (
    <Modal
      open={show}
      onClose={handleClose}
    >
      <Box sx={{ ...style, width: '560px', height: '320px' }}>
        <form key={2} onSubmit={handleSubmit2(onSubmit)}>
          <OneColumnFormLabel labels={labels}>
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="addedType"
              rules={{ required: true }}
              control={control2}
              defaultValue=""
            />
            <Box>
              {renderOrNot(informMsg, <Alert severity="error">{ informMsg }</Alert>)}
            </Box>
            <input type="submit" />

          </OneColumnFormLabel>
        </form>

      </Box>
    </Modal>
  )
}
