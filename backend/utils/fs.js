const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const { logger } = require('init')

/* 读取dir下的所有文件 */
const findFileRecursivelySync = function (dir, recursive = true, excludes = []) {
  const result = []
  try {
    const files = fs.readdirSync(dir)
    files.forEach(val => {
      const file = path.join(dir, val)
      const stats = fs.statSync(file)

      if (recursive && stats.isDirectory() && !excludes.includes(val)) {
        result.push(...findFileRecursivelySync(file))
      } else if (stats.isFile()) {
        result.push(file)
      }
    })
    return result
  } catch (e) {
    if (e.message.includes('no such file or directory')) {
      logger.info(`no such file or directory in ${dir}`)
      return []
    } else {
      throw e
    }
  }
}

function zipDirectory (sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(outPath)

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => resolve())
    archive.finalize()
  })
}

module.exports = {
  findFileRecursivelySync,
  zipDirectory
}
