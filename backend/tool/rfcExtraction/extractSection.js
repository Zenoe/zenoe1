// const { logger } = require('init')

const sectionTitleRegex = /^(\d+\.)+/
const metaData = {
  sectionTitleRegex,
  skipRegex: /^(\d+\.)+ +(?:Terminology|Conventions|Limitations)/,
  tailText: /(?:Contributors|Acknowledgements|Acknowledgments)/
}

// const getSentense = (_lstLine, _curLineNo, _keyword) => {
//   if (_curLine < 0 || _curLine >= _lstLine.length || !_keyword) return ''
//   const curline = _lstLine[_curLineNo]
//   const kwIdx = curline.find(_keyword)
//   // search period before _keyword
//   const regexpB = new RegExp(`\w+. [^.]*${_keyword}`)
//   periodB4 = curline.search(regexpB)
//   if (periodB4 < 0) {
//     // search period backward
//     const regxp = /\w+. [^.]*$/
//     const searchLineNo = _curLineNo - 1
//     while (searchLineNo > 0 && _lstLine[searchLineNo].length > 0) {
//
//     }
//   }
// }
const isTextLine = (_lineText) => {
  if (_lineText.match(/^[^a-zA-Z]*$/)) return false
  if (_lineText.match(/^ {4,}/)) return false
  // more than 1 place where there are more than 1 continous spaces in betwen non-space
  // matchAll returns an iterator, need to be spread to get the length
  // (?=\S) : look ahread
  if ([..._lineText.matchAll(/\S {2,}(?=\S)/g)].length > 1) return false
  // more than 1 spaces among words, but not after a period
  if (_lineText.match(/[^.\s] {2,}\S/)) return false

  if (_lineText.match(/\w+ \w+/)) return true
  if (_lineText.match(/\S+[,.:;]/)) return true

  // warning
  console.error('>>>>>>>>>>>>>>>>>>>>>>unknown pattern line:', _lineText)
  return true
}

const isEmptyLine = (_lineText) => {
  return _lineText.match(/^\s*$/)
}
const skipFooterHeader = (_lstLine, _curLineNo) => {
  let lineNo = _curLineNo
  const lineText = _lstLine[_curLineNo]
  if (lineText.search(/[Page \d+]/) > 0) {
    lineNo++
    if (_lstLine[lineNo].search(/^\s*$/) === 0) {
      lineNo++
    }

    if (_lstLine[lineNo].search(/^RFC \d+/) === 0) {
      lineNo++
    }
  } else {
    return -1
  }

  return lineNo
}
async function extractSection (_text) {
  const lineObjList = []
  const textLineList = _text.split('\n')
  let textBodyBegin = false
  let paragraphBegin = false
  let skipContent = false
  let paragraph = ''
  return new Promise((resolve, reject) => {
    try {
      for (let lineNo = 0; lineNo < textLineList.length; lineNo += 1) {
        const lineText = textLineList[lineNo]
        if (isEmptyLine(lineText)) {
          if (paragraphBegin) {
            if (lineObjList.length > 0) {
              const lstParagraph = lineObjList[lineObjList.length - 1].content
              if (lstParagraph.length > 0) {
                const lastParagraph = lstParagraph[lstParagraph.length - 1]
                if (lastParagraph) {
                  // check last character of last paragraph
                  if (lastParagraph[lastParagraph.length - 1] !== '.') {
                    // not peroid indicates the next tobe-added paragraph is part of last one
                    lstParagraph[lstParagraph.length - 1] += ` ${paragraph}`
                    paragraphBegin = false
                    continue
                  }
                }
              }
              lineObjList[lineObjList.length - 1].content.push(paragraph)
              paragraph = ''
            }
            paragraphBegin = false
          }
          continue
        }
        const match = lineText.match(metaData.sectionTitleRegex)
        if (match != null) {
          // console.log(lineText)
          // if (lineText.search(/\.\.\.s*\d+s*$/) > 0) {
          //   // belongs to Table of Contents, skip
          //   continue
          // }
          if (lineText.match(metaData.skipRegex)) {
            skipContent = true
            continue
          } else { skipContent = false }

          if (lineText.match(metaData.tailText)) {
            lineObjList[lineObjList.length - 2].sectionEndLineNo = lineNo - 1
            break
          }
          if (textLineList[lineNo + 1].match(/^\s*$/)) {
            if (lineText.includes('Introduction')) {
              console.log('textBodyBegin', lineText)
              textBodyBegin = true
            }
            const sectionNo = match[0].substring(0, match[0].length - 1)
            lineObjList.push({
              lineNo,
              lineText,
              sectionName: lineText.substring(match[0].length).trim(),
              sectionEndLineNo: -1,
              sectionNo,
              content: []
            })

            if (lineObjList.length > 1) {
              lineObjList[lineObjList.length - 2].sectionEndLineNo = lineNo - 1
            }
            // skip for empty line below section title
            lineNo++
            continue
          }
        } else { // not section title
          if (!textBodyBegin || skipContent) continue
          // skip page footer
          if (skipFooterHeader(textLineList, lineNo) > 0) {
            continue
          }
          if (isTextLine(lineText)) {
            paragraphBegin = true
            paragraph += ` ${lineText.trim()}`
          }
          // } else {
          //   paragraphBegin = false
          // }
        }
      }

      resolve(lineObjList)
      // ----------------TestCases---------------------
    } catch (err) {
      reject(err)
    }
  })
}

async function extractByKeyword (_lstKeyword, _lstSectionObj) {
  return new Promise((resolve, reject) => {
    const result = []
    for (const sec of _lstSectionObj) {
      for (const paragraph of sec.content) {
        for (const kw of _lstKeyword) {
          if (paragraph.includes(kw)) {
            result.push({
              section: sec.lineText,
              paragraph
            })
          }
        }
      }
    }
    resolve(result)
  })
}

module.exports = {
  extractSection,
  extractByKeyword
}