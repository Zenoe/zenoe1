
const createCheckResult = (errortype, level, message, row, col = 0) => {
  return ({ errortype, level, message, pos: { row, col } })
}

const isDescText = (_line) => {
  // fw_log, fw_expect, fw_step, log
  //
  if (_line.search(/^ {2,4}(?:fw_log|fw_expect|fw_step|log) {2,4}/) === 0) return true
  else return false
}

const spAroundEqCheck = (line, row, type) => {
  console.log('spAroundEqCheck', row)
  const retList = []
  // 等号前后不允许空格
  if (line.search(/ {1,3}=/) >= 0) {
    const message = '等号前有空格'
    retList.push(createCheckResult(type, message, 'error', row))
  }
  if (line.search(/= {1,3}/) >= 0) {
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

module.exports = {
  createCheckResult,
  spAroundEqCheck,
  isDescText,
  searchSection,
  findNextSec
}
