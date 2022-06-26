
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

const toISOStringWithTimezone = date => {
  // 2022-05-11T13:21:13+08:00
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

module.exports = {
  findSync,
  removeFromArray,
}
