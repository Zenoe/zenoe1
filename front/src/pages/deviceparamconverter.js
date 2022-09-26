import { useState, useEffect } from 'react'
import { Button, Box, Divider, Grid, Stack, Typography, MenuItem, Autocomplete, TextField, Checkbox, TextareaAutosize } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { mybasename } from '@/utils/jsutils'
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

  const [rawResult, setRawResult] = useState('')
  const [showInfo, setShowInfo] = useState()
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  const handleChange = (event, value) => { setCurCli(value) }

  const handleInputChange = (e, v) => { setCurCli(v) }

  const handleKVResultChange = (e, v) => {
    const _yinfo = v.map(i => (i.title)).join(',')
    setGuessRFStr(`\${result}    dut_judge_show    cmd_str=${curCli}    yinfo={${_yinfo}}    alias=dut1`)
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
    setRawResult(result)
    const _result = result.replace(/\n$/, '').replace(/'/g, '"')
    // console.log(_result);
    try {
      const jsonList = _result.split('\n')
      // const jsonResult = JSON.parse(jsonList[2])
      // setData4Combox(json2list(jsonResult))
      // return
      // console.log(jsonList);
      for (const _jsonStr of jsonList) {
        const jsonResult = JSON.parse(_jsonStr)
        // console.log(jsonResult);
        if (Array.isArray(jsonResult)) {
          // console.log('is array', list2ObjList(jsonResult));
          // allKVList.push(...list2ObjList(jsonResult))
        } else {
          const [retList4Combox, retList4Tbl] = json2ObjList(jsonResult)
          setData4Combox(retList4Combox)
          setData4Tbl(retList4Tbl)
        }
      }
    } catch (e) {
      console.error('parse json failed', e)
    }
    // setData4Combox(_result.split(','))
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
    if (showInfo.length === 0) {
      setInformMsg('请输入回显信息')
      return
    }
    setLoading(true)
    requestGet('api/utils/convertparam', { cli: curCli, showInfo })
      .then(res => {
        // console.log('convert ok');
        const { result } = res.data
        processConvertParamResult(result)
        setLoading(false)
        setInformMsg('ok')
      })
      .catch(res => {
        console.log('convert error', res)
        setLoading(false)
        setInformMsg('error')
      })
  }

  const handleShowInfoChange = (e) => {
    setShowInfo(e.target.value)
  }
  return (
    <Box>
      <Stack direction='row' spacing={2}>
        <Autocomplete
    /* disablePortal */
          autoHighlight
          /* freeSolo */
          autoSelect
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
          {informMsg}
        </Box>
        <Box
          sx={{ color: 'blue' }}
        >
          [-]:遇到要输入不同word的情况时,不需要输入特定word, 例如：show ip route vrf (VPNXXX),只要输入 show ip route vrf word <br/>
          [-]:匹配到命令时，直接按回车就可
        </Box>

      </Stack>
      <Box id="inputShowResultId" sx={{ fontSize: 14, mt: 2 }}>
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

      <Box sx={{ m: 1 }}>返回参数形式</Box>
      <Stack direction="row" spacing={2}>
      <BasicTable
        headCells={headCells}
        /* rows={ [{key:'1',value:'vvv'}, {key:'1',value:'333'}] } */
        rows={data4Tbl}
        style={{ width: 700 }}
      />
    {/*     <Box id="inputShowResultId" sx={{fontSize: 14}}> */}
    {/*       <TextField */}
    {/*         id="outlined-multiline-flexible" */}
    {/* /\* label="返回参数形式" *\/ */}
    {/*         multiline */}
    {/*         minRows={10} */}
    {/*         value={data4Combox.join('\n')} */}
    {/*         onChange={handleChange} */}
    {/*         InputProps={{ */}
    {/*           readOnly: true, */}
    {/*         }} */}
    {/*         style={{ width: 700 }} */}

    {/*       /> */}
    {/*     </Box> */}

        <Box>
          <Autocomplete
            multiple
            disableCloseOnSelect
            disableListWrap
            id="combo-box-demo"
            options={data4Combox}
            sx={{ width: 700 }}
            renderInput={(params) => <TextField {...params} label="结果搜索" />}
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
            sx={{ width: 700 }}
            onFocus={selOnFocus}
          />

        </Box>
      </Stack>
      <Box>原始输出:</Box>
      <TextField
        multiline
        minRows={10}
        value={rawResult}
        onFocus={selOnFocus}
        InputProps={{
          readOnly: true
        }}
        style={{ width: 700 }}
      />
    </Box>
  )
}

export default DCParamConverter
