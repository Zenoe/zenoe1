function getDut (rawStr) {
  let dut = ''
  const i = rawStr.indexOf('(')
  const j = rawStr.indexOf('#')
  if (i > 0 && i < j) {
    dut = rawStr.substring(0, i)
  }
  return dut
}

function extractCli (rawString) {
  const prefixReg1 = /^ *[\'|\"]?/
  let newStr = rawString.replace(prefixReg1, '')

  // const prompt = '#'

  // remove prompt: PE1(config)#
  const prefixReg2 = /^.*# */
  newStr = newStr.replace(prefixReg2, '')

  const suffixReg = /[\'|\"],$/
  newStr = newStr.replace(suffixReg, '')

  // extractArgs(newStr)
  // console.log(newStr)
  return newStr
}

// function extractArgs (rawString) {
//   const reg = /\${[a-zA-Z0-9_]+}/g
//   const results = rawString.match(reg)
//   if (results === null) return
//   for (const i of results) {
//     rfArgs.add(i)
//   }
// }

function generateArgs (rfArgArray) {
  const seperator = '    '
  let retStr = `${seperator}[Arguments]`
  for (const i of rfArgArray) {
    retStr += `${seperator}${i}`
  }

  retStr += `${seperator}\${dut}=dut1`
  retStr += `${seperator}\${no}=0`
  return retStr
}

function generateRF (cliArray) {
  // 4 spaces
  const seperator = '    '
  const rfSettings = `*** Settings ***
Resource          ../../lib/lib_source.txt
Resource          common.txt
Resource          executeCli.txt\n\n
*** Test Cases ***\n\n`
  let rfDocument = `${seperator}[Documentation]${seperator}`
  // executeCli    ${dut}    config    vrf definition ${vrfName}    rd ${rd}
  let rfStr = `${seperator}executeCli${seperator}\${dut}`
  for (const cli of cliArray) {
    rfDocument += `${seperator}...${seperator}${cli}\n`
    rfStr += `${seperator}${cli}`
  }

  // return rfDocument + rfStr
  return rfSettings + rfStr
}

const cli2rf = (rawStr) => {
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
