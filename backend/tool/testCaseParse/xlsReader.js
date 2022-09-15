const moment = require('moment');
moment.locale('zh-cn');

const path = require('path');

const fs = require('fs');
const { promisify } = require('util');
const readFileP = promisify(fs.readFile);
const writeFileP = promisify(fs.writeFile);
const mkdirP = promisify(fs.mkdir)

const _ = require('lodash');

const { PROJECT_DIR } = require('config')

const xlsReader = require('xlsx')
const {findFileRecursivelySync, zipDirectory} = require('utils/fs');
const {logger} = require('init')

const TOPINDEX = 1
const CASEDATAINDEX = 0
const dateFormat = 'YYYY-MM-DD'

const readSheet2Json = (xlsReader.utils.sheet_to_json)

async function getSheetData(file, idx){
  const tData = []
  const temp = await readSheet2Json(file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    tData.push(res)
  })

  return tData
}

function getTopData(file, idx){
  const topDataMap = new Map()
  const temp = xlsReader.utils.sheet_to_json(file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    topDataMap.set(res['拓扑编号'], res['对应工厂标准拓扑文件名'])
  })

  // console.log(topDataMap);
  return topDataMap
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

async function generateTxt(caseData, topMap){
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
  const resultTxt = await ejs.renderFile(`${PROJECT_DIR}/tool/testCaseParse/template.txt`, templateFillData, {async: true})
  return resultTxt

  // ejs.renderFile(`${PROJECT_DIR}/tool/testCaseParse/template.txt`, templateFillData, (err, str)=>{
  //   // console.log(str);
  //   if(err){
  //     throw err
  //   }
  // })
}

async function generateRf(folder){
  const condition = i=>(i.endsWith('.xls') || i.endsWith('.xlsx') || i.endsWith('.zip'))
  const fileList = findFileRecursivelySync(folder ).filter(i=>(condition(i)))
  let tpFilePath = fileList[0]
  let cfgFilePath = ''
  if(fileList.length > 1){
    if(fileList[1].includes('_config')){
      cfgFilePath = fileList[1]
    }
  }
  // console.log(tpFilePath);
  // console.log(cfgFilePath);
  logger.info(`read ${path.basename(tpFilePath)}`)
  const tpFile = xlsReader.read(await readFileP(tpFilePath), {type: 'buffer'});
  // const tpFile = xlsReader.readFile(tpFilePath)

  const topMap = getTopData(tpFile, TOPINDEX)
  const caseList = await getSheetData(tpFile, CASEDATAINDEX)

  const pkgNameSet = new Set()
  for(let caseData of caseList){
    const testCasePkgName = caseData['用例包名称']
    pkgNameSet.add(testCasePkgName)

    const rfTxt = await generateTxt(caseData, topMap)
    const caseNo = caseData['用例编号']
    logger.info(`convert ${testCasePkgName}/${caseNo}`)

    const targetFolder = path.join(folder, `${testCasePkgName}_RFTxt`)
    try{
      await mkdirP(targetFolder)
    }catch(e){}

    logger.info(`begin to write ${caseNo}.txt`);
    await writeFileP(
      path.resolve(targetFolder, `${caseNo}.txt`),
      rfTxt
    );
  }

  for(let pkgName of pkgNameSet){
    logger.info(`begin to zip ${pkgName}`);
    const targetFolder = path.join(folder, `${pkgName}_RFTxt`)
    await zipDirectory(targetFolder, path.join(folder, `${pkgName}.zip`))
  }
}

function testmain(){
  // Reading our test file
  const file = xlsReader.readFile('./12.8PL30.xls')

  const topMap = getTopData(file, TOPINDEX)
  const caseList = getSheetData(file, CASEDATAINDEX)
  const testCasePkgName = caseList[0]['用例包名称']
  console.log('用例包名称', testCasePkgName);
  generateTxt(caseList[0], topMap)

}

// ejsTest()
// main()

module.exports={
  generateRf
}
