/**
 * common functions that is not popular
 * only used in this project
 * */

const json2list = (jsonObj) => {
  const _retList = []
  for (let key in jsonObj) {
    let value = jsonObj[key];
    if (jsonObj.hasOwnProperty(key)) {
      _retList.push(`"${key}":"${value}"`)
      // console.log(`Property ${key} is NOT from prototype chain`);
    }
  }
  return _retList
}

module.exports ={
  json2list
}
