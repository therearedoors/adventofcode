const fs = require('fs')

const data = () => fs.readFileSync('input11.txt',{encoding: 'utf8'});
const monkeys = data => data.trim().split('\n\n').map(m => m.split('\n').map(l => l.trim()));

class Monkey {
    constructor([id,items,fn,test,pass,fail]) {
        this.id = +id.match(/\d+/g)[0]
        this.items = items.match(/\d+/g).map(n=>+n)
        this.itemIterator = this.items[Symbol.iterator]();
        this.fn = (x) => eval(`let fn = old => ${fn.slice(17)};fn(${x})`);
        this.test = (x) => x % +test.match(/\d+/g)[0] === 0;
        this.targetMonkeyOnTestPass = +pass.match(/\d+/g)[0];
        this.targetMonkeyOnTestFail = +fail.match(/\d+/g)[0];
        this.inspectCount = 0;
    }

    takeTurn(relieved){
        let count = 0;
        for (const item of this.items){
            //inspect
            const inspectedItem = this.fn(item);
            this.inspectCount += 1;
            // relief
            let itemWithUpdatedWorryLevel = inspectedItem;
            if (relieved) itemWithUpdatedWorryLevel = Math.floor(inspectedItem / 3);
            // reduce to LCM
            itemWithUpdatedWorryLevel = itemWithUpdatedWorryLevel % LOWEST_COMMON_MULTIPLE;
            //throw
            if (this.test((itemWithUpdatedWorryLevel))){
                monkeyTeam[this.targetMonkeyOnTestPass].items.push(itemWithUpdatedWorryLevel);
            } else {
                monkeyTeam[this.targetMonkeyOnTestFail].items.push(itemWithUpdatedWorryLevel);
            }
        }
        this.items = [];
    }
}

const LOWEST_COMMON_MULTIPLE = 9699690;

let monkeyTeam = monkeys(data()).map(monkey => new Monkey(monkey))
const part1rounds = 20;
const part2rounds = 10000;

for (let i=0;i<part1rounds;i++){
    for (const monkey of monkeyTeam){
        monkey.takeTurn(true);
    }
}
//part 1
let counts = monkeyTeam.map(monkey => monkey.inspectCount);
counts.sort((a,b)=>b-a);
console.log(counts[0]*counts[1])
//part 2
monkeyTeam = monkeys(data()).map(monkey => new Monkey(monkey))
for (let i=0;i<part2rounds;i++){
    for (const monkey of monkeyTeam){
        monkey.takeTurn(false);
    }
}
counts = monkeyTeam.map(monkey => monkey.inspectCount);
counts.sort((a,b)=>b-a);
console.log(counts[0]*counts[1])
