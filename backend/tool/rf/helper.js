
const createCheckResult = (errortype, message, level, row = -1, col = 0) => {
  return ({ errortype, level, message, pos: { row, col } })
}

const isDescText = (_line) => {
  // fw_log, fw_expect, fw_step, log
  //
  if (_line.search(/^ {2,4}(?:fw_log|fw_expect|fw_step|log) {2,4}/) === 0) return true
  else return false
}

const spAroundEqCheck = (line, row, type) => {
  const retList = []
  // 等号前后不允许空格
  if (line.search(/\S {1,3}=/) >= 0) {
    const message = '等号前有空格'
    retList.push(createCheckResult(type, message, 'error', row))
  }
  if (line.search(/= {1,3}\S/) >= 0) {
    const message = '等号后有空格'
    retList.push(createCheckResult(type, message, 'error', row))
  }

  return retList
}

const searchSection = (_sectionName, _line, _idx, _outSt, _outSecName) => {
  const pos = _line.indexOf(_sectionName)
  if (pos >= 0) {
    _outSt.set(_sectionName, { line: _line, row: _idx })
    _outSecName.push(_sectionName)
    return true
  }
  return false
}

const findNextSec = (sec, secList) => {
  for (let i = 0; i < secList.length; i += 1) {
    if (secList[i] === sec) {
      return secList[i + 1]
    }
  }
}

const isNextLineCurLine = (nextLine) => {
  if (!nextLine) return false
  if (nextLine.search(/^ {4}\.\.\./) === 0) {
    return true
  }
  return false
}

const combineLines = (rfTxtList, rowStart) => {
  let i = rowStart
  let retLine = rfTxtList[rowStart]
  while (isNextLineCurLine(rfTxtList[i + 1])) {
    retLine = `${retLine}${rfTxtList[i + 1].replace(/^ {4}\.\.\./, '')}`
    i += 1
  }
  return { combineLine: retLine, lastRow: i }
}

const findRowOfGlobalResult = (gModifyRFtxt, row, rowEnd, containedSid) => {
  for (let i = row; i <= rowEnd; i += 1) {
    if (gModifyRFtxt[i].includes(containedSid)) {
      return i
    }
  }
  return -1
}

const collectResultSids = (_line) => {
  const retList = []
  const regex = / {4}\$\{result(\S+)\}/g
  let matches
  while ((matches = regex.exec(_line))) {
    retList.push(matches[1])
  }

  return retList
}
const checkSection = (subsecList, rfType, errorType) => {
  const retList = []
  if (rfType === 'testcase') {
    // must have
    const subSectionList = ['[Documentation]', '[Tags]', '[Teardown]']
    subSectionList.forEach(item => {
      if (!subsecList.includes(item)) {
        const message = `没有${item}`
        retList.push(createCheckResult(errorType, message, 'error'))
      }
    })
  } // else if (rfType === 'keyword') {}

  return retList
}
module.exports = {
  createCheckResult,
  spAroundEqCheck,
  isDescText,
  searchSection,
  checkSection,
  isNextLineCurLine,
  combineLines,
  findRowOfGlobalResult,
  collectResultSids,
  findNextSec
}
