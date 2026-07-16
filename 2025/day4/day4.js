const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));

const testData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split('\n').map(line => line.split(''));

let count = 0

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        let neighbors = 0;
        if (data[i][j] === '@') {
            if (i-1 >= 0){
                if (data[i-1][j] === '@') neighbors++;
            }
            if (i-1 >= 0 && j+1 < data[i].length) {
                if (data[i-1][j+1] === '@') neighbors++;
            }
            if (i-1 >= 0 && j-1 >= 0) {
                if (data[i-1][j-1] === '@') neighbors++;
            }
            if (i+1 < data.length && j+1 < data[i].length) {
                if (data[i+1][j+1] === '@') neighbors++;
            }
            if (i+1 < data.length && j-1 >= 0) {
                if (data[i+1][j-1] === '@') neighbors++;
            }
            if (i+1 < data.length) {
                if (data[i+1][j] === '@') neighbors++;
            }
            if (j+1 < data[i].length) {
                if (data[i][j+1] === '@') neighbors++;
            }
            if (j-1 >= 0) {
                if (data[i][j-1] === '@') neighbors++;
            }
            if (neighbors < 4) count++;
        }
    }
}

function prunePaper(data, count = 0, doneFlag = false) {
    doneFlag = true;
    for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        let neighbors = 0;
        if (data[i][j] === '@') {
            if (i-1 >= 0){
                if (data[i-1][j] === '@') neighbors++;
            }
            if (i-1 >= 0 && j+1 < data[i].length) {
                if (data[i-1][j+1] === '@') neighbors++;
            }
            if (i-1 >= 0 && j-1 >= 0) {
                if (data[i-1][j-1] === '@') neighbors++;
            }
            if (i+1 < data.length && j+1 < data[i].length) {
                if (data[i+1][j+1] === '@') neighbors++;
            }
            if (i+1 < data.length && j-1 >= 0) {
                if (data[i+1][j-1] === '@') neighbors++;
            }
            if (i+1 < data.length) {
                if (data[i+1][j] === '@') neighbors++;
            }
            if (j+1 < data[i].length) {
                if (data[i][j+1] === '@') neighbors++;
            }
            if (j-1 >= 0) {
                if (data[i][j-1] === '@') neighbors++;
            }
            if (neighbors < 4) {
                count++;
                data[i][j] = '.';
                doneFlag = false;
            }
        }
    }
}
if (doneFlag) return count;
else return prunePaper(data, count);
}

const part2 = prunePaper(data);

console.log(`Part 1: ${count}`);
console.log(`Part 2: ${part2}`);