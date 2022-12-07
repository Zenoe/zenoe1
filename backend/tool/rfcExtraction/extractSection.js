const { appendFile, readFile, writeFile } = require('fs')
const path = require('path')
const { lstKeyword } = require('./extractRules')
const { translate } = require('./translate/bing')
const { zoSleep } = require('../../utils/utils')
const util = require('util')

const readFilePromise = util.promisify(readFile)
// const { logger } = require('init')

// const sectionTitleRegex = /^ {0,6}(\d+\.)+/
// const sectionTitleRegex = /^(\d+\.)+/
const sectionTitleRegex = /^ {0,6}(\d+\.)+\d*/
const metaData = {
  sectionTitleRegex,
  skipRegex: /^(\d+\.)+ +(?:Terminology|Conventions|Limitations)/,
  tailText: /(?:Contributors|Acknowledgements|Acknowledgments|APPENDIX)/
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
const isTextLine = (_lineText, _lineno, _lstLine) => {
  /* passin line is not empty line */
  if (_lineText.match(/^[^a-zA-Z]*$/)) return false

  const specialSign = /(?:\+-|-\+|\| |\|\||__|_\||\|_|=>|<=|===|--|->|-\||\|-)/
  if (_lineText.match(specialSign)) return false
  // more than 1 place where there are more than 1 continous spaces in betwen non-space
  // matchAll returns an iterator, need to be spread to get the length
  // (?=\S) : look ahread
  if ([..._lineText.matchAll(/\S {2,}(?=\S)/g)].length > 1) return false

  if (_lineText.match(/^ {14,}/)) return false
  if (_lineText.match(/\w+ {5,}\w+/)) return false

  if (_lineText.match(/\w+ \w+/)) return true
  if (_lineText.match(/\S+[,.:;]/)) return true

  // warning
  console.error('>>>>>>>>>>>>>>>>>>>>>>unknown pattern line:', _lineno, _lineText)
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

const extractTextInParagraph = (_curLineNo, _lstLine) => {
  let curLine = _curLineNo
  while (curLine < _lstLine.length) {
    if (isEmptyLine(_lstLine[curLine])) {
      return curLine
    }
    ++curLine
  }
}

async function extractSection (_text) {
  // console.log(arguments.callee.toString())
  const lineObjList = []
  const textLineList = _text.split('\n')
  let textBodyBegin = false
  let paragraphBegin = false
  let skipContent = false
  let paragraph = ''
  return new Promise((resolve, reject) => {
    try {
      let footerSkip = false
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
                  if (footerSkip && lastParagraph[lastParagraph.length - 1] !== '.') {
                    // not peroid indicates the next tobe-added paragraph is part of last one
                    //                   Figure 1: RSVP in Hosts and Routers

                    // Quality of service is implemented for a particular data flow by
                    if (!isEmptyLine(textLineList[lineNo - 1]) && lstParagraph[lstParagraph.length - 1].indexOf('==') !== 0) {
                      lstParagraph[lstParagraph.length - 1] += ` ${paragraph}`
                      paragraphBegin = false
                      footerSkip = false
                      continue
                    }
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
        if (lineText.match(metaData.sectionTitleRegex)) {
          // console.log(lineText)
          if (textLineList[lineNo + 1].match(/^\s*$/)) {
            const trimedLineText = lineText.trim()
            if (trimedLineText.match(metaData.skipRegex)) {
              skipContent = true
              lineNo++
              continue
            } else { skipContent = false }

            if (trimedLineText.match(metaData.tailText)) {
              lineObjList[lineObjList.length - 2].sectionEndLineNo = lineNo - 1
              break
            }
            if (trimedLineText.includes('Introduction')) {
              // console.log('textBodyBegin', trimedLineText)
              textBodyBegin = true
            }
            lineObjList.push({
              lineNo,
              // sectionName: trimedLineText.substring(sectionMatch[0].length).trim(),
              sectionName: trimedLineText,
              sectionEndLineNo: -1,
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
            footerSkip = true
            continue
          }
          if (isTextLine(lineText, lineNo, textLineList)) {
            paragraphBegin = true
            paragraph += ` ${lineText.trimLeft()}`
          } else {
            if (textBodyBegin) {
              // extract non-text paragraph
              const curRow = lineNo
              // search below curRow for lines until empty line is met
              const endRow = extractTextInParagraph(lineNo, textLineList)
              paragraphBegin = false
              // == indicates non-text
              const nonTextParagraph = `\n\r${textLineList.slice(curRow, endRow).join('\n')}`
              lineObjList[lineObjList.length - 1].content.push(nonTextParagraph)
              lineNo = endRow
            }
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
              section: sec.sectionName,
              keyword: kw,
              paragraph
            })
            break
          }
        }
      }
    }
    resolve(result)
  })
}

const translationSection = async (_filename) => {
  const readFilePromise = util.promisify(readFile)
  let rfcName = path.basename(_filename)
  rfcName = rfcName.substring(0, rfcName.lastIndexOf('.'))
  try {
    const content = await readFilePromise(_filename, 'utf8')
    // console.log(content)
    const lstSectionObj = await extractSection(content)
    console.log(lstSectionObj)
    return lstSectionObj
    // console.log(lstSectionObj)
    const lstFeature = await extractByKeyword(lstKeyword, lstSectionObj)
    return lstFeature
    // return
    for (const feature of lstFeature) {
      const result = await translate(feature.paragraph)
      const [translationResult] = JSON.parse(result)
      const cnText = translationResult.translations[0].text
      const row = `${feature.section}, ${feature.keyword},"${feature.paragraph.replaceAll('"', '""')}", "${cnText.replaceAll('"', '""')}\n`
      // const row = `${feature.section}, ${feature.keyword},"${feature.paragraph.replaceAll('"', '""')}"}\n`
      appendFile(`${rfcName}.csv`, row, function (err) {
        if (err) {
          console.log('append:', feature.paragraph, 'failed')
          throw err
        }
        console.log('append:', feature.section)
      })
      await zoSleep(1500)
    }
    // console.log(transResult)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  translationSection,
  extractSection,
  extractByKeyword
}
