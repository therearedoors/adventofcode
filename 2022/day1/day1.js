const fs = require('fs')

const data = () => fs.readFileSync('../input1.txt',{encoding: 'utf8'})
const trimData = () => data().trim();

const sum = arr => arr.reduce((a,b)=>a+b);
const log = any => console.log(any);

//PART ONE
let elves = trimData().split('\n\n').map(c => c.trim().split('\n')).map(arr=>arr.map(n => +n)).map(arr => sum(arr))

log(elves.reduce((a,b)=>{
    if (a > b) return a;
    if (b > a) return b;
}));

// PART TWO
let one = 0
let two = 0
let three = 0

for (let i=0;i<elves.length;i++){
    if (elves[i] > one){
        two = one;
        one = elves[i]
        continue;
    }
    if (elves[i] > two){
        three = two;
        two = elves[i];
        continue;
    }
    if (elves[i] > three){
        three = elves[i];
    }
}

log(one)
log(two)
log(three)
log(one+two+three)

