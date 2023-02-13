
const { logger } = require('init')

/**
 * return all data if _filters is null, limit by _max
 * */
const getData = async (_filters, _model, _skip = 0, _max = 100) => {
  logger.debug(`get from mongodb, ${_model.modelName}`)

  let retData
  if (_filters) {
    retData = await _model.find(
      _filters
      // { _id: deviceId }
      // { name: 1, ipaddr: 1, user: 1, port: 1, os: 1, location: 1, desc: 1 }
      // { createdAt: 0, updatedAt: 0 }
    )
  } else {
    retData = await _model.find({}, { createdAt: 0, updatedAt: 0 }).skip(_skip).limit(100)
  }
  return retData
}

const addData = async (_dataObj, _model) => {
  logger.debug(`add data for ${_model.modelName}`)

  // create() method returns a Promise that resolves with the newly created document.
  // The document is returned as a plain JavaScript object and will contain the data
  // that was passed to the .create() method as well as any additional data that was added by Mongoose (such as the _id field).
  return await _model.create(_dataObj)
}

const updateDataOne = async (_query, _dataObj, _model) => {
  try {
    const res = await _model.updateOne(_query, { $set: _dataObj })
    logger.info(`${_model.modelName} ${res} collections updated`)
  } catch (err) {
    logger.error(`updating the ${_model.modelName} encountered an error`)
    throw err
  }
// User.updateOne({ name: 'John' }, { $set: { name: 'Jane' } })
//   .then(() => console.log('Document updated!'))
//   .catch(err => console.error(err));
}
module.exports = {
  getData,
  addData,
  updateDataOne
}
