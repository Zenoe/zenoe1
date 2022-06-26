// const cfg = require('config')

const {readFile, writeFile} = require('fs').promises

module.exports = {
    getAll,
    getByFileName,
};

async function getAll(res) {
    return await readFile(__dirname  + '/../local-data/my-directory-list.txt', 'utf8')
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
    console.log('getByFileName');
    return await readFile(__dirname  + `/../local-data/wcresult/${in_fileName}.pdf.txt_result.txt`, 'utf8')
    // return {"b": in_fileName}
}
