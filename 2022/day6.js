const fs = require('fs')

const data = () => fs.readFileSync('input6.txt',{encoding: 'utf8'})
const log = (...args) => console.log(...args);

const lines = () => data().trim().split('\n');

const packetData = data().trim();
let signal = new Array(4).fill(0);;

//part 1

loop:
for (let i=0;i<packetData.length;i++){
    signal[0] = packetData[i];
    signal[1] = packetData[i+1];
    signal[2] = packetData[i+2];
    signal[3] = packetData[i+3];
    for (let j=0;j<signal.length;j++) {
        for (let k = j + 1; k < signal.length; k++) {
            if (signal[j] === signal[k]) continue loop;
        }
    }
    console.log(signal,i+signal.length);
    break;
}

//part2
loop2:
for (let i=0;i<packetData.length;i++){
    let fourteen = []
    for (let l=i;l<(i+14);l++){
        fourteen.push(packetData[l])
    }
    for (let j=0;j<fourteen.length;j++) {
        for (let k = j+1; k <fourteen.length; k++) {
            if (fourteen[j] === fourteen[k]) {
                continue loop2;
            }
        }
    }
    console.log(fourteen,i+14)
    break;
}
