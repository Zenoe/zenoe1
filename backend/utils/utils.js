
const axios = require('axios')
const stream = require('stream')
const { promisify } = require('util')

function zoSleep (ms) {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  return new Promise(resolve => setTimeout(resolve, ms))
}

const finished = promisify(stream.finished)

async function downloadFile (fileUrl, outputLocationPath) {
  const writer = require('fs').createWriteStream(outputLocationPath)
  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream'
  }).then(response => {
    response.data.pipe(writer)
    return finished(writer) // this is a Promise
  })
}
module.exports = {
  zoSleep,
  downloadFile
}
