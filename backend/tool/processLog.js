const fs = require('fs')
const readline = require('readline');
const { writeFileSync, unlinkSync} = fs

outputFileName = '../local-data/timestamp.txt'

try{
    unlinkSync(outputFileName)
}catch(e){}

async function processLineByLine() {
    const fileStream = fs.createReadStream('../local-data/rflog.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // match 2022/03/04 11:12:14
        // const timeStampRegString = '[0-9]{4}/(0[1-9]|1[0-2])/(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]'

        const timeStampRegString = '[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]'
        const searchPattern = new RegExp('^' + timeStampRegString);
        if (searchPattern.test(line)) {
            const timestamp = line.substring(0,17)
            console.log(timestamp);
            writeFileSync(outputFileName, `${timestamp}\n`, {flag: 'a'})
        }
    }
}

processLineByLine();
