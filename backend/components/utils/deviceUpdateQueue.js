const { Worker } = require('bullmq')
const { logger } = require('init')
const { Queue } = require('bullmq')

let queue = null
const QUEUE_NAME = 'device-update'

function initQueue () {
  queue = new Queue(QUEUE_NAME)
}

function convertTime (ms) {
  const hh = Math.floor(ms / 3600000)
  const mm = Math.floor(ms % 3600000 / 60000)
  const ss = Math.floor(ms % 60000 / 1000)
  return `Time: ${hh}:${mm}:${ss}`
}

const processResult = (_result) => {
  if (_result) { return _result.substring(_result.indexOf('Upgrade')) }
}

const promiseResult = (_data) => {
  return new Promise((resolve, reject) => {
    console.log('running in promise: ', _data)
    setTimeout(resolve, 10000)
  })
}

const callExpectPromisiy = (deviceIp) => {
  const path = require('path')
  const rootDir = path.dirname(require.main.filename)
  const scriptPath = `${rootDir}/tool/script/updateDevice/telnet.sh`

  const startTime = Date.now()
  logger.debug(`callExpectPromisiy: ${deviceIp}, ${scriptPath}`)

  const exec = require('child_process').exec

  let result = ''

  function promiseFromChildProcess (child) {
    return new Promise(function (resolve, reject) {
      child.addListener('error', reject)
      // child.addListener('exit', resolve)
      child.addListener('exit', (code, signal) => {
        if (code === 0) {
          resolve(result)
        } else {
          reject(new Error(`exit with code: ${code}`))
        }
      })
    })
  }

  const child = exec(`expect ${scriptPath} ${deviceIp}`)
  child.stdout.on('data', data => {
    result += data.toString()
  })

  child.stderr.on('data', function (data) {
    console.log('stderr: ' + data)
  })
  child.on('close', function (code) {
    console.log('closing code: ' + code)
  })

  return promiseFromChildProcess(child)
}

const callExpect = (deviceIp) => {
  const path = require('path')
  const rootDir = path.dirname(require.main.filename)
  const scriptPath = `${rootDir}/tool/script/updateDevice/telnet.sh`

  const startTime = Date.now()
  logger.debug(`${deviceIp}, ${scriptPath}`)
  const child = require('child_process').exec(`expect ${scriptPath} ${deviceIp}`)
  let result = ''

  // child.stdout.pipe(process.stdout)
  child.stdout.on('data', data => {
    result += data.toString()
  })
  child.on('exit', function () {
    logger.debug(`child process exited: ${deviceIp}`)
    // logger.debug(result)
    const endTime = Date.now()
    const timeConsumed = endTime - startTime
    logger.debug(`Time consumed: ${convertTime(timeConsumed)}`)
    // save processed result in database
    console.log(processResult(result))
  })
}

function add2queue (_data) {
  if (queue === null) initQueue()
  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  // miliseconds from now to midnight
  const msUntilMidnight = midnight - now + 60 * 1000
  // const msUntilMidnight = 1800 * 1000
  queue.add('update', { ip: _data }, { delay: msUntilMidnight, removeOnComplete: true, removeOnFail: true })

  // can not delete the job by setting removeOnComplete
  // queue.add('update', { ip: _data },
  //   { repeat: { pattern: '* * * * * *' }, removeOnComplete: true, removeOnFail: true }
  // )
  processJob()

  // queue.add('update', { ip: _data }, { delay: 5000 })
}

async function processJob () {
  console.log('processJob')
  const worker = new Worker(QUEUE_NAME, async job => {
    if (job.name === 'update') {
      for (const _ip of job.data.ip) {
        console.log('test process......', _ip)
        const res = await callExpectPromisiy(_ip)
        console.log('processing job', _ip, res)
      }
    }
  }
  // { autorun: false }
  )
  worker.on('completed', job => {
    console.info(`${job.id} has completed!`)
  })

  worker.on('failed', (job, err) => {
    console.error(`${job.id} has failed with ${err.message}`)
  })
  // worker.run()
}

module.exports = {
  add2queue
}
