const { appendFile, readFile, writeFile } = require('fs')
const path = require('path')
const { extractByKeyword, extractSection } = require('./extractSection')
const { lstKeyword } = require('./extractRules')
const { translate } = require('./translate/bing')

const { zoSleep } = require('../../utils/utils')
const util = require('util')
const { log } = require('console')

const readFilePromise = util.promisify(readFile)

const rfcId = '2205'
// const rfcId = '5316'
// const filename = './rfc8402.txt'
const filename = `./rfcfiles/rfc${rfcId}.txt`

let rfcName = path.basename(filename)
rfcName = rfcName.substring(0, rfcName.lastIndexOf('.'))

console.log('rfcName:', rfcName)
// console.log(rfcName)
// const filename = './rfcfiles/rfctt.txt'
const test = async () => {
  try {
    const content = await readFilePromise(filename, 'utf8')
    // console.log(content)
    const lstSectionObj = await extractSection(content)
    // console.log(lstSectionObj)
    const lstFeature = await extractByKeyword(lstKeyword, lstSectionObj)
    console.log(lstFeature.length)
    return
    // console.log(lstFeature[0])
    // console.log(lstFeature[1])
    // console.log(lstFeature[2])
    // return
    // console.log(lstFeature[0].paragraph)
    // console.log(lstFeature[0].keyword)
    // const transResult = await translate(lstFeature[0].paragraph)
    // console.log(transResult)
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

test()
