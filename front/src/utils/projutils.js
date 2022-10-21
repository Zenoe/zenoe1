/**
 * common functions that is not popular
 * only used in this project
 * */

const json2ObjList = (jsonObj) => {
  // console.log(jsonObj)
  const _retList4Tbl = []
  const _retList4Combox = []

  for (const key in jsonObj) {
    let value = jsonObj[key]
    const isString = typeof (value) === 'string'
    if (jsonObj.hasOwnProperty(key)) {
      if (Array.isArray(value)) {
        // format to "['1.1.1.1','2.2.2.2','3.3.3.3']"
        value = `[${value.map(i => ('"' + i.toString() + '"')).join(',')}]`
      }
      // console.log(`Property ${key} is NOT from prototype chain`);
      // const trimKey = key.trim()
      const _tmp = isString ? `"${value}"` : value
      _retList4Combox.push({ title: `"${key}":${_tmp}` })
      _retList4Tbl.push({ key: `"${key}"`, value: `${_tmp}` })
    }
  }
  return [_retList4Combox, _retList4Tbl]
}

const list2ObjList = (jsonList) => {
  return jsonList.map(i => ({ title: i }))
}

module.exports = {
  json2ObjList,
  list2ObjList
}
