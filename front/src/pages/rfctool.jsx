import * as React from 'react'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField, Button } from '@mui/material'
import SubmitButton from '@/components/FormsUI/SubmitButton'
import { request } from '@/utils/request'

import { LoadingButton } from '@mui/lab'

export default function RFCTool () {
  const [rfcContent, setRfcContent] = useState(null)
  const [rfcId, setRfcId] = useState('')
  const [loading, setLoading] = useState(false)

  const requestRFC = (rfcId) => {
    request('api/rfc/rfcadd', { rfcId }).then(rfcResult => {
      console.log('receive rfc:', rfcResult)
    })
  }

  const handleRfcIdChange = (e) => {
    setRfcId(e.target.value)
  }
  const handleSearchRfc = () => {
    requestRFC(rfcId.replace(/^[a-zA-Z]*/, ''))
  }
  useEffect(() => {
    // requestRFC('rfc5316')
    requestRFC('3630')
    console.log('xx')
  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}
      >
        <span>RFC编号:</span>
          <TextField
            placeholder="2345"
            onChange={handleRfcIdChange}
          >
          </TextField>
      <LoadingButton
          size="small"
          onClick={handleSearchRfc}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Search RFC
        </LoadingButton>
      </Box>
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
    </>
  )
}
