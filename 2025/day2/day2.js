const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').join('').trim();
const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`.split('\n').join('').trim();
let sum1 = 0;
let sum2 = 0;

const ranges = input.split(',').map(range => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
});
const testRanges = testInput.split(',').map(range => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
});

for (const range of ranges) {
    const { start, end } = range;
    for (let i = start; i <= end; i++) {
        if (isSillyPattern(i.toString())) {
            sum1 += i;
        }
        if (isSillyPattern2(i.toString())) {
            sum2 += i;
        }
    }
}

function isSillyPattern(string) {
    const digits = string.split('').map(Number);
    for (let candidateLength = 1; candidateLength < digits.length; candidateLength++) { // Check for repeating patterns of length i
        const candidate = digits.slice(0, candidateLength); // Get the first candidateLength digits as the candidate pattern
        if (candidateLength * 2 !== digits.length) continue;
        let flag = false;
        for (let startingPoint = 0; startingPoint <= digits.length; startingPoint += candidate.length) { // Check every subsequent segment of the same length
            if (digits.slice(startingPoint, startingPoint + candidate.length).every((val, idx) => val === candidate[idx])) { // If any segment doesn't match the candidate pattern
                if (startingPoint + candidate.length === digits.length) {
                    flag = true;
                }
                continue;
            } else {
                break;
            }
        }
        if (flag) {
            return true;
        }
    }
    return false;
 } // If no repeating pattern was found, return false


 function isSillyPattern2(string) {
    const digits = string.split('').map(Number);
    for (let candidateLength = 1; candidateLength < digits.length; candidateLength++) { // Check for repeating patterns of length i
        const candidate = digits.slice(0, candidateLength); // Get the first candidateLength digits as the candidate pattern
        let flag = false;
        for (let startingPoint = 0; startingPoint <= digits.length; startingPoint += candidate.length) { // Check every subsequent segment of the same length
            if (digits.slice(startingPoint, startingPoint + candidate.length).every((val, idx) => val === candidate[idx])) { // If any segment doesn't match the candidate pattern
                if (startingPoint + candidate.length === digits.length) {
                    flag = true;
                }
                continue;
            } else {
                break;
            }
        }
        if (flag) {
            console.log(`Found repeating pattern: ${candidate} in ${string}`);
            return true;
        }
    }
    return false;
 } // If no repeating pattern was found, return false

console.log(`Sum 1: ${sum1}`);
console.log(`Sum 2: ${sum2}`);