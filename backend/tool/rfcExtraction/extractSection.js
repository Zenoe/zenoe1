// const { logger } = require('init')

const sectionTitleRegex = /^(\d+\.)+/
const metaData = {
  sectionTitleRegex,
  startText: new RegExp(`${sectionTitleRegex}s+Introduction`),
  skipRegex: new RegExp(`${sectionTitleRegex}s+(?:Terminology|Conventions|Limitations)`),
  tailText: /(?:Contributors|Acknowledgements)/
}

async function extractSection (_text) {
  const lineObjList = []
  const textLineList = _text.split('\n')
  let textBodyBegin = false

  return new Promise((resolve, reject) => {
    try {
      for (const [lineNo, lineText] of textLineList.entries()) {
        const match = lineText.match(metaData.sectionTitleRegex)
        if (match != null) {
          if (lineText.search(/\.\.\.s*\d+s*$/) > 0) {
            // belongs to Table of Contents, skip
            continue
          }
          if (lineText.match(metaData.tailText)) {
            lineObjList[lineObjList.length - 2].sectionEndLineNo = lineNo - 1
            break
          }
          if (lineText.includes('Introduction')) {
            textBodyBegin = true
          }
          if (textBodyBegin) {
            const sectionNo = match[0].substring(0, match[0].length - 1)
            lineObjList.push({
              lineNo,
              lineText,
              sectionName: lineText.substring(match[0].length).trim(),
              sectionEndLineNo: -1,
              sectionNo
            })

            if (lineObjList.length > 1) {
              lineObjList[lineObjList.length - 2].sectionEndLineNo = lineNo - 1
            }
            console.log(sectionNo)
          }
        }
      }

      resolve(lineObjList)
      // ----------------TestCases---------------------
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  extractSection
}
