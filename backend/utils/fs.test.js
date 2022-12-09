const { checkFileExists } = require('./fs')

const test = async () => {
  const fn = '/root/lzy/zenoe1/backend/compoment/rfc/rfcTxtLocal/rfc5316.txt'
  const fileExist = await checkFileExists(fn)
  console.log(fileExist)
}

test()
