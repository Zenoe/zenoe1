import { useState, useEffect } from 'react'
import PadBox from '@/components/PadBox'
import { Modal, Button, Box, Grid } from '@mui/material'

import BaseTable from '@/components/table/BaseTable'

import { requestGet } from '@/utils/request'

const Devices = () => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 4
  }
  const [showModalAddDevice, setShowModalAddDevice] = useState(false)
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'name'
    },
    {
      id: 'IP',
      numeric: false,
      disablePadding: false,
      label: 'IP'
    }
  ]

  const onShowModalAddDevice = () => {
    setShowModalAddDevice(true)
  }
  const handleClose = () => setShowModalAddDevice(false)
  const modalJsx = () => {
    return (
      <Modal
        open={showModalAddDevice}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
        </Box>
      </Modal>
    )
  }

  const [data4Tbl, setData4Tbl] = useState([
    { name: 'device1', IP: '10.1.1.2' },
    { name: 'device2', IP: '10.2.1.2' },
    { name: 'device4', IP: '10.3.1.3' }
  ])

  // useEffect(() => {
  //   requestGet('').then(res => {
  //   })
  // }, [])

  return (
    <>
      {modalJsx()}

      <Box>
        <PadBox sx={{ margin: 'auto', width: 400, border: '1px solid gray' }}>
          <Button onClick = {onShowModalAddDevice}>add</Button>
          <Button>del</Button>
        </PadBox>
        <BaseTable
          headCells={headCells}
          rows={data4Tbl}
          style={{ width: '100%', whiteSpace: 'pre' }}
        />
      </Box>
    </>
  )
}

export default Devices
