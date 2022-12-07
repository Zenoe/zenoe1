import * as React from 'react'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField, Button } from '@mui/material'
import SubmitButton from '@/components/FormsUI/SubmitButton'
import { request } from '@/utils/request'

import { LoadingButton } from '@mui/lab'

export default function RFCTool () {
  const [rfcContent, setRfcContent] = useState([])
  const [rfcId, setRfcId] = useState('3630')
  const [loading, setLoading] = useState(false)

  const requestRFC = (rfcId) => {
    // request('api/rfc/rfcadd', { rfcId }).then(rfcResult => {
    //   console.log('receive rfc:', rfcResult)
    // })
    return request('api/rfc/rfcadd', { rfcId })
  }

  const handleRfcIdChange = (e) => {
    setRfcId(e.target.value)
  }

  const handleSearchRfc = async () => {
    setLoading(true)
    const rfc = await requestRFC(rfcId.replace(/^[a-zA-Z]*/, ''))
    // console.log(rfc)
    setRfcContent(rfc.data)
    setLoading(false)
  }

  const rfcContentJsx = () => {
    if (!rfcContent) return null
    const retJsx = []
    for (const [secIdx, sec] of rfcContent.entries()) {
      const { sectionName, content, enContent } = sec
      const secJsx = [<Box key={-1}>{sectionName}</Box>]
      for (const [idx, paragraph] of content.entries()) {
        secJsx.push(<Box key={idx}>{paragraph}</Box>)
      }

      retJsx.push(<Box key={secIdx}>{ secJsx }</Box>)
      // console.log(sectionName, content)
    }

    return retJsx
  }

  useEffect(() => {
    // requestRFC('3630')
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
            value={rfcId}
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
          <Box style={{ whiteSpace: 'pre' }}>
            { rfcContentJsx() }
          </Box>
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
