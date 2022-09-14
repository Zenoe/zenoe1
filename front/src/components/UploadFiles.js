import React, { useState, useEffect, Component } from "react";
import { LinearProgress, Box, Typography, Button, ListItem } from '@mui/material';
// import {withStyles} from '@mui/styles'
import { makeStyles  } from '@mui/styles';

import { requestUpload, requestGet } from '@/utils/request'

const useStyles = makeStyles({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#EEEEEE",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  });

const UploadFiles = ({title, id, setFileList })=> {
  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [currentFile, setCurrentFile] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const selectFile = (event) => {
    setSelectedFiles(event.target.files)
  }

  const upload = () => {
    let _currentFile = selectedFiles[0];

    setCurrentFile(_currentFile)
    setProgress(0)

    requestUpload(_currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total))
    })
      .then((response) => {
        console.log('upload completed', response);
        setMessage(response.data.message)
        setIsError(false)
        return requestGet('api/utils/filelist')
      })
      .then((res) => {
        setFileList(res.data.fileList)
      })
      .catch(() => {
        setProgress(0)
        setMessage('could not upload the file')
        setCurrentFile(undefined)
        setIsError(true)
      });

    setSelectedFiles(undefined)
  }

  return (
    <div className="mg20">
      {currentFile && (
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress className={classes.root} variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>)
      }

      <label htmlFor={id}>
        <input
          id={id}
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          /* accept=".xls,.xlsx" */
          onChange={selectFile} />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span" >
          {title}
        </Button>
      </label>
      <div className="file-name">
        {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
      </div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!selectedFiles}
        onClick={upload}>
        Upload
      </Button>

      <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
        {message}
      </Typography>
    </div >
  );
}
export default UploadFiles
