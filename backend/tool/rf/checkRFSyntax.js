const { createCheckResult, collectResultSids, findRowOfGlobalResult, isDescText, spAroundEqCheck, searchSection, checkSection, isNextLineCurLine, findNextSec, combineLines } = require('./helper')
const { logger } = require('init')

const SYNTAX_SETTING_SECTION = 0
const SYNTAX_TYPE_COMMA = 1
const SYNTAX_TESTCASE_SECTION = 2
const SYNTAX_VARIABLE_SECTION = 3
const SYNTAX_KEYWORS_SECTION = 4
const SYNTAX_SCRIPT = 5
const SYNTAX_SECTION = 6
const SYNTAX_RESULT_SID = 7
const SYNTAX_STRUCTURE = 8

let gModifyRFtxt = []
let patchList = []

const checkResultSidList = (_stepNum, _sidList, _globSidInfo) => {
  console.log('begin to check ResultSidList')
  const retList = []
  const _globSidList = _globSidInfo.sidList
  if (_sidList.length !== _globSidList.length) {
    const message = `step: ${_stepNum} global_result 的 result 数量不一致`
    retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error'))
  }

  for (let idx = 0; idx < _sidList.length; idx += 1) {
    const sidInfo = _sidList[idx]
    const sidPair = sidInfo.result.split('_')
    if (sidPair.length !== 2) {
      const message = 'result 编号不合规范。应该满足1_1,2_1,这样的格式'
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', sidInfo.row))
      continue
    }
    if (sidPair[0] !== _stepNum) {
      const message = `result 编号${sidPair[0]}和当前步骤${_stepNum}不一致`
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', sidInfo.row))
      const diffObj = {}
      diffObj.ori = gModifyRFtxt[sidInfo.row]

      gModifyRFtxt[sidInfo.row] = gModifyRFtxt[sidInfo.row].replace(sidInfo.result, `${_stepNum}_${idx + 1}`)

      diffObj.mod = gModifyRFtxt[sidInfo.row]
      patchList.push(diffObj)
      continue
    }
    if (sidPair[1] !== `${idx + 1}`) {
      const message = `result 编号${sidInfo.result}:  应该为${_stepNum}_${idx + 1}(从1开始递增)`
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', sidInfo.row))
      const diffObj = {}
      diffObj.ori = gModifyRFtxt[sidInfo.row]

      gModifyRFtxt[sidInfo.row] = gModifyRFtxt[sidInfo.row].replace(sidInfo.result, `${_stepNum}_${idx + 1}`)

      diffObj.mod = gModifyRFtxt[sidInfo.row]
      patchList.push(diffObj)
      continue
    }

    if (sidInfo.result !== _globSidList[idx]) {
      const message = `result 编号${sidInfo.result}和 global_result: ${_globSidList[idx]} 没有顺序对应`
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'error', _globSidInfo.row))

      const _row = findRowOfGlobalResult(gModifyRFtxt, _globSidInfo.row, _globSidInfo.rowEnd, _globSidList[idx])
      if (_row < 0) {
        throw new Error('could not find row of global_result')
      }
      const diffObj = {}
      diffObj.ori = gModifyRFtxt[_row]
      // logger.debug(gModifyRFtxt[_globSidInfo.row])
      gModifyRFtxt[_row] = gModifyRFtxt[_row].replace(_globSidList[idx], `${_stepNum}_${idx + 1}`)
      diffObj.mod = gModifyRFtxt[_row]
      patchList.push(diffObj)

      logger.debug(gModifyRFtxt[_globSidInfo.row])
    }
  }
  if (retList.length === 0) {
    logger.debug('>>check ResultSidList ok')
  }
  return retList
}

