const { logger } = require('init')

const SYNTAX_SETTING_SECTION = 0
const SYNTAX_TYPE_COMMA = 1
const SYNTAX_TESTCASE_SECTION = 2
const SYNTAX_VARIABLE_SECTION = 3
const SYNTAX_KEYWORS_SECTION = 4
const SYNTAX_SCRIPT = 5
const SYNTAX_SECTION = 6
const SYNTAX_RESULT_SID = 7

const createCheckResult = (errortype, level, message, row, col = 0) => {
  return ({ errortype, level, message, pos: { row, col } })
}

const isDescText = (_line) => {
  // fw_log, fw_expect, fw_step, log
  //
  if (_line.search(/^ {2,4}(?:fw_log|fw_expect|fw_step|log) {2,4}/) === 0) return true
  else return false
}

const checkResultSidList = (_stepNum, _sidList, _globSidInfo) => {
  console.log('begin to checkResultSidList')
  const retList = []
  const _globSidList = _globSidInfo.sidList
  if (_sidList.length !== _globSidList.length) {
    const message = 'global_result 的 result 数量不一致'
    retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', -1))
  }

  for (let idx = 0; idx < _sidList.length; idx += 1) {
    const sidInfo = _sidList[idx]
    const sidPair = sidInfo.result.split('_')
    console.log('sidPair:', sidPair[0], sidPair[1])
    if (sidPair.length !== 2) {
      const message = 'result 编号不合规范。应该满足1_1,2_1,这样的格式'
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', sidInfo.row))
      continue
    }
    if (sidPair[0] !== _stepNum) {
      const message = `result 编号${sidPair[0]}和当前步骤${_stepNum}不一致`
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', sidInfo.row))
      continue
    }
    if (sidPair[1] !== `${idx + 1}`) {
      const message = `result 编号${sidInfo.result}: ${sidPair[1]}要从1开始递增`
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', sidInfo.row))
      continue
    }

    if (sidInfo.result !== _globSidList[idx]) {
      const message = `result 编号${sidInfo.result}和 global_result: ${_globSidList[idx]} 没有顺序对应`
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', _globSidInfo.row))
      break
    }
  }
  if (retList.length === 0) {
    console.log('>>checkResultSidList ok')
  }
  return retList
}

const spAroundEqCheck = (line, row) => {
  console.log('spAroundEqCheck', row)
  const retList = []
  // 等号前后不允许空格
  if (line.search(/ {1,3}=/) >= 0) {
    const message = '等号前有空格'
    retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'error', row))
  }
  if (line.search(/= {1,3}/) >= 0) {
    const message = '等号后有空格'
    retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'error', row))
  }

  return retList
}
const checkStepContent = (_rfTxtList, _rowStart, _rowEnd) => {
  console.log('#check step', _rfTxtList[_rowStart])
  // get step number

  const _stepNumMatch = _rfTxtList[_rowStart].match(/step *([1-9]+[0-9]*)/)
  const curStepNum = _stepNumMatch[1]
  // console.log(stepNumMatch[1])
  const retList = []
  const resultSidList = []
  for (let i = _rowStart + 1; i < _rowEnd; i++) {
    const _line = _rfTxtList[i]
    // pass if it's an empty line
    if (_line.search(/^ *$/) === 0) {
      continue
    }
    // console.log('begin to check _line', _line)
    // must start with 4 spaces
    {
      if (_line.search(/^ {4}\S+.*/) !== 0) {
        const message = '每行脚本开始应该空出4个空格'
        retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'warning', i))
        console.log('4 space needed:', _line, i)
      }
    }

    if (isDescText(_line)) {
      continue
    }

    // comma check todo
    const fullComma = '，'
    const fullCommaPos = _line.search(new RegExp(fullComma))
    console.log('>>>>>', _line)
    if (fullCommaPos >= 0) {
      console.log('出现中文逗号')
      retList.push(createCheckResult(SYNTAX_TYPE_COMMA, '出现中文逗号', 'error', i, fullCommaPos))
    }

    const _spCheckResult = spAroundEqCheck(_line, i)
    console.log(_spCheckResult)
    retList.concat(_spCheckResult)
    // check if there are continuous spaces, the number of whihc is neither 1 nor 4
    const _pos = _line.search(/(\S {5,}\S|\S {2,3}\S)/)
    if (_pos > 0) {
      const message = `${_pos}: 出现连续2或3个空格，或大于4个空格`
      retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'warning', i))
    }
    // ${result1_2}
    const _matchResult = _line.match(/^ {4}\$\{result(\S+)\}/)
    if (_matchResult) {
      // get result number
      // resultSidList.push(_matchResult[1])
      resultSidList.push({ line: _line, row: i, result: _matchResult[1] })
      continue
    }

    if (_line.search(/^ {4}\$\{global_result\}/) === 0) {
      // global_result
      let matches; const output = []
      const regex = / {4}\$\{result(\S+)\}/g
      while ((matches = regex.exec(_line))) {
        output.push(matches[1])
      }
      console.log('global_result:', output)
      const _globResultInfo = { line: _line, sidList: output, row: i }
      const _resultCheckRetList = checkResultSidList(curStepNum, resultSidList, _globResultInfo)
      console.log(_resultCheckRetList)
      retList.concat(_resultCheckRetList)
    }
  }

  console.log(retList)
  // check result sid
  //
  // console.log(resultSidList)
  return retList
}

