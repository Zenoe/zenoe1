import { useState, useEffect } from "react";
import { Box, Divider, Grid, Link, ListItem, Stack, Typography } from '@mui/material';
import UploadFiles from '@/components/UploadFiles'

import { requestUpload, requestGet } from '@/utils/request'

const TestCase2RF = ()=>{
  const [fileList, setFileList] = useState([])

  useEffect(()=>{
    requestGet('api/utils/filelist').then(res=>{
      setFileList(res.data.fileList)
    })
  }, [])
  return (
    <Box>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <UploadFiles title={'选择测试用例文件'} id={'selTestCaseId'} setFileList={setFileList} />
      </Grid>
      <Grid item xs={3}>
        <UploadFiles title={'选择配置文件'} id={'selConfId'} setFileList={setFileList} />
      </Grid>
    </Grid>

      <Typography variant="h6" className="list-header">
        已经上传的文件:
      </Typography>
      <ul className="list-group">
        {fileList.map((file, index) => (
          <ListItem
            divider
            key={index}>
            <a href={`${SERVER_URL}/upload/${file}`}>{file}</a>
            {/* { file } */}
          </ListItem>
        ))}
      </ul>
    </Box>
  )
}

export default TestCase2RF
