
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

function callPy3 (lstArguments, pyScript) {
  const spawn = require('child_process').spawn
  // const scriptPath = path.join(__dirname, 'script/callDutGetShow.py')
  console.log('callPy3:', lstArguments, pyScript)
  // const pythonProcess = spawn('python3', [pyScript, lstArguments])
  // const pythonProcess = spawn('python3', ['/root/lzy/zenoe1/backend/components/utils/test.py'])
  const pythonProcess = spawn('python3', ['/root/lzy/zenoe1/backend/components/utils/executeCmd.py', lstArguments])

  pythonProcess.on('error', (err) => {
    console.error(`error from python ${err}`)
  })

  return new Promise((resolve, reject) => {
    pythonProcess.stdout.on('data', data => {
      // by default converts to utf-8
      resolve([pythonProcess, data.toString()])
    })
    process.stderr.on('data', data => {
      reject(data)
    })

    pythonProcess.on('close', (code, signal) => {
      if (signal !== 'SIGTERM') { reject('child process exit for unknow reason') }
    })
  })
}
module.exports = {
  retryExe,
  zoSleep,
  callPy3,
  downloadFile
}