const checkStepContent = (_rfTxtList, _rowStart, _rowEnd) => {
  // get step number
  const _stepNumMatch = _rfTxtList[_rowStart].match(/step *([1-9]+[0-9]*)/)
  const curStepNum = _stepNumMatch[1]
  // console.log(stepNumMatch[1])
  let retList = []
  const resultSidList = []
  for (let i = _rowStart + 1; i < _rowEnd; i++) {
    const _line = _rfTxtList[i]
    // pass if it's an empty line
    if (_line.search(/^ *$/) === 0) {
      continue
    }
    // console.log('begin to check _line', _line)
    // must start with 4 spaces
    if (_line.search(/^ {4}\S+.*/) !== 0) {
      const message = '每行脚本开始应该空出4个空格'
      retList.push(createCheckResult(SYNTAX_RESULT_SID, message, 'warning', i))
      console.log('4 space needed:', _line, i)
    }

    if (isDescText(_line)) {
      if (_line.search(/( fw_step | fw_expect)/) >= 0) {
        // not allow multiple line
        const nextLine = _rfTxtList[i + 1]
        if (isNextLineCurLine(nextLine)) {
          const message = 'fw_step、fw_expect内容不允许换行'
          retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'warning', i + 1))
          i += 1
        }
      } else {
        while (true) {
          // skip fw_log/log
          const nextLine = _rfTxtList[i + 1]
          if (nextLine) {
            // check if the next line is the continuation of the previous line
            if (isNextLineCurLine(nextLine)) {
              i += 1
            } else {
              break
            }
          } else {
            break
          }
        }
      }
      continue
    }

    // comma check todo
    const fullComma = '，'
    const fullCommaPos = _line.search(new RegExp(fullComma))
    if (fullCommaPos >= 0) {
      retList.push(createCheckResult(SYNTAX_TYPE_COMMA, '出现中文逗号', 'error', i, fullCommaPos))
      const diffObj = {}
      diffObj.ori = gModifyRFtxt[i]
      gModifyRFtxt[i] = gModifyRFtxt[i].replaceAll(fullComma, ',')
      diffObj.mod = gModifyRFtxt[i]
      patchList.push(diffObj)
    }

    const _spCheckResult = spAroundEqCheck(_line, i, SYNTAX_SCRIPT)
    if (_spCheckResult.length > 0) {
      const diffObj = {}
      diffObj.ori = gModifyRFtxt[i]
      gModifyRFtxt[i] = gModifyRFtxt[i].replaceAll(/ {1,3}=/g, '=').replaceAll(/= {1,3}/g, '=')
      diffObj.mod = gModifyRFtxt[i]
      patchList.push(diffObj)
    }
    retList = retList.concat(_spCheckResult)
    // check if there are continuous spaces, the number of whihc is neither 1 nor 4
    const _pos = _line.search(/(\S {5,}\S|\S {2,3}\S)/)
    if (_pos > 0) {
      const message = `${_pos}: 出现连续2或3个空格，或大于4个空格`
      retList.push(createCheckResult(SYNTAX_SCRIPT, message, 'warning', i))
    }

    // collect result
    // ${result1_2}
    // const _matchResult = _line.match(/^ {4}\$\{result(\S+)\}/)
    const resultPos = _line.search(/^ {4}\$\{result(\S+)\}/)
    if (resultPos === 0) {
      const output = collectResultSids(_line)

      // get result number
      // resultSidList.push(_matchResult[1])
      for (const item of output) {
        resultSidList.push({ line: _line, row: i, result: item })
      }
      continue
    }

    if (_line.search(/^ {4}\$\{global_result\}/) === 0) {
      // global_result
      const { combineLine, lastRow } = combineLines(_rfTxtList, i)
      const output = collectResultSids(combineLine)
      logger.info(`global_result: ${output}`)
      // const _globResultInfo = { line: _line, sidList: output, row: i }
      const _globResultInfo = { line: _line, sidList: output, row: i, rowEnd: lastRow }
      const _resultCheckRetList = checkResultSidList(curStepNum, resultSidList, _globResultInfo)
      logger.debug(_resultCheckRetList)
      retList = retList.concat(_resultCheckRetList)

      i = lastRow
    }
  }

  return retList
}

/** _rowStart the line below the header,  _rowEnd is row of the next section */
const checkTestCases = (_rfTxtList, _stepList, _testCaseSectionList, _rowStart, _rowEnd) => {
  let retList = []
  // case name

  // console.log(_rfTxtList[_rowStart])
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

    const _tmp = checkStepContent(_rfTxtList, rowStepStart, rowStepEnd)
    retList = retList.concat(_tmp)
  }

  return retList
}

async function checkRFSyntaxTool (_rfTxt, _rfType) {
  let checkResultList = []
  const stMap = new Map()
  const keyWordsMap = new Map()
  const orderedSectionList = []
  const testCaseSectionList = []
  const fwStepList = []
  const expList = []
  const stepList = []
  const rfTxtList = _rfTxt.split('\n')
  patchList = []
  gModifyRFtxt = [...rfTxtList]

  const sectionSettings = '*** Settings ***'
  const sectionTestCases = '*** Test Cases ***'
  const sectionVariables = '*** Variables ***'
  const sectionKeywords = '*** Keywords ***'

  const subSectionDocument = '[Documentation]'
  const subSectionTags = '[Tags]'
  // const subSectionSetup = '[Setup]'
  const subSectionTeardown = '[Teardown]'

  let foundSection = false
  const sectionList = [sectionSettings, sectionTestCases, sectionVariables, sectionKeywords]
  const subSectionList = [subSectionDocument, subSectionTags, subSectionTeardown]

  return new Promise((resolve, reject) => {
    try {
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
      }

      const sectionCheckRes = checkSection(testCaseSectionList, _rfType, SYNTAX_STRUCTURE)
      if (sectionCheckRes.length > 0) { resolve({ checkResultList: sectionCheckRes }) }

      // now begin to check
      logger.debug('check setting section')
      for (const sec of orderedSectionList) {
        // console.log(sec)
        const sectionLine = stMap.get(sec).line
        const row = stMap.get(sec).row
        const matchSectionLineRegex = new RegExp(`^${sec.replace(/\*/g, '\\*')} *$`)
        if (sectionLine.search(matchSectionLineRegex) !== 0) {
          const message = `${sec}前不能有空格，后不能有其它字符`
          checkResultList.push(createCheckResult(SYNTAX_SECTION, 'error', message, row))
        }
      }

      const isSettingSection = (txt) => (txt.search(/(^Library|^Resource|^Variables) *[a-zA-Z_][a-zA-Z_0-9]*/ === 0))
      const rowSetting = stMap.get(sectionSettings).row
      if (rowSetting === undefined || rowSetting !== 0) {
        checkResultList.push(createCheckResult(SYNTAX_SETTING_SECTION, 'error', `首行应该是: ${sectionSettings}`, rowSetting))
        resolve({ checkResultList })
      }

      const nextSection = orderedSectionList[1]
      logger.debug(`next section: ${nextSection}`)
      if (!nextSection) {
        checkResultList.push(createCheckResult(SYNTAX_SECTION, 'warning', '无Test Cases或KeyWords'))
        resolve({ checkResultList })
      }

      const lineTestCase = stMap.get(sectionTestCases)
      const rowKeyWord = stMap.get(sectionKeywords)

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
        checkResultList = checkResultList.concat(testCaseCheckResult)
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

      console.log('endof checkRFSyntaxTool', checkResultList)
      if (patchList.length > 0) { resolve({ checkResultList, modifyRFtxt: gModifyRFtxt, patchList }) } else { resolve({ checkResultList, modifyRFtxt: [], patchList }) }
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  checkRFSyntaxTool
}