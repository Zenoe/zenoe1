import { useState, useEffect } from "react";
import { Button, Box, Divider, Grid, Stack, Typography, MenuItem, Autocomplete, TextField, TextareaAutosize } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { mybasename } from '@/utils/jsutils';
import { LoadingButton } from '@mui/lab';
import allCliList from './cliData';

import { requestGet } from '@/utils/request'

const DCParamConverter = ()=>{
  const [curCli, setCurCli] = useState('')
  const [resultKVList, setResultKVList] = useState([])
  const [loading, setLoading] = useState(false);
  const [informMsg, setInformMsg] = useState('')
  const [guessRFStr, setGuessRFStr] = useState('')

  // const [showInfo, setShowInfo] = useState('')
  const [showInfo, setShowInfo] = useState(`HundredGigabitEthernet 1/1    [administratively down/down]
        1002::2
        FE80::20D:F8FF:FEE9:66B0
HundredGigabitEthernet 1/2    [administratively down/down]
        1005::2
        FE80::20D:F8FF:FEE9:66B0
HundredGigabitEthernet 1/3    [administratively down/down]
        1003::2
        FE80::20D:F8FF:FEE9:66B0
Loopback 0                    [up/up]
        2::2
        FE80::20D:F8FF:FEE9:66B0
        4::4`)

  const handleChange = (event, value) => {
    // console.log(value);
    setCurCli(value);
  };

  const handleInputChange = (e, v)=>{
    // console.log('handleInputChange', v);
    setCurCli(v)
  }


  const handleKVResultChange = (e, v)=>{
    setGuessRFStr(`\${result}    dut_judge_show    cmd_str=${curCli}    yinfo={${v}}    alias=dut1`)
  }

  const selOnFocus = (e)=>{
    const {target} = e
    if(target.value && target.value.length > 0){
      // console.log(e.target.value.length);
      target.focus();
      target.setSelectionRange(0, target.value.length);
    }
  }

  const selLineOnFocus = (e) => {
    console.log(e);
    const {target} = e
    if(target.value && target.value.length > 0){
      target.focus();
      const _value = target.value
      // target.setSelectionRange(0, target.value.length);
    }
  }
  const processConvertParamResult = (result) => {
    // remove prefix({) and suffix (}\n)
    const _result = result.replace(/^{/, '').replace(/}\n$/,'')
    console.log(_result);
    setResultKVList(_result.split(','))
  }
  const convertParam = ()=>{
    setInformMsg('')
    setGuessRFStr('')
    if(curCli.length === 0){
      setInformMsg('请输入 cli 命令')
      return
    }
    if(showInfo.length === 0){
      setInformMsg('请输入回显信息')
      return
    }
    setLoading(true)
    requestGet('api/utils/convertparam', {cli:curCli, showInfo:showInfo})
      .then(res=>{
        // console.log('convert ok');
        const { result } = res.data
        processConvertParamResult(result)
        setLoading(false)
        setInformMsg('ok')
      })
      .catch(res=>{
        console.log('convert error', res);
        setLoading(false)
        setInformMsg('error')
      })

  }

  const handleShowInfoChange = (e)=>{
    setShowInfo(e.target.value)
  }
  return (
    <Box>
      <Stack direction='row' spacing={2}>
        <Autocomplete
    /* disablePortal */
          autoHighlight
          freeSolo
    /* autoSelect */
          id="combo-box-demo"
          options={allCliList}
          sx={{ width: 400 }}
          value={'show ipv6 interface brief'}
          /* value={''} */
          renderInput={(params) => <TextField {...params} label="cli 命令" />}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />

        <LoadingButton
          onClick={convertParam}
          loading={loading}
          endIcon={<ChangeCircleIcon />}
          loadingPosition="end"
          variant="contained"
        >
          运行
        </LoadingButton>
        <Box>
          {informMsg}
        </Box>

      </Stack>
      <Box id="inputShowResultId" sx={{fontSize: 14, mt:2}}>
        <TextareaAutosize
          minRows={10}
          aria-label="maximum height"
          placeholder="输入cli 返回结果"
          value={showInfo}
          onChange={handleShowInfoChange}
          onFocus={selOnFocus}
          style={{ width: 700 }}
        />
      </Box>

      <Box sx={{m:1}}>返回参数形式</Box>
      <Stack direction="row" spacing={2}>
        <Box id="inputShowResultId" sx={{fontSize: 14}}>
          <TextField
            id="outlined-multiline-flexible"
            /* label="返回参数形式" */
            multiline
            minRows={10}
            value={resultKVList.join('\n')}
            onChange={handleChange}
            onFocus={selLineOnFocus}
            InputProps={{
              readOnly: true,
            }}
            style={{ width: 700 }}

          />
        </Box>

      <Box>
          <Autocomplete
            autoHighlight
            disableListWrap
            id="combo-box-demo"
            options={resultKVList}
            sx={{ width: 700 }}
            renderInput={(params) => <TextField {...params} label="结果搜索" />}
            onChange={handleKVResultChange}
          />
        <Box sx={{m:1}} >猜你需要:</Box>
        <TextField
          value={guessRFStr}
          sx={{ width: 700 }}
          onFocus={selOnFocus}
        />

      </Box>
      </Stack>
    </Box>
  )
}

export default DCParamConverter
