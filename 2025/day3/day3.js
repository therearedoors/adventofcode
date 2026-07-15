const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split('').map(Number));
const testData = `987654321111111
811111111111119
234234234234278
818181911112111`.split('\n').map(line => line.split('').map(Number));

function findHighestJoltage(numArray, highestDigit = 9, resultOfFirstCall = null, tailEndFind = false) {
    while (highestDigit > 0) {
        for (let i = 0; i < numArray.length; i++) {
            if (numArray[i] === highestDigit) {
                if (typeof resultOfFirstCall === 'number') {
                    //console.log(`Found ${highestDigit} in ${numArray}, returning ${resultOfFirstCall}${highestDigit}`);
                    if (tailEndFind) {
                        return String(highestDigit) + String(resultOfFirstCall);
                    }
                    return String(resultOfFirstCall) + String(highestDigit);
                } else {
                    //console.log(`Found ${highestDigit} in ${numArray}, calling findHighestJoltage with ${numArray.slice(i + 1)}, ${highestDigit}, ${highestDigit}`);
                    if (i === numArray.length - 1) {
                        return findHighestJoltage(numArray, highestDigit - 1, highestDigit, true);
                    }
                    return findHighestJoltage(numArray.slice(i + 1), highestDigit, highestDigit);
                }
            }
        }
        highestDigit--;
    }
}

let part1 = 0;
let part2 = 0;

data.forEach(numArray => {
    const result = findHighestJoltage(numArray);
    console.log(`Result for ${numArray}: ${result}`);
    part1 += Number(result);
});
// need to find a 9, or and 8 or a 7 etc,
// then one more time need to find a 9, or an 8 etc.

console.log(`Part 1: ${part1}`);