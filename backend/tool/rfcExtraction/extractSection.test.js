const { readFile, writeFile } = require('fs')
const { extractByKeyword, extractSection } = require('./extractSection')
const { lstKeyword } = require('./extractRules')
const { translate } = require('./translate/bing')

const util = require('util')

const readFilePromise = util.promisify(readFile)

// const filename = './rfc8402.txt'
const filename = './rfcfiles/rfc5316.txt'
// const filename = './rfcfiles/rfctt.txt'
const test = async () => {
  try {
    const content = await readFilePromise(filename, 'utf8')
    // console.log(content)
    const lstSectionObj = await extractSection(content)
    console.log(lstSectionObj)
    const lstFeature = await extractByKeyword(lstKeyword, lstSectionObj)
    // console.log(lstFeature)
    console.log(lstFeature[0].paragraph)
    // const transResult = await translate(lstFeature[0].paragraph)
    // console.log(transResult)
  } catch (err) {
    console.log(err)
  }
}

test()
