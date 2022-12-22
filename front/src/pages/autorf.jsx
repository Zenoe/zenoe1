import { useState, useEffect } from 'react'
import { Button, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { mybasename } from '@/utils/jsutils'
import MenuItem from '@mui/material/MenuItem'
import SendIcon from '@mui/icons-material/Send'
import UploadFiles from '@/components/UploadFiles'
import { LoadingButton } from '@mui/lab'

import { requestUpload, requestGet } from '@/utils/request'

const AutoRf = () => {
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pkgNameList, setPkgNameList] = useState([])
  const [curPkgName, setCurPkgName] = useState('')
  const [convertMsg, setConvertMsg] = useState('')

  const cli2Rf = () => {
    setLoading(true)
    setConvertMsg('')
    requestGet('api/utils/convert2rf', { pkgName: curPkgName })
      .then(res => {
        setConvertMsg('生成RF脚本成功')
        setLoading(false)
        requestGet('api/utils/filelist', { ext: 'zip' }).then(res => {
        })
      })
      .catch(res => {
        console.log('convert error', res)
        setLoading(false)
        setConvertMsg('生成RF脚本失败')
      })
  }

  return (
    <Box>
    </Box>
  )
}

export default AutoRf
