// todo multer
const asyncHandler = require('express-async-handler')
const { findFileRecursivelySync } = require('utils/fs')
const { AsyncError } = require('error/appErrors')
const { logger } = require('init')
const { generateRf } = require('tool/testCaseParse/xlsReader')
const { checkRFSyntaxTool } = require('tool/checkRFSyntax')
const { callPy } = require('tool/dutShow')

const { ThridPartyError } = require('error/appErrors')
const { PROJECT_DIR } = require('config')

const uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new Error('No files were uploaded.')
  }

  const uploadedFile = req.files.file

  const uploadPath = PROJECT_DIR + 'upload/' + req.ip + '/' + uploadedFile.name

  logger.info(`save file ${uploadedFile.name} to ${uploadPath}`)

  try {
    await uploadedFile.mv(uploadPath)
    res.json({
      message: 'File uploaded!'
    })
  } catch (e) {
    throw new AsyncError(res, e.message)
  }
})

const getUploadFileList = async (clientIp, query) => {
  // const { tmpfield } = query

  const uploadPath = PROJECT_DIR + 'upload/' + clientIp
  // if(tmpfield)
  //   uploadPath = PROJECT_DIR + 'upload/' + tmpfield
  // return findFileRecursivelySync(uploadPath).map(i=>path.basename(i))
  let _list = await findFileRecursivelySync(uploadPath).map(i => i.substring(i.indexOf('/upload')))
  const condition = i => (i.endsWith('.xls') || i.endsWith('.xlsx') || i.endsWith('.zip'))
  _list = _list.filter(i => condition(i))
  if (query && query.ext) {
    return _list.filter(i => i.endsWith(query.ext))
  }
  return _list
}

const getFileList = asyncHandler(async (req, res) => {
  // req.ip uses req.connection.remoteAddress unless the trust proxy setting is set to true. If set to true, it will use the left-most IP address in req.headers['x-forwarded-for'] instead.
  const fileList = await getUploadFileList(req.ip, req.query)
  res.json({
    fileList
  })
})

const convert2Rf = asyncHandler(async (req, res, next) => {
  const uploadPath = PROJECT_DIR + 'upload/' + req.ip
  // const { tmpfield } = req.query
  // if(tmpfield){
  //   uploadPath = PROJECT_DIR + 'upload/' + tmpfield
  // }

  console.log(req.query)
  const { pkgName } = req.query
  try {
    await generateRf(uploadPath, pkgName)
    res.json({
      status: 1
    })
  } catch (e) {
    // res.status(500).json({
    //   status: 0,
    //   message: e.message
    // })

    // we process errors in the central error hander
    throw e
  }
  // res.sendFile(your_file, {headers: {'Content-Type': 'your_file_type'}})
})

const checkRFSyntax = asyncHandler(async (req, res, next) => {
  const { rfTxt } = req.body
  try {
    await checkRFSyntaxTool(rfTxt)
  } catch (err) {
    throw err
  }
})

const convertParam = asyncHandler(async (req, res, next) => {
  const { cli, showInfo } = req.query
  logger.debug(`${cli}, ${showInfo}`)

  try {
    const _result = await callPy(cli, showInfo)
    // console.log(_result[1]);
    // logger is async, it won't get _result here
    // logger.info('receive from py:', _result[1])
    logger.info(`receive from py:${_result[1]}`)
    _result[0].kill('SIGTERM')
    res.json({
      result: _result[1],
      status: 1
    })
  } catch (e) {
    // console.log('throw e');
    throw new ThridPartyError('python script returns error')
  }
})

module.exports = {
  getFileList,
  uploadFile,
  convert2Rf,
  checkRFSyntax,
  convertParam
}
