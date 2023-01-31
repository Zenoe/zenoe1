import { useState, useEffect } from 'react'
import { Button, Box, Divider, Stack, Autocomplete, TextField, Checkbox, TextareaAutosize } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import Alert from '@mui/material/Alert'

import { LeftRight } from '@/utils/uiutils'
import { ipRegex } from '@/constants/commonvar'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { json2ObjList } from '@/utils/projutils'
import { LoadingButton } from '@mui/lab'
import allCliList from './cliData'
import BasicTable from '@/components/table/BasicTable'

import { requestGet } from '@/utils/request'

const DCParamConverter = () => {
  const headCells = [
    {
      id: 'key',
      numeric: false,
      disablePadding: true,
      label: 'key'
    },
    {
      id: 'value',
      numeric: false,
      disablePadding: false,
      label: 'value'
    }
  ]

  const [curCli, setCurCli] = useState('')
  const [data4Combox, setData4Combox] = useState([])
  const [data4Tbl, setData4Tbl] = useState([])
  const [loading, setLoading] = useState(false)
  const [informMsg, setInformMsg] = useState('')
  const [guessRFStr, setGuessRFStr] = useState('')
  const [guessRFStr2, setGuessRFStr2] = useState('')

  const [rawResult, setRawResult] = useState('')

  const [showInfo, setShowInfo] = useState()
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  const handleChange = (event, value) => { setCurCli(value) }

  const handleInputChange = (e, v) => { setCurCli(v) }

  const handleKVResultChange = (e, v) => {
    const _yinfo = v.map(i => (i.title)).join(',')
    setGuessRFStr(`\${result}    dut_judge_show    cmd_str=${curCli}    yinfo={${_yinfo}}    alias=dut1`)
    setGuessRFStr2(`\${result}    dut_judge_retry_show    cmd_str=${curCli}    yinfo={${_yinfo}}    alias=dut1`)
  }

  const selOnFocus = (e) => {
    const { target } = e
    if (target.value && target.value.length > 0) {
      // console.log(e.target.value.length);
      target.focus()
      target.setSelectionRange(0, target.value.length)
    }
  }

  const processConvertParamResult = (result) => {
    const _result = result.replace(/\n$/, '').replace(/'/g, '"')
    setRawResult(_result)
    // console.log(_result);
    const jsonList = _result.split('\n')
    for (const _jsonStr of jsonList) {
      try {
        const jsonResult = JSON.parse(_jsonStr)
        // console.log(jsonResult);
        const [retList4Combox, retList4Tbl] = json2ObjList(jsonResult)
        setData4Combox(retList4Combox)
        setData4Tbl(retList4Tbl)
      } catch (err) {
        console.log(_jsonStr, 'not a json str')
      }
    }
    // setData4Combox(_result.split(','))
  }

  const preProcessCli = (_cli) => {
    return _cli
      .replaceAll('-', '')
      .replace(/hundredGigabitEthernet +\d\/\d/, 'dutport')
      .replace(ipRegex, ' ip ')
      .replace(/ +\d+/, ' num')
      .replace(/\(.+\)/, 'word')
      .trim()
  }

  const convertParam = () => {
    setInformMsg('')
    setGuessRFStr('')
    setData4Combox([])
    setRawResult('')
    if (curCli.length === 0) {
      setInformMsg('请输入 cli 命令')
      return
    }
    if (showInfo && showInfo.length === 0) {
      setInformMsg('请输入回显信息')
      return
    }
    setLoading(true)
    requestGet('api/utils/convertparam', { cli: preProcessCli(curCli), showInfo })
      .then(res => {
        const { result } = res.data
        processConvertParamResult(result)
        setLoading(false)
        setInformMsg('ok')
      })
      .catch(res => {
        console.log('convert error', res)
        setData4Combox([])
        setData4Tbl([])
        setLoading(false)
        setInformMsg('error')
      })
  }

  const handleShowInfoChange = (e) => {
    setShowInfo(e.target.value)
  }

  const alertJsx = (msg) => {
    if (msg === '') return null
    if (msg === 'error') return <Alert severity="error">{msg}</Alert>
    if (msg === 'ok') return <Alert severity="info">{msg}</Alert>
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
          /* value={'show ipv6 interface brief'} */
          /* value={'show bgp vpnv4 unicast all summary'} */
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
          {alertJsx(informMsg)}
        </Box>
        <Box
          sx={{ color: 'blue' }}
        >
          [-]:遇到要输入word或num时,直接输入word或num, 如：show ip route vrf word , show isis topology flex-algo num <br/>
          [-]:匹配到命令时，直接按回车就可
        </Box>
      </Stack>

      <Box id="inputShowResultId" sx={{ fontSize: 14, mt: 2 }}>
        <TextareaAutosize
          minRows={10}
          maxRows={30}
          aria-label="maximum height"
          placeholder="输入cli 返回结果"
          value={showInfo}
          onChange={handleShowInfoChange}
          onFocus={selOnFocus}
          style={{ width: '100%' }}
        />
      </Box>

      <Box sx={{ m: 1 }}>返回参数</Box>

      {/* <Stack direction="row" spacing={2}> */}
      <LeftRight>
        <BasicTable
          headCells={headCells}
          /* rows={ [{key:'1',value:'vvv'}, {key:'1',value:'333'}] } */
          rows={data4Tbl}
          style={{ whiteSpace: 'pre' }}
        />

        <Box>
          <Autocomplete
            multiple
            disableCloseOnSelect
            disableListWrap
            id="combo-box-demo"
            options={data4Combox}
            renderInput={(params) => <TextField {...params} label="参数搜索" />}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </li>
            )}
            onChange={handleKVResultChange}
          />
          <Box sx={{ m: 1 }} >猜你需要:</Box>
          <TextField
            value={guessRFStr}
            sx={{ width: '100%' }}
            onFocus={selOnFocus}
          />

          <TextField
            value={guessRFStr2}
            sx={{ width: '100%' }}
            onFocus={selOnFocus}
          />
          <Box sx={{ m: 1 }}>原始输出:</Box>
      <TextField
        multiline
        minRows={10}
        value={rawResult}
        onFocus={selOnFocus}
        InputProps={{
          readOnly: true
        }}
        style={{ width: '100%' }}
      />
        </Box>
              </LeftRight>

      {/* </Stack> */}
    </Box>
  )
}

export default DCParamConverter
