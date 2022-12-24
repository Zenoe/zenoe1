// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`)
// })


const fs = require('fs');
if(process.argv.length < 4){
    console.log('need 2 parameters')
    return
}

const rfKeyName = process.argv.slice(2)[0]
const args = process.argv.slice(2)[1]

const argArray = args.split('\n')
let dutHost = getDut(argArray[0])

if(dutHost.length === 0){
    // default dut to be dut1
    dutHost = 'dut1'
}else{
    console.log('get dut as: ', dutHost)
}

const rfArgs = new Set()
const cliArray = []
argArray.forEach(cli => {
    cliArray.push(extractCli(cli))
})


const rfcliStr = generateRF(cliArray)
const rfargStr = generateArgs(rfArgs)

const rfScript = `${rfKeyName}\n${rfargStr}\n${rfcliStr}`
fs.writeFile("rf.txt", rfScript, (err) => {
  if (err)
    console.log(err);
  });

// console.log(rfargs);
// console.log(rfclis);

// functions
function getDut(rawStr){
    let dut = ''
    const i = rawStr.indexOf('(')
    const j = rawStr.indexOf('#')
    if(i > 0 && i < j){
        dut = rawStr.substring(0, i)
    }
    return dut
}

function extractCli(rawString){
    const prefixReg1 = /^ *[\'|\"]?/
    let newStr = rawString.replace(prefixReg1, "");

    // const prompt = '#'

    // remove prompt: PE1(config)#
    const prefixReg2 = /^.*# /
    newStr = newStr.replace(prefixReg2, "");

    const suffixReg = /[\'|\"],$/
    newStr = newStr.replace(suffixReg, "");

    extractArgs(newStr)
    console.log(newStr)
    return newStr
}

function extractArgs(rawString) {
    const reg = /\${[a-zA-Z0-9_]+}/g
    const results = rawString.match(reg)
    if(results === null) return
    for(let i of results){
        rfArgs.add(i)
    }
}

function generateArgs(rfArgArray){
    const seperator = '	'
    let retStr = `${seperator}[Arguments]`
    for(let i of rfArgArray){
        retStr += `${seperator}${i}`
    }

    retStr += `${seperator}\${dut}=dut1`
    retStr += `${seperator}\${no}=0`
    return retStr
}

function generateRF(cliArray){
    // 4 spaces
    const seperator = '	'
    let rfDocument = `${seperator}[Documentation]${seperator}`
    // executeCli    ${dut}    config    vrf definition ${vrfName}    rd ${rd}
    let rfStr = `${seperator}executeCli${seperator}\${dut}`
    for(let cli of cliArray){
        rfDocument += `${seperator}...${seperator}${cli}\n`
        rfStr += `${seperator}${cli}`

    }

    return rfDocument + rfStr
}

const cli2rf =(rawStr)=>{
  const argArray = rawStr.split('\n')
  const cliArray = []
  argArray.forEach(cli => {
    cliArray.push(extractCli(cli))
  })

  return generateRF(cliArray)
}

module.exports = { cli2rf }
// module.exports={
//   cli2rf
// }
