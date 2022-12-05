const fs = require('fs')

const data = () => fs.readFileSync('input5.txt',{encoding: 'utf8'})
const log = (...args) => console.log(...args);

const [stacks,rawIns] = data().split('\n\n');

const instructions = rawIns.trim().split('\n')

const stackArr = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
}
// unload input data on stacks
for (let i=1;i<10;i++){
    stacks.split('\n').forEach((line) => {
        const next = line.substring((i-1)*4, i*4).trim();
        if (/[1-9]/.test(next)) return;
        if (next) stackArr[i].unshift(next)
    })
}

// extract relevant numbers for instruction strings
const parsedInstructions = []

for (let ins of instructions) {
    if (isNaN(parseInt(ins[6]))) {
        parsedInstructions.push([
            +ins[5],
            +ins[12],
            +ins[17]
        ])
    } else {
        parsedInstructions.push([
            +ins.substring(5,7),
            +ins[13],
            +ins[18]
        ])
    }
}
// part 1
const part1 = stackArr => {
    stackArr = JSON.parse(JSON.stringify(stackArr))
    for (const instruc of parsedInstructions){
        for (let i=0;i<instruc[0];i++) stackArr[instruc[2]].push(stackArr[instruc[1]].pop());
    }
    return stackArr
}

const part1ans = Object.values(part1(stackArr)).map(stack => stack[stack.length-1])

log(part1ans)


//part 2
const part2 = stackArr => {
    stackArr = JSON.parse(JSON.stringify(stackArr))
    for (const instruc of parsedInstructions) {
        const tempStack = [];
        for (let i = 0; i < instruc[0]; i++) {
            tempStack.push(stackArr[instruc[1]].pop())
        }
        for (let i = 0; i < instruc[0]; i++) {
            stackArr[instruc[2]].push(tempStack.pop());
        }
    }
    return stackArr
}


const part2ans = Object.values(part2(stackArr)).map(stack => stack[stack.length-1])
log(part2ans)
