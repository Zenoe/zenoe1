import { useState, useEffect } from 'react'
import { Button, Modal, Container, MenuItem, TextField, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import { request } from '@/utils/request'

import { OneColumnFormLabel } from '@/layout/OneColumn'

import * as Yup from 'yup'

import { useForm, Controller } from 'react-hook-form'

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

export default function AddRFTypeModal ({ show, onClose }) {
  // const { handleSubmit, control } = useForm()
  const {
    control: control2,
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2
  } = useForm({
    mode: 'onBlur'
  })
  const handleClose = () => {
    console.log('close')
    onClose()
    return
    request('api/autorf/getrftypes').then(res => {
      console.log('receive types of rfscript', res.data)
    })
    setShowAddTypeModal(false)
  }

  const onSubmit = (data) => {
    console.log(data)
    request('api/autorf/addtype').then(res => {
      console.log(res)
    })
  }
  const labels = ['新增类型']
  return (
    <Modal
      open={show}
      onClose={handleClose}
    >
      <Box sx={{ ...style, width: '320px', height: '160px' }}>
        <form key={2} onSubmit={handleSubmit2(onSubmit)}>
          <OneColumnFormLabel labels={labels}>
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="addedType"
              rules={{ required: true }}
              control={control2}
              defaultValue=""
            />
            <input type="submit" />

          </OneColumnFormLabel>
        </form>

      </Box>
    </Modal>
  )
}
