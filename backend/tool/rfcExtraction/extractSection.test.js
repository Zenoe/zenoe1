const { readFile, writeFile } = require('fs')
const { extractSection } = require('./extractSection')

const util = require('util')

const readFilePromise = util.promisify(readFile)

// const filename = './rfc8402.txt'
const filename = './rfc.txt'
const test = async () => {
  try {
    const content = await readFilePromise(filename, 'utf8')
    // console.log(content)
    extractSection(content).then(res => {
      console.log(res)
    })
  } catch (err) {
    console.log(err)
  }
}

test()
