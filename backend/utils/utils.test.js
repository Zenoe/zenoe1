const { downloadFile } = require('./utils')

// downloadFile('https://www.rfc-editor.org/rfc/rfc5316.txt', './rfc5316.txt')
//   .then(res => {
//     console.log('downloaded ', res)
//   })
//   .catch(rej => {
//     console.log('download failed', rej)
//   })

const test = async () => {
  try {
    await downloadFile('https://www.rf-editor.org/rfc/rfc5316.txt', './rfc5316.txt')
    console.log('downloaded')
  } catch (err) {
    console.log('download failed:', err.cause)
  }
}

test()
