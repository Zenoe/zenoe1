const { readFile, writeFile } = require('fs')
const { extractByKeyword, extractSection } = require('./extractSection')
const { lstKeyword } = require('./extractRules')

const util = require('util')

const readFilePromise = util.promisify(readFile)

// const filename = './rfc8402.txt'
const filename = './rfcfiles/rfc5316.txt'
const test = async () => {
  try {
    const content = await readFilePromise(filename, 'utf8')
    // console.log(content)
    const lstSectionObj = await extractSection(content)
    // console.log(lstSectionObj)
    const lstFeature = await extractByKeyword(lstKeyword, lstSectionObj)
    console.log(lstFeature)
  } catch (err) {
    console.log(err)
  }
}

test()
