import { useState, useEffect } from "react";
import { Button, Box, Divider, Grid, Link, ListItem, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UploadFiles from '@/components/UploadFiles'
import { LoadingButton } from '@mui/lab';

import { requestUpload, requestGet } from '@/utils/request'

const TestCase2RF = ()=>{
  const [fileList, setFileList] = useState([])
  const [rfFileList, setRfFileList] = useState([])
  const [loading, setLoading] = useState(false);

  const convert2Rf = ()=>{
    setLoading(true)
    requestGet('api/utils/convert2rf')
      .then(res=>{
        console.log('convert ok');
        setLoading(false)
        requestGet('api/utils/filelist', {ext:'zip'}).then(res=>{
          setRfFileList(res.data.fileList)
        })
      })
      .catch(res=>{
        console.log('convert error', res);
        setLoading(false)
      })
  }
  useEffect(()=>{
    requestGet('api/utils/filelist').then(res=>{
      setFileList(res.data.fileList.filter(i=>!i.endsWith('.zip')))
      setRfFileList(res.data.fileList.filter(i=>i.endsWith('.zip')))
    })
  }, [])
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
      <Grid item xs={3}>
        <LoadingButton
          onClick={convert2Rf}
          loading={loading}
          endIcon={<SendIcon />}
          loadingPosition="end"
          variant="contained"
        >
          转换
        </LoadingButton>

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
                  <a href={`${SERVER_URL}${file}`}>{file.substring(file.lastIndexOf('/')+1)}</a>
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
                  <a href={`${SERVER_URL}${file}`}>{file.substring(file.lastIndexOf('/')+1)}</a>
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
