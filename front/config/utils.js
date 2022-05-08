/* 读取mock下的所有js文件 */
const fs = require('fs');
const path = require('path')

const findSync = function(startPath, excludes=[]) {
  let result = [];
  let files = fs.readdirSync(startPath);

  files.forEach(val => {
    let file = path.join(startPath, val);
    let stats = fs.statSync(file);

    if(stats.isDirectory() && !excludes.includes(val)) {
      result.push(...findSync(file));
    } else if(stats.isFile()) {
      result.push(file);
    }
  });

  return result;
}

const removeFromArray = (arr, ele)=>{
  const idx = arr.indexOf(ele);
  if(idx > -1){
    arr.splice(idx, 1)
  }
}
module.exports = {
  findSync,
  removeFromArray,
}
