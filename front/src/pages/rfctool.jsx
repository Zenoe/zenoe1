import * as React from 'react'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { request } from '@/utils/request'

export default function RFCTool () {
  const [rfcContent, setRfcContent] = useState(null)

  const requestRFC = (rfcId) => {
    request('api/rfc/rfcadd', { rfcId }).then(rfcResult => {
      console.log('receive rfc:', rfcResult)
    })
  }
  useEffect(() => {
    requestRFC('rfc5316')
    console.log('xx')
  }, [])

  return (
    <Grid container
          columnSpacing={{ xs: 0, sm: 1, lg: 2 }}
    >
      <Grid item xs={12} md={6} >
        <Box
          sx={{ border: '1px red solid' }}
        >xs=6 md=8</Box>
      </Grid>

      <Grid
        item xs={12} md={6}
      >
        <Box>xs=6 md=4</Box>
      </Grid>
    </Grid>
  )
}
