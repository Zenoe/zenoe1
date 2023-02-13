const { Worker } = require('bullmq')
const path = require('path')
const { logger } = require('init')
const { Queue } = require('bullmq')

const QUEUE_NAME = 'device-update'
const queue = new Queue(QUEUE_NAME)

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

// function add2queue (_data) {
//   console.log('add2queue')
//   // Add a task to the queue
//   if (Array.isArray(_data)) {
//     for (const data of _data) {
//       queue.add('update', {
//         ip: data
//       })
//     }
//   } else {
//     queue.add('update', {
//       ip: _data
//     })
//   }
// }

function add2queue (_data) {
  console.log('add2queue')
  queue.add('update', { ip: _data },
    { repeat: { cron: '0 0 11 * *' }, removeOnComplete: true })
}

async function processJob (_data) {
  const worker = new Worker(QUEUE_NAME, async job => {
    if (job.name === 'update') {
      for (const _ip of job.data.ip) {
        const res = await callExpectPromisiy(_ip)
        console.log('processing job', _ip, res)
      }
      // const res = await callExpectPromisiy(job.data.ip)

      // await promiseResult(job.data.ip)
      // callExpect(job.data.ip)
      // console.log('processing job', job.data.ip, res)
    }
  })
  worker.on('completed', job => {
    console.info(`${job.id} has completed!`)
  })

  worker.on('failed', (job, err) => {
    console.error(`${job.id} has failed with ${err.message}`)
  })
}

const { QueueEvents } = require('bullmq')

const queueEvents = new QueueEvents(QUEUE_NAME)

queueEvents.on('completed', ({ jobId }) => {
  console.log('done update')
})

queueEvents.on(
  'failed',
  (failReason) => {
    console.error('error updating', failReason)
  }
)

module.exports = {
  add2queue,
  processJob
}
