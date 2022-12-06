const fs = require('fs')

const data = () => fs.readFileSync('input6.txt',{encoding: 'utf8'})
const log = (...args) => console.log(...args);

const lines = () => data().trim().split('\n');

const packetData = data().trim();
let signal = new Array(4).fill(0);
let firstFlag = true;
//part 1

loop:
for (let i=0;i<packetData.length;i++){
    signal[0] = packetData[i];
    signal[1] = packetData[i+1];
    signal[2] = packetData[i+2];
    signal[3] = packetData[i+3];
    if (firstFlag) {
        for (let j = 0; j < signal.length; j++) {
            for (let k = j + 1; k < signal.length; k++) {
                if (signal[j] === signal[k]) continue loop;
            }
        }
        firstFlag = false;
    } else {
        for (let j = 0; j < signal.length-1; j++){
            if (signal[3] === signal[j]) continue loop;
        }
    }
    console.log(signal,i+signal.length);
    break;
}

//part2
firstFlag = true;
let fourteen = new Array(14).fill(0);
loop2:
for (let i=0;i<packetData.length;i++){
    for (let j=0;j<fourteen.length;j++){
        fourteen[j] = packetData[i+j]
    }
    if (firstFlag) {
        for (let j = 0; j < fourteen.length; j++) {
            for (let k = j + 1; k < fourteen.length; k++) {
                if (fourteen[j] === fourteen[k]) {
                    continue loop2;
                }
            }
        }
        firstFlag = false;
    } else {
        for (let j = 0; j < fourteen.length - 1; j++) {
            if (signal[13] === fourteen[j]) continue loop2;
        }
    }
    console.log(fourteen,i+14)
    break;
}
