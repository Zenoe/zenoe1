// const cfg = require('config')
const {logger} = require('init')

const {readFile, writeFile} = require('fs').promises


async function getAll(res) {

    return await readFile(__dirname  + '/../../local-data/my-directory-list.txt', 'utf8')
    // return await db.User.findAll();
    // return {"a": 1}
    // const fileStream = fs.createReadStream('../data/my-directory-list.txt', 'utf8')
    // fileStream.on('open', () => {
    //   fileStream.pipe(res)
    // })
    // fileStream.on('error', (err) => {
    //   res.end(err)
    // })
}

async function getByFileName(in_fileName) {
    try{
        const result = await readFile(__dirname  + `/../../local-data/wcresult/${in_fileName}.txt`, 'utf8')
        return result
    }catch(err){
        logger.error(`${err} in ${arguments.callee.name}, param: ${in_fileName}`)
    }
}

async function getTimeStampData() {
    try{
        const result = await readFile(__dirname  + `/../../local-data/timestamp.txt`, 'utf8')
        return result
    }catch(err){
        logger.error(`${err} in ${arguments.callee.name}, param: ${in_fileName}`)
    }
}

module.exports = {
    getAll,
    getByFileName,
    getTimeStampData,
};
