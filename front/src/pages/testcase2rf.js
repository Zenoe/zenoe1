import { useState, useEffect } from 'react'
import { Button, Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { mybasename } from '@/utils/jsutils'
import MenuItem from '@mui/material/MenuItem'
import SendIcon from '@mui/icons-material/Send'
import UploadFiles from '@/components/UploadFiles'
import { LoadingButton } from '@mui/lab'

import { requestUpload, requestGet } from '@/utils/request'

const TestCase2RF = () => {
  const [fileList, setFileList] = useState([])
  const [rfFileList, setRfFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pkgNameList, setPkgNameList] = useState([])
  const [curPkgName, setCurPkgName] = useState('')
  const [convertMsg, setConvertMsg] = useState('')

  const convert2Rf = () => {
    setLoading(true)
    setConvertMsg('')

    requestGet('api/utils/convert2rf', { pkgName: curPkgName })
      .then(res => {
        setConvertMsg('生成RF脚本成功')
        // console.log('convert ok');
        setLoading(false)
        requestGet('api/utils/filelist', { ext: 'zip' }).then(res => {
          setRfFileList(res.data.fileList)
        })
      })
      .catch(res => {
        console.log('convert error', res)
        setLoading(false)
        setConvertMsg('生成RF脚本失败')
      })
  }
  useEffect(() => {
    requestGet('api/utils/filelist').then(res => {
      setFileList(res.data.fileList.filter(i => !i.endsWith('.zip')))
      setRfFileList(res.data.fileList.filter(i => i.endsWith('.zip')))
    })
  }, [])

  useEffect(() => {
    setPkgNameList(fileList.filter(i => i.includes('TP.xls')).map(i => mybasename(i)))
  }, [fileList])

  useEffect(() => {
    if (pkgNameList.length > 0) { setCurPkgName(pkgNameList[0]) } else { setCurPkgName('') }
  }, [pkgNameList])

  const handleChange = (event) => {
    setCurPkgName(event.target.value)
  }

  return (
    <Box>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Stack direction="row" spacing={2}>
          <UploadFiles title={'选择测试用例文件'} id={'selTestCaseId'} setFileList={setFileList} />
          <a href={`${SERVER_URL}/static/template/testcase_template.xlsx`}>{'模板下载'}</a>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack direction="row" spacing={2}>
          <UploadFiles title={'选择配置文件'} id={'selConfId'} setFileList={setFileList} />
          <a href={`${SERVER_URL}/static/template/testcase_config_template.xlsx`}>{'模板下载'}</a>
        </Stack>

      </Grid>
      <Grid item xs={6}>
        <Stack direction="row" spacing={2}>
        <LoadingButton
          onClick={convert2Rf}
          loading={loading}
          endIcon={<SendIcon />}
          loadingPosition="end"
          variant="contained"
        >
          转换
        </LoadingButton>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="pkgNameId" sx={{ fontSize: 16 }}>选择工作包</InputLabel>
          <Select
            labelId="pkgNameId"
            // value is the default value for controlled select
            value={curPkgName}
            /* SelectProps={{ */
            /*   renderValue: (value) => value, */
            /* }} */
            /* defaultValue={curPkgName} */
            onChange={handleChange}
          >
            {pkgNameList.map(i => (<MenuItem value={i} key={i}>{i}</MenuItem>))}
          </Select>
        </FormControl>
          <Box>
            {convertMsg}
          </Box>
        </Stack>
      </Grid>
    </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <Box mt={4}>
            <Typography variant="h6" className="list-header">
              已经上传的文件:
            </Typography>
            <ul className="list-group">
              {fileList.map((file, index) => (
                <ListItem
                  divider
                  key={index}>
                  <a href={`${SERVER_URL}${file}`}>{mybasename(file)}</a>
                  {/* { file } */}
                </ListItem>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={4}>
            <Typography variant="h6" className="list-header">
              生成的RF文件:
            </Typography>
            <ul className="list-group">
              {rfFileList.map((file, index) => (
                <ListItem
                  divider
                  key={index}>
                  <a href={`${SERVER_URL}${file}`}>{file.substring(file.lastIndexOf('/') + 1)}</a>
                  {/* { file } */}
                </ListItem>
              ))}
            </ul>
          </Box>

        </Grid>
      </Grid>
    </Box>
  )
}

export default TestCase2RF
