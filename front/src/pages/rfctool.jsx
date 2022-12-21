import * as React from 'react'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField, Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { request } from '@/utils/request'
import PadBox from '@/components/PadBox'
import { LoadingButton } from '@mui/lab'
import { twoColJsx } from '@/utils/uiutils'
export default function RFCTool () {
  const [rfcContent, setRfcContent] = useState([])
  const [rfcId, setRfcId] = useState('9086')
  const [loading, setLoading] = useState(false)

  const PreBox = styled(PadBox)(({ theme }) => ({
    // fontFamily change the behaviour of space display
    fontFamily: 'monospace',
    overflowX: 'scroll',
    overflowY: 'hidden',
    whiteSpace: 'pre'
  }))

  const RfcTextBox = styled(PadBox)(({ theme }) => ({
    // color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)
  }))

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

  const sectionJsx = (secList) => {
    if (secList.length === 0) {
      return null
    }

    const ret = []
    for (const sec of secList) {
      // ret.push(twoColJsx([sec.sectionName, sec.sectionName]))
      ret.push(twoColJsx({ text: sec.sectionName }, { text: sec.sectionName }))
      for (let i = 0; i < sec.content.length; i++) {
        const comp = sec.content[i][0] === '\n' ? PreBox : RfcTextBox
        ret.push(twoColJsx({ text: sec.content[i], comp }, { text: sec.cnContent[i], comp }))
      }
    }

    return ret
  }

  const rfcContentJsx = () => {
    const retJsx = []
    if (!Array.isArray(rfcContent)) {
      return <Box>{ rfcContent }</Box>
    }
    for (const [secIdx, sec] of rfcContent.entries()) {
      const { sectionName, content, cnContent } = sec

      // const secJsx = [<Box key={-1}>{sectionName}</Box>]
      // const secJsx = [
      //   <Grid item key={-1} xs={12} md={6}>
      //     <RfcTextBox >{sectionName}</RfcTextBox>
      //     <RfcTextBox >{sectionName}</RfcTextBox>
      //   </Grid>
      //   // <Grid item xs={12} md={6}>
      //   //     <RfcTextBox >{sectionName}</RfcTextBox>
      //   // </Grid>
      // ]
      const secJsx = []
      for (const [idx, paragraph] of content.entries()) {
        if (paragraph[0] === '\n') {
          secJsx.push(
            <Grid item key={idx} xs={12} md={6}>
              <PreBox >{paragraph}</PreBox>
              <PreBox >{cnContent[idx]}</PreBox>
            </Grid>
          )
        } else {
          secJsx.push(
            <Grid item xs={12} md={6}>
            <RfcTextBox key={idx}>{paragraph}</RfcTextBox>
            <RfcTextBox key={idx}>{cnContent[idx]}</RfcTextBox>
            </Grid>
          )
          // secJsx.push(<RfcTextBox key={idx}>{paragraph}</RfcTextBox>)
        }
      }

      retJsx.push(
      <Grid container columnSpacing={{ xs: 0, sm: 1, lg: 2 }} >
        { secJsx }
      </Grid>
      )
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

      <Box>
        {sectionJsx(rfcContent)}
        {/* {rfcContentJsx()} */}
      </Box>
      {/* <Grid container columnSpacing={{ xs: 0, sm: 1, lg: 2 }} > */}
      {/*   <Grid item xs={12} > */}
      {/*     <Box > */}
      {/*       { rfcContentJsx() } */}
      {/*     </Box> */}
      {/*   </Grid> */}

      {/*   <Grid */}
      {/*     item xs={12} md={6} */}
      {/*   > */}
      {/*     <Paper> */}
      {/*       <PadBox space={1}> */}
      {/*         { rfcContentJsx() } */}
      {/*       </PadBox> */}
      {/* </Paper> */}
      {/*   </Grid> */}
      {/* </Grid> */}
    </>
  )
}
