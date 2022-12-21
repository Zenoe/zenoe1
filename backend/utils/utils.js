
const axios = require('axios')
const stream = require('stream')
const { promisify } = require('util')

function zoSleep (ms) {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  return new Promise(resolve => setTimeout(resolve, ms))
}

const finished = promisify(stream.finished)

async function downloadFile (fileUrl, outputLocationPath) {
  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream'
  }).then(response => {
    const writer = require('fs').createWriteStream(outputLocationPath)
    response.data.pipe(writer)
    return finished(writer) // this is a Promise
  })
}

const retryExe = async (fn, args, thisprt = null, interval = 1000, retry = 3) => {
  let i = 0
  let ret
  while (i < retry) {
    i++
    try {
      ret = await fn.apply(thisprt, args)
      if (ret) {
        return ret
      } else {
        await zoSleep(interval)
      }
    } catch (e) {
      await zoSleep(interval)
    }
    console.log('retryExe', i)
  }

  return ret
}

module.exports = {
  retryExe,
  zoSleep,
  downloadFile
}
