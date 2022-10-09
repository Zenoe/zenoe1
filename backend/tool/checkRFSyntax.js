const { logger } = require('init')

const SYNTAX_SETTING_SECTION = 0
const SYNTAX_TYPE_COMMA = 1
const SYNTAX_TESTCASE_SECTION = 2
const SYNTAX_VARIABLE_SECTION = 3
const SYNTAX_KEYWORS_SECTION = 4
const SYNTAX_SCRIPT = 5
const SYNTAX_SECTION = 6

const SPC_NUM = 4

const createCheckResult = (errortype, level, message, row, col = 0) => {
  return ({ errortype, level, message, pos: { row, col } })
}

const isDescText = (_line) => {
  // fw_log, fw_expect, fw_step, log
  //
  if (_line.search(/^ {4}(?:fw_log|fw_expect|fw_step|log) {4}/) === 0) return true
  else return false
}

const checkResultSidList = (_stepNum, _sidList, _checkSidList) => {
  const retList = []
  if (_sidList.length !== _checkSidList.length) {
    const message = 'global_result 的 result 数量不一致'
    retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'warning', -1))
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
        retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'warning', i))
        console.log('4 space needed:', _line, i)
      }
    }

    if (isDescText(_line)) {
      continue
    }
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
      resultSidList.push(_matchResult[1])
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
      checkResultSidList(curStepNum, resultSidList, output)
    }
  }

  // console.log(retList)
  // check result sid
  //
  console.log(resultSidList)
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
  const fullComma = '，'

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
      const stepStart = line.search(/step *[1-9]+[0-9]*/) > 0
      if (stepStart > 0) {
        stepList.push({ line, row: idx, stepStart })
      }
      continue
    }

    // comma check todo
    // const fullCommaPos = line.search(new RegExp(fullComma))
    // if (fullCommaPos >= 0) {
    //   checkResultList.push(createCheckResult(SYNTAX_TYPE_COMMA, 'error', `出现中文逗号: row:${idx}:${fullCommaPos}`), idx + 1, fullCommaPos)
    // }
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
