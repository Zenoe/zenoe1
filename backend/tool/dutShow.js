
function callPy(funcName, showInfo){
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python2',["script/callDutGetShow.py", funcName, showInfo]);

  pythonProcess.on('close', (code, signal) => {
    console.log(
      `child process terminated due to receipt of signal ${signal}`);
  });

    return new Promise((resolve, reject) =>{
    pythonProcess.stdout.on("data", data =>{
      // by default converts to utf-8
      resolve([pythonProcess, data.toString()]);
    })
    process.stderr.on("data", data=>reject(data))
  })
}

callPy('show srv6 locator',
`segment routing locator info:
  locator as
    prefix 300:: 64 static 32
    AutoSIDBegin  : 300::1:0:0
    AutoSIDEnd    : 300::ffff:ffff:ffff:ffff
    StaticSIDBegin  : 300::1
    StaticSIDEnd    : 300::ffff:ffff
    static sid info  : static sid number(4)
      opcode ::10 end no-flavor  - SR(300::10/128) active
      opcode ::21 end-x interface HundredGigabitEthernet 1/1 nexthop 1002::1 no-flavor  - SR(300::21/128) inactive
      opcode ::23 end-x interface HundredGigabitEthernet 1/3 nexthop 1003::1 no-flavor  - SR(300::23/128) inactive
      opcode ::24 end-x interface HundredGigabitEthernet 1/2 nexthop 1005::1 no-flavor  - SR(300::24/128) inactive
    dynamic sid info : dynamic sid number(0)`
      )
  .then((res)=>{
        console.log('receive from py:', res[1]);
        res[0].kill('SIGTERM');
      })

console.log('end');