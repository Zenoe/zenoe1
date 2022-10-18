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
    if (jsonObj.hasOwnProperty(key)) {
      if (Array.isArray(value)) {
        // format to "['1.1.1.1','2.2.2.2','3.3.3.3']"
        value = `[${value.map(i => ('"' + i.toString() + '"')).join(',')}]`
      }
      // console.log(`Property ${key} is NOT from prototype chain`);
      // const trimKey = key.trim()
      _retList4Combox.push({ title: `"${key}":"${value}"` })
      _retList4Tbl.push({ key: `"${key}"`, value: `"${value}"` })
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
