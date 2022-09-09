#!/usr/bin/env python

import sys
from DutGetShow import DutGetShow as DutGetClass

def callDutGetShow(funcName, showInfo):
    # print (funcName)
    # print (showInfo)
    tmp = DutGetClass()

    dutShowFun = getattr(tmp, funcName)
    result = dutShowFun(showInfo)
    print (result)
    sys.stdout.flush()

def formFuncName(showCmd):
    tmp = showCmd.replace(' ', '_')
    return 'dut_get_'+tmp

# dut_get_show_srv6_locator
def main():
    showCmd = sys.argv[1]
    showInfo = sys.argv[2]
    if len(sys.argv)< 3 :
        return 'not enough arugments'
    else:
        funcName = formFuncName(showCmd)
        callDutGetShow(funcName, showInfo)



if __name__ == "__main__":
    main()
