const fs = require('fs');
const path = require('path')

/* 读取dir下的所有文件 */
const findFileRecursivelySync = function(dir, excludes=[]) {
  let result = [];
  let files = fs.readdirSync(dir);

  files.forEach(val => {
    let file = path.join(dir, val);
    let stats = fs.statSync(file);

    if(stats.isDirectory() && !excludes.includes(val)) {
      result.push(...findFileRecursivelySync(file));
    } else if(stats.isFile()) {
      result.push(file);
    }
  });

  return result;
}

module.exports = {
    findFileRecursivelySync,
}