/** _rowStart the line below the header,  _rowEnd is row of the next section */
const checkTestCases = (_rfTxtList, _stepList, _testCaseSectionList, _rowStart, _rowEnd) => {
  const retList = []
  // case name

  // console.log(_rfTxtList);
  console.log(_rowStart)
  console.log(_rfTxtList[_rowStart])
  if (_rfTxtList[_rowStart].search(/^[a-zA-Z_][-_a-zA-Z0-9.]* *$/) !== 0) {
    const message = '用例名应该单独一行，由大小写字母下划线开头，由大小写字母下划线，中划线，数字和小数点组成'
    retList.push(createCheckResult(SYNTAX_TESTCASE_SECTION, message, 'error', _rowStart))
  } else {
    console.log('>>test case name checked ok')
  }

  console.log('stepList:', _stepList)
  for (let i = 0; i < _stepList.length; i++) {
    const rowStepStart = _stepList[i].row
    let rowStepEnd = _rowEnd
    if (i < _stepList.length - 1) { rowStepEnd = _stepList[i + 1].row }

    retList.concat(checkStepContent(_rfTxtList, rowStepStart, rowStepEnd))
  }

  return retList
}
async function checkRFSyntaxTool (_rfTxt) {
  const checkResultList = []

  const stMap = new Map()
  const keyWordsMap = new Map()
  const orderedSectionList = []
  const testCaseSectionList = []
  const fwStepList = []
  const expList = []
  const stepList = []
  const rfTxtList = _rfTxt.split('\n')

  // console.log('.............', rfTxtList[0])
  // console.log('.............', rfTxtList[1])
  const sectionSettings = '*** Settings ***'
  const sectionTestCases = '*** Test Cases ***'
  const sectionVariables = '*** Variables ***'
  const sectionKeywords = '*** Keywords ***'

  const subSectionDocument = '[Documentation]'
  const subSectionTags = '[Tags]'
  const subSectionSetup = '[Setup]'
  const subSectionTeardown = '[Teardown]'

  let foundSection = false
  const sectionList = [sectionSettings, sectionTestCases, sectionVariables, sectionKeywords]
  const subSectionList = [subSectionDocument, subSectionTags, subSectionSetup, subSectionTeardown]

  const searchSection = (_sectionName, _line, _idx, _outSt, _outSecName) => {
    const pos = _line.indexOf(_sectionName)
    if (pos >= 0) {
      _outSt.set(_sectionName, { line: _line, row: _idx })
      _outSecName.push(_sectionName)
      return true
    }
    return false
  }
  for (const [idx, line] of rfTxtList.entries()) {
    for (const sec of sectionList) {
      if (searchSection(sec, line, idx, stMap, orderedSectionList)) {
        foundSection = true
        break
      }
    }

    for (const sec of subSectionList) {
      if (searchSection(sec, line, idx, stMap, testCaseSectionList)) {
        foundSection = true
        break
      }
    }

    if (foundSection) {
      foundSection = false
      continue
    }

    if (line.search(/^com_/) === 0) {
      keyWordsMap.set(line, idx)
    }

    // fw_step
    if (line.search(/^ *fw_step/) >= 0) {
      fwStepList.push({ line, row: idx })
      continue
    }
    // fw_expect
    if (line.search(/^ *fw_expect/) >= 0) {
      expList.push({ line, row: idx })
      continue
    }

    // fw_log
    if (line.search(/^ *fw_log/) >= 0) {
      expList.push({ line, row: idx })
      continue
    }

    // step #
    if (line.search(/^ *#/) >= 0) {
      console.log('...............', line)
      const stepStart = line.search(/step *[1-9]+[0-9]*/) > 0
      if (stepStart > 0) {
        stepList.push({ line, row: idx, stepStart })
      }
      continue
    }
  }

  // now begin to check

  logger.debug('check setting section')
  console.log(orderedSectionList)
  for (const sec of orderedSectionList) {
    console.log(sec)
    const sectionLine = stMap.get(sec).line
    const row = stMap.get(sec).row
    const matchSectionLineRegex = new RegExp(`^${sec.replace(/\*/g, '\\*')} *$`)
    if (sectionLine.search(matchSectionLineRegex) !== 0) {
      const message = `${sec}前不能有空格，后不能有其它字符`
      checkResultList.push(createCheckResult(SYNTAX_SECTION, 'error', message, row))
    }
  }

  // console.log(stMap)
  const isSettingSection = (txt) => (txt.search(/(^Library|^Resource|^Variables) *[a-zA-Z_][a-zA-Z_0-9]*/ === 0))
  const rowSetting = stMap.get(sectionSettings).row
  if (rowSetting === undefined || rowSetting !== 0) {
    checkResultList.push(createCheckResult(SYNTAX_SETTING_SECTION, 'error', `首行应该是: ${sectionSettings}`, rowSetting))
    console.log(checkResultList)
    // return checkResultList
  }

  const nextSection = orderedSectionList[1]
  console.log('nextSection', nextSection)
  logger.debug(`next section: ${nextSection}`)
  if (!nextSection) {
    checkResultList.push(createCheckResult(SYNTAX_SECTION, 'warning', '无Test Cases或KeyWords', -1))
    return checkResultList
  }

  const lineTestCase = stMap.get(sectionTestCases)
  const rowKeyWord = stMap.get(sectionKeywords)
  const findNextSec = (sec, secList) => {
    for (let i = 0; i < secList.length; i += 1) {
      if (secList[i] === sec) {
        return secList[i + 1]
      }
    }
  }

  // logger.debug(`error: ${checkResultList}`)
  let rowNextSection = 0
  if (lineTestCase) {
    logger.info('begin to check testCaseSection')
    const rowStart = lineTestCase.row + 1
    let rowEnd = rfTxtList.length
    // its a testcase file
    rowNextSection = lineTestCase.row
    // find next section row
    const _nextSec = findNextSec(sectionTestCases, orderedSectionList)
    if (_nextSec && stMap.get(_nextSec)) {
      // find next section
      rowEnd = stMap.get(_nextSec).row
    }

    const testCaseCheckResult = checkTestCases(rfTxtList, stepList, testCaseSectionList, rowStart, rowEnd)
    console.log('testcase errors: ', testCaseCheckResult)
  } else {
    // its a common txt file
    logger.info('begin to check keyWordsSection')
    rowNextSection = rowKeyWord.row
  }

  for (let i = rowSetting + 1; i < rowNextSection; i += 1) {
    if (isSettingSection(rfTxtList[i])) {
      continue
    } else {
      checkResultList.push(createCheckResult(SYNTAX_SETTING_SECTION, 'warning', `${rfTxtList[i]} 无法识别,或者不完整`, i))
    }
  }

  // ----------------TestCases---------------------
  if (stMap.get(sectionTestCases)) {
    //
  }
  // ----------------KeyWord---------------------
  // console.log(keyWordsMap)
  // console.log(fwStepList)

  console.log('endof checkRFSyntaxTool')
  return checkResultList
}

module.exports = {
  checkRFSyntaxTool
}
