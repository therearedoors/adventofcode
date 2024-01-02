const fs = require('fs')

const data = () => fs.readFileSync('input1b.txt',{encoding: 'utf8'})
const trimData = () => data().trim();
const sum = arr => arr.reduce((a,b)=>+a + +b);
const log = (...args) => console.log(...args);

const regex = /one|two|three|four|five|six|seven|eight|nine|9|8|7|6|5|4|3|2|1/g

//PART ONE
let lines = trimData().split('\n');
const totals = lines.map((e)=> {
    let first;
    let second;
    for (const char of e) {
        if (!isNaN(+char)){
            first = char
        }
    }
    for (const char of e.split('').reverse().join()){
        if (!isNaN(+char)){
            second = char
        }
    }
    return second + first
})

log('part one',sum(totals));

const transformTextNumber = (textNumber) => {
    let first;
    switch (textNumber) {
        case 'one':
            first = '1';
            break;
        case 'two':
            first = '2';
            break;
        case 'three':
            first = '3';
            break;
        case 'four':
            first = '4';
            break;
        case 'five':
            first = '5';
            break;
        case 'six':
            first = '6';
            break;
        case 'seven':
            first = '7';
            break;
        case 'eight':
            first = '8';
            break;
        case 'nine':
            first = '9';
            break;
        default:
            first = textNumber;
    }
            return first;
    }

const extractTextSignals = (e) => {
    let matches = Array.from(e.matchAll(regex));
    let first = matches[0][0];
    let second = matches[matches.length-1][0];
    //console.log(second,first);
    return transformTextNumber(second) + transformTextNumber(first)
}

//PART TWO
const totalsPartTwo = lines.map(extractTextSignals)
log('part two',sum(totalsPartTwo));


//tests
let e = 'sixrhxkzcgfhltrchq3three91'
let first;
let second;
for (const char of e) {
    if (!isNaN(+char)){
        first = char
    }
}
for (const char of e.split('').reverse().join()) {
    if (!isNaN(+char)) {
        second = char
    }
}

log('test one', '31', first,second, first+second);

let f = '5hdhtdxgktztjdjrhkmlblsevenseven1four8'
let firstA;
let secondB;
for (const char of f) {
    if (!isNaN(+char)){
        firstA = char
    }
}
for (const char of f.split('').reverse().join()) {
    if (!isNaN(+char)) {
        secondA = char
    }
}

log('test two', '58', firstA,secondA, firstA+secondA);

//testThree
let g = 'eighthree'
console.log(extractTextSignals(g));

function part2(inp) {
    return inp
        .split('\n')
        .map((l) => {
            return getCode(l);
        })
        .reduce((sum, n) => sum + n, 0);
}

function getCode(line) {
    let numbers1 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let numbers2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let first = null;
    let min = Infinity;

    numbers1.forEach((textN, i) => {
        let foundN1 = line.indexOf(textN);
        let foundN2 = line.indexOf(numbers2[i]);

        let found = Math.min(...[min, foundN1, foundN2].filter((n) => n > -1));

        if (found < min) {
            min = found;
            first = i + 1;
        }
    });

    let last = null;
    let max = -1;

    numbers1.forEach((textN, i) => {
        let foundN1 = line.lastIndexOf(textN);
        let foundN2 = line.lastIndexOf(numbers2[i]);

        let found = Math.max(max, foundN1, foundN2);

        if (found > max) {
            max = found;
            last = i + 1;
        }
    });

    return first * 10 + last;
}

//test
const testC = 'oneight'
console.log('test',getCode(testC));
console.log('PART TWO',sum(lines.map(getCode)))



// let elves = trimData().split('\n\n').map(c => c.trim().split('\n')).map(arr=>arr.map(n => +n)).map(arr => sum(arr))
//
// log(elves.reduce((a,b)=>{
//     if (a > b) return a;
//     if (b > a) return b;
// }));
//
// // PART TWO
// let one = 0
// let two = 0
// let three = 0
//
// for (let i=0;i<elves.length;i++){
//     if (elves[i] > one){
//         two = one;
//         one = elves[i]
//         continue;
//     }
//     if (elves[i] > two){
//         three = two;
//         two = elves[i];
//         continue;
//     }
//     if (elves[i] > three){
//         three = elves[i];
//     }
// }

// log(one)
// log(two)
// log(three)
// log(one+two+three)

