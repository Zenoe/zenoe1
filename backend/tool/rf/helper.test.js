const { createCheckResult, combineLines, spAroundEqCheck, searchSection, checkSection, isNextLineCurLine, findNextSec } = require('./helper')

const rfTxtList = [
  '      ${result10_26}    ${result10_27}    ${result10_28}    com_l2evpn_route_judge_dut2_ORF',
  '    ${global_result}    fw_stepresult    ${global_result}    ${result10_1}    ${result10_2}    ${result10_3}    ${result10_4}    ${result10_5}    ${result10_6}    ${result10_7}    ${result10_8}    ${result10_9}    ${result10_10}',
  '    ...                                  ${result10_11}    ${result10_12}    ${result10_13}    ${result10_14}    ${result10_15}    ${result10_16}    ${result10_17}    ${result10_18}    ${result10_19}    ${result10_20}',
  '    ...                                  ${result10_21}    ${result10_22}    ${result10_23}    ${result10_24}    ${result10_25}    ${result10_26}    ${result10_27}    ${result10_28}',
  '    [Teardown]    run_keywords    com_teardown    AND    fw_case_teardown'
]

const combineLine = combineLines(rfTxtList, 1)

console.log(combineLine)
