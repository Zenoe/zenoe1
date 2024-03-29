const moment = require('moment')
moment.locale('zh-cn')

const path = require('path')

const fs = require('fs')
const { promisify } = require('util')
const readFileP = promisify(fs.readFile)
const writeFileP = promisify(fs.writeFile)
const mkdirP = promisify(fs.mkdir)

const _ = require('lodash')

const { PROJECT_DIR } = require('config')

const xlsReader = require('xlsx')
const { findFileRecursivelySync, zipDirectory } = require('utils/fs')
const { logger } = require('init')

const TOPINDEX = 1
const CASEDATAINDEX = 0
const dateFormat = 'YYYY-MM-DD'

const readSheet2Json = (xlsReader.utils.sheet_to_json)

async function getSheetData (file, idx) {
  const tData = []
  const temp = await readSheet2Json(file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    tData.push(res)
  })

  return tData
}

function getTopData (file, idx) {
  const topDataMap = new Map()
  const temp = xlsReader.utils.sheet_to_json(file.Sheets[file.SheetNames[idx]])
  temp.forEach((res) => {
    topDataMap.set(res['拓扑编号'], res['对应工厂标准拓扑文件名'])
  })

  // console.log(topDataMap);
  return topDataMap
}

function getConfig (_cfgMap, _caseNo, _colName) {
  try {
    if (_cfgMap.get(_caseNo)) {
      return _cfgMap.get(_caseNo)[_colName].split('\n')
    } else {
      if (_cfgMap.get('默认')) {
        return _cfgMap.get('默认')[_colName].split('\n')
      } else {
        return ''
      }
    }
  } catch (err) {
    logger.error(`getConfig failed ${_cfgMap}, ${_caseNo}, ${_colName}`)
    // _cfgMap.forEach((value, key) => {
    //   console.log(`${key}: ${Object.entries(value)}`)
    // })
    logger.warn(`getConfig failed at getting ${_caseNo}, ${_colName}`)
    // throw err
  }
}

function getTail (p_caseNo) {

}

const getAuthor = (p_caseNo) => {
  return ''
}

function generateStep (p_caseSteps, p_out_result) {
  // console.log(p_caseSteps);
  const steps = p_caseSteps.split('\n')
  p_out_result = steps
  let retTxt = ''
  for (const line of steps) {
    retTxt = retTxt.appendDocumention(line)
  }

  console.log('reretTxt', retTxt)
  return retTxt
}

generateStepExpList = (p_caseData) => {
  const _steps = p_caseData['测试步骤'].split('\n').filter(i => i.length > 0)
  const _exps = p_caseData['期望结果'].split('\n').filter(i => i.length > 0)
  return [_steps, _exps]
}

function getUserName (p_caseNo) {
  return ''
}

async function generateTxt (caseData, topMap, cfgMap) {
  const [steps, exps] = generateStepExpList(caseData)
  const ejs = require('ejs')
  const len = steps.length
  const caseNo = caseData['用例编号']
  const templateFillData = {
    caseNo,
    tag: caseNo,
    caseName: caseData['用例名称'],
    caseDesc: caseData['用例描述'],
    topName: topMap.get(caseData['测试拓扑']),
    curDate: moment().format(dateFormat),
    len,
    steps,
    exps,
    // get from config file
    header: getConfig(cfgMap, caseNo, 'header'),
    // tail: cfgMap.get(caseNo).tail.split('\n') || getTail(caseNo),
    tail: getConfig(cfgMap, caseNo, 'tail'),
    // author: cfgMap.get(caseNo).author || getAuthor(caseNo)
    author: getConfig(cfgMap, caseNo, 'author')
  }
  const resultTxt = await ejs.renderFile(`${PROJECT_DIR}/tool/testCaseParse/template.txt`, templateFillData, { async: true })
  // console.log(resultTxt);
  return resultTxt
}

async function generateRf (folder, pkgName) {
  // const condition = i=>(i.endsWith('.xls') || i.endsWith('.xlsx') || i.endsWith('.zip'))
  // const fileList = findFileRecursivelySync(folder ).filter(i=>(condition(i)))
  // let tpFilePath = fileList[0]
  // let cfgFilePath = ''
  // if(fileList.length > 1){
  //   if(fileList[1].includes('_config')){
  //     cfgFilePath = fileList[1]
  //   }
  // }
  const tpFilePath = path.join(folder, pkgName)
  logger.info(`read ${path.basename(tpFilePath)}`)

  if (fs.statSync(tpFilePath).isFile()) {
    logger.info(`find relative config file ${tpFilePath}`)
  } else {
    // error thrown by xlsReader does not include stack info
    throw new Error('no tpFile found')
  }
  const tpFile = xlsReader.read(await readFileP(tpFilePath), { type: 'buffer' })

  const _dotIdx = pkgName.lastIndexOf('.')
  const pkgMainName = pkgName.substring(0, _dotIdx)
  const pkgDotExt = pkgName.substring(_dotIdx)
  const cfgFileName = pkgMainName + '_config' + pkgDotExt
  const cfgFilePath = path.join(folder, cfgFileName)

  const cfgMap = new Map()
  if (fs.statSync(cfgFilePath).isFile()) {
    logger.info(`find relative config file ${cfgFilePath}`)
    const cfgFile = xlsReader.read(await readFileP(cfgFilePath), { type: 'buffer' })
    const cfgList = await getSheetData(cfgFile, 0)
    for (const cfg of cfgList) {
      cfgMap.set(cfg['用例编号'], {
        author: cfg['编写人员'],
        header: cfg['脚本头部'],
        tail: cfg['脚本尾部']
      })
    }
    // console.log(cfgMap);
  }

  const topMap = getTopData(tpFile, TOPINDEX)
  const caseList = await getSheetData(tpFile, CASEDATAINDEX)

  const pkgNameSet = new Set()
  for (const caseData of caseList) {
    const testCasePkgName = caseData['用例包名称']
    pkgNameSet.add(testCasePkgName)

    const rfTxt = await generateTxt(caseData, topMap, cfgMap)
    const caseNo = caseData['用例编号']
    logger.info(`convert ${testCasePkgName}/${caseNo}`)

    const targetFolder = path.join(folder, `${testCasePkgName}_RFTxt`)
    try {
      await mkdirP(targetFolder)
    } catch (e) {}

    logger.info(`begin to write ${caseNo}.txt`)
    await writeFileP(
      path.resolve(targetFolder, `${caseNo}.txt`),
      rfTxt
    )
  }

  for (const pkgName of pkgNameSet) {
    logger.info(`begin to zip ${pkgName}`)
    const targetFolder = path.join(folder, `${pkgName}_RFTxt`)
    await zipDirectory(targetFolder, path.join(folder, `${pkgName}.zip`))
  }
}

// function testmain(){
//   const file = xlsReader.readFile('./12.8PL30.xls')
//   const topMap = getTopData(file, TOPINDEX)
//   const caseList = getSheetData(file, CASEDATAINDEX)
//   const testCasePkgName = caseList[0]['用例包名称']
//   console.log('用例包名称', testCasePkgName);
//   generateTxt(caseList[0], topMap)
// }

module.exports = {
  generateRf
}
