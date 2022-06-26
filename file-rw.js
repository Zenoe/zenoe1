const { readFileSync, writeFileSync, readFile, writeFile } = require('fs')

const filename = './tmp/writetest.txt'
const filename2 = './tmp/writetest2.txt'

///////////////////////////////
// sync read & write
// writeFileSync(filename, "I'm the content\n", {flag: 'a'})
// const content = readFileSync(filename, 'utf8')

///////////////////////////////
// async read & write
const getText = (in_filePath) => {
  return new Promise((resolve, reject)=>{
    readFile(in_filePath, 'utf8', (err,data)=> {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

// getText(filename)
//   .then(data => {
//   console.log('getText:', data);
// }).catch(err => {
//   console.log('catch:', err);
// })

// async

const start = async () => {
  try{
    const content = await getText(filename)
    console.log(content);
  }catch(err){
    console.log(err);
  }
}

// start()

///////////////////////////////
// util.promisify
const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

const start2 = async () => {
  try{
    const content = await readFilePromise(filename, 'utf8')
    console.log(content);
    await writeFilePromise(filename2, 'write by writeFilePromise')
  }catch(err){
    console.log(err);
  }
}

start2()

///////////////////////////////
// fs promises
// const {readFile, writeFile} = require('fs').promises
// const start3 = async () => {
//   try{
//     const content = await readFile(filename, 'utf8')
//     console.log(content);
//     await writeFile(filename2, 'write by writeFilePromise')
//   }catch(err){
//     console.log(err);
//   }
// }

// start3()
