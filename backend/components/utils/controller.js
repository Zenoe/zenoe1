// todo multer
const asyncHandler = require( "express-async-handler" );
const path = require('path')
const {findFileRecursivelySync} = require('utils/fs');

const {AsyncError} = require('error/appErrors');
const {logger} = require('init')
const { PROJECT_DIR } = require('config')

const uploadFile = asyncHandler( async (req, res)=>{
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new Error("No files were uploaded.");
  }

  let uploadedFile = req.files.file

  uploadPath = PROJECT_DIR + 'upload/' + req.ip + '/' + uploadedFile.name;

  logger.info(`save file ${uploadedFile.name} to ${uploadPath}`)

  try{
    await uploadedFile.mv(uploadPath)
    res.json({
      message:'File uploaded!',
    })
  }catch (e){
    throw new AsyncError(res, err.message)
  }

  // // Use the mv() method to place the file somewhere on your server
  // uploadedFile.mv(uploadPath, function(err) {
  //   if (err){
  //     // error from callback can not be catch by middleware error handler
  //     throw new AsyncError(res, err.message)
  //     // throw new Error(`fileError: ${err.message}`)
  //   }
  //   res.json({
  //     message:'File uploaded!',
  //   });
  // });

})

const getUploadFileList = (clientIp)=>{
  const uploadPath = PROJECT_DIR + 'upload/' + clientIp
  return findFileRecursivelySync(uploadPath).map(i=>path.basename(i))
}
const getFileList = asyncHandler( async (req, res) =>{
  // console.log('clientIp', req.ip);
  const fileList = getUploadFileList(req.ip)
  res.json({
    fileList
  })
} )


module.exports = {
  getFileList,
  uploadFile,
}
