const fs = require('fs')
const data = () => fs.readFileSync('input13.txt',{encoding: 'utf8'});
const rawPackets = data => data.trim().split('\n\n');
const log = (...args) => console.log(...args)
let globalCount = 0;
const test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

const packets = rawPackets(data()).map(q=>q.split('\n').map(p => eval(p)))

const iterators = packets.map(packet => [packet[0][Symbol.iterator](),packet[1][Symbol.iterator]()])

function compareLists(leftIt,leftNx,rightIt,rightNx){

    if (leftNx.done) return true;

    if (rightNx.done) return false;

    if (!Array.isArray(leftNx.value) && !Array.isArray(rightNx.value)){

        if (rightNx.value > leftNx.value) return true;

        if (leftNx.value > rightNx.value) return false;

    const leftNext = leftIt.next()

            const rightNext = rightIt.next();

        return compareLists(leftIt,leftNext,rightIt,rightNext)

    }

    if (Array.isArray(leftNx.value) && Array.isArray(rightNx.value)){

        if (leftNx.value.length === 0 && rightNx.value.length === 0){

            return compareLists(leftIt, leftIt.next(), rightIt, rightIt.next())

        }

        if (leftNx.value.length === 0 && rightNx.value.length > 0) return true;

        if (rightNx.value.length === 0 && leftNx.value.length > 0) return false;

    const iterLeft = leftNx.value[Symbol.iterator]();

    const iterRight = rightNx.value[Symbol.iterator]();

        return compareLists(iterLeft,iterLeft.next(),iterRight,iterRight.next());

    //return compareLists(leftIt, leftIt.next(), rightIt, rightIt.next(), iterators)*

    }

    if (!Array.isArray(leftNx.value)){

    const intoIter = [[leftNx.value]];

    const iter = intoIter[Symbol.iterator]();

        return compareLists(iter,iter.next(),rightIt,rightNx);

    }

    if (!Array.isArray(rightNx.value)){

    const intoIter = [[rightNx.value]];

    const iter = intoIter[Symbol.iterator]();

        return compareLists(leftIt,leftNx,iter,iter.next());

    }

    return 'failed'

}

let results = [];

for (const iterator of iterators) {

    globalCount += 1
    results.push(compareLists(iterator[0], iterator[0].next(), iterator[1], iterator[1].next()))

}
const sortFn = (a,b)=> {

    const itA = a[Symbol.iterator]();

    const itB = b[Symbol.iterator]();

    if (compareLists(itA, itA.next(), itB, itB.next())) return 0;

    else {

        let rand = Math.random();

        if (rand < 0.5) return -1

        else return 1
    }
}



//log('total',(fish + 1) * (chips + 1))

console.log(results)

let count = 0

for (let i=0;i<results.length;i++) {

    if (results[i]) {count += (i + 1);}

}

// //log(packets.length,iterators.length,results.slice(100))*

log("count",count)

//guess 6155 too low!*

// 6395 TOO HIGH*

//6356 TOO HIGH*

let fishCount = 0;
let chipsCount = 0;
const flatPackets = packets.flat()
flatPackets.push([[2]]);
flatPackets.push([[6]])
console.log(flatPackets)

// for (let i=0;i<flatPackets.length;i++){
//     if (sortFn(flatPackets[i],[[2]]) === 0){
//         fishCount+=1
//     }
// }
// if (sortFn([[6]],[[2]]) === 0){
//     fishCount+=1
// }
// for (let j=0;j<flatPackets.length;j++){
//     if (sortFn(flatPackets[j],[[6]]) === 0){
//         chipsCount+=1
//     }
// }
// if (sortFn([[2]],[[6]]) === 0){
//     chipsCount+=1
// }
//log(fishCount,chipsCount,(fishCount+1) * (chipsCount+1))
let sorted = new Array(flatPackets.length)
for(let k=0;k<flatPackets.length;k++) {
    const target = flatPackets[k]
    let score = 0;
    for (let i = 0; i < flatPackets.length; i++) {
        if (k===i) continue;
        if (sortFn(flatPackets[i],flatPackets[k]) === 0){
            score+=1;
        }
        // for (let j = i + 1; j < flatPackets.length) {
        //     if (sortFn(flatPackets[j], flatPackets[j]) === 0) {
        //     }
        // }
    }
    log("item:",k,"position:",score)
    sorted[score] = flatPackets[k]
}
sorted = sorted.map((s,i) => [s,i])
// log(sorted)
// log(sorted.slice(100))
// log(sorted.slice(200))
