import { useState, useEffect } from 'react'
import { Button, Box, Grid } from '@mui/material'

import BaseTable from '@/components/table/BaseTable'

import { requestGet } from '@/utils/request'

const Devices = () => {
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
    <Box>
      <BaseTable
        headCells={headCells}
        rows={data4Tbl}
        style={{ width: '100%', whiteSpace: 'pre' }}
      />
    </Box>
  )
}

export default Devices
