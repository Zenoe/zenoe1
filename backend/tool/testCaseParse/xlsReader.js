const moment = require('moment');
moment.locale('zh-cn');
// const logger = require('services/logger')
const reader = require('xlsx')

const TOPINDEX = 1
const CASEDATAINDEX = 0
const dateFormat = 'YYYY-MM-DD'

function getSheetData(file, idx){
  const tData = []
  const temp = reader.utils.sheet_to_json(
    file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    tData.push(res)
  })

  return tData
}

function getTopData(file, idx){
  const topDataMap = new Map()
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    topDataMap.set(res['拓扑编号'], res['对应工厂标准拓扑文件名'])
  })

  return topDataMap
  // console.log(topDataMap);
}

function getHeader(p_caseNo){
  // default header
  return `Resource          common.txt
Resource          D:/rf/lib/lib_source.txt
Resource          D:/rf/key/key_source.txt`
}

function getTail(p_caseNo){

}

const getAuthor = (p_caseNo)=>{
  return ''
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

generateStepExpList = (p_caseData)=>{
  const _steps = p_caseData['测试步骤'].split('\n').filter(i=>i.length > 0)
  const _exps = p_caseData['期望结果'].split('\n').filter(i=>i.length > 0)
  return [_steps, _exps]
}

function getUserName(p_caseNo){
  return ''
}

let stepList
let expList

function generateTxt(caseData, topMap){
  const [steps, exps] = generateStepExpList(caseData)
  let ejs = require('ejs');
  const len = steps.length
  const caseNo = caseData['用例编号']
  //   let tpl = `    ...    脚本正文：
  // <% for(let i = 1; i <= len; i++) { %>
  //     Comment    step <%=i%>
  //     fw_step    测试描述<%=i%>：<%=steps[i-1]%>
  //     fw_expect    预期结果<%=i%>：<%=exps[i-1]%>
  // <% } %>
  // `
  // const data = {
  //   len,
  //   steps: steps,
  //   exps: exps,
  // }
  // let html = ejs.render(tpl, data);
  // console.log(html);

  const templateFillData = {
    caseNo,
    tag:caseNo,
    caseName:caseData['用例名称'],
    caseDesc:caseData['用例描述'],
    topName:topMap.get(caseData['测试拓扑']),
    curDate: moment().format(dateFormat),
    len,
    steps,
    exps,
    // get from config file
    header: getHeader(caseNo),
    tail: getTail(caseNo),
    author: getAuthor(caseNo)
  }
  ejs.renderFile('./template.txt', templateFillData, (err, str)=>{
    console.log(str);
  })
}

function main(){
  // Reading our test file
  const file = reader.readFile('./12.8PL30.xls')

  const topMap = getTopData(file, TOPINDEX)
  const caseList = getSheetData(file, CASEDATAINDEX)
  const testCasePkgName = caseList[0]['用例包名称']
  console.log('用例包名称', testCasePkgName);
  generateTxt(caseList[0], topMap)

}

// ejsTest()
main()
