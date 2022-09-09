const logger = require('services/logger')
const reader = require('xlsx')

// Reading our test file
const file = reader.readFile('./12.8PL30.xls')
String.prototype.appendLine = function(line){
  return this + '\n' + line
}
String.prototype.appendDocumention = function(line){
  return this + '\n' + '    ...    ' + line
}
const TOPINDEX = 1
const CASEDATAINDEX = 0
let caseData = []
let cfgData = []
const sheets = file.SheetNames

function getSheetData(idx){
  const tData = []
  const temp = reader.utils.sheet_to_json(
    file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    tData.push(res)
  })

  return tData
}

function getTopData(idx){
  const topDataMap = new Map()
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    topDataMap.set(res['拓扑编号'], res['对应工厂标准拓扑文件名'])
  })

  return topDataMap
  // console.log(topDataMap);
}

function getHeader(){
  return 'Resource          ../../../lib/lib_source.txt'
}

function generateStep(p_caseSteps, p_out_result){
  // console.log(p_caseSteps);
  const steps = p_caseSteps.split('\n')
  p_out_result = steps
  let retTxt = ''
  for(let line of steps){
    retTxt = retTxt.appendDocumention(line)
  }

  console.log('reretTxt', retTxt);
  return retTxt

}

function generateStepNExpect(p_stepList, p_expectList){
  if(p_stepList.length !== p_expectList.length){
    logger.error('step and expect are not match', p_stepList.length, p_expectList.length)
  }
  for(let i=0; i<p_expectList.length; i+=1){

  }
}

function getUserName(p_caseNo){
  return ''
}

function generateTxt(caseData, topMap){
  const seperator = '    '
  const dotSeperator = '...'
  const caseSection = '*** Test Cases ***'
  const caseNo = caseData['用例编号']
  const header = getHeader()
  let stepList
  let expectList
  let output = '*** Settings ***\n'
  output += `${header}\n\n`
  const caseTxt = output.appendLine('*** Test Cases ***')
                        .appendLine(caseNo)
                        .appendLine(`${seperator}[Documentation]    用例编号：${caseNo}`)
                        .appendDocumention(``)
                        .appendDocumention(`用例名称：${caseData['用例名称']}`)
                        .appendDocumention(`用例描述：${caseData['用例描述']}`)
                        .appendDocumention(``)
                        .appendDocumention(`对应工厂标准拓扑文件名：${topMap.get(caseData['测试拓扑'])}`)
                        .appendDocumention(``)
                        .appendDocumention(`编写人员：${getUserName(caseNo)}`)
                        .appendDocumention(`编写日期：`)
                        .appendDocumention(``)
                        .appendDocumention(`测试描述：${generateStep(caseData['测试步骤'], stepList)}`)
                        .appendDocumention(``)
                        .appendDocumention(``)
                        .appendDocumention(`预期结果：${generateStep(caseData['期望结果'], expectList)}`)
                        .appendDocumention(``)
                        .appendDocumention(``)
                        .appendDocumention(`脚本正文：`)
                        .appendLine(`    [Tags]    ${caseNo}`)
                        .appendLine(`    [Setup]    Run Keywords    fw_case_setup`)
                        .appendLine(generateStepNExpect(stepList, expectList))


  console.log(caseTxt);
  // generateStep(caseData['测试步骤'])

}
const topMap = getTopData(TOPINDEX)
const caseList = getSheetData(CASEDATAINDEX)
const testCasePkgName = caseList[0]['用例包名称']
console.log('用例包名称', testCasePkgName);
generateTxt(caseList[0], topMap)
//
// let a = 'xxx'
// a = a.appendLine('bbb').appendLine('ccc')
// console.log(a);
