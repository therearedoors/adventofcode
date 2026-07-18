const fs = require('fs');

const part1data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(' ').filter((el) => el !== ''));

let part1 = 0;

const part1testData =
`123 328  51 64 
  45 64  387 23 
   6 98  215 314
 *   +   *   + `.trim().split('\n').map(line => line.split(' ').filter((el) => el !== ''));

for (let i = 0; i < part1data[0].length; i++) {
    if (part1data[4][i] === '*') part1 += (Number(part1data[0][i]) * Number(part1data[1][i]) * Number(part1data[2][i]) * Number(part1data[3][i]));
    else if (part1data[4][i] === '+') part1 += (Number(part1data[0][i]) + Number(part1data[1][i]) + Number(part1data[2][i]) + Number(part1data[3][i]));
    else console.log('unknown input', part1data[4][i])
}

const data = fs.readFileSync('input.txt', 'utf-8').split('\n')
const testData = `123 328  51 64 
  45 64  387 23 
   6 98  215 314
 *   +   *   + `.split('\n');

let part2 = 0;

for (let i=0; i < data[0].length; i++){
    if (data[4][i] === '*' || data[4][i] === '+'){
        let nextChar;
        let stepsToNextChar = 0;
        let operands = [];
        while (nextChar !== '*' && nextChar !== '+'){
            stepsToNextChar++;
            nextChar = data[4][i+stepsToNextChar];
        }
        for (let j=i;j<i+stepsToNextChar;j++){
            let operand = ''
            for (let k=0;k<4;k++){
                if(data[k][j] !== ' '){
                    operand+= data[k][j]
                }
            }
            if (Number(operand) !== 0) operands.push(Number(operand))
        }
        console.log(operands, stepsToNextChar)
        if (data[4][i] === '+'){
            part2 += operands.reduce((a,b) => a+b)
        } else if (data[4][i] === '*'){
            part2 += operands.reduce((a,b) => a * b)
        } else console.log('input error:', data[4][i])
    }
}

console.log('part1: ', part1);
console.log('part2: ', part2);