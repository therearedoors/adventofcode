const fs = require('fs')

const data = () => fs.readFileSync('input3.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');
const log = any => console.log(any);

const contents = lines();
const groups = []

// gets "item type priority"
const sumItems = (a,b) => {
    const code = b.charCodeAt(0)
    if (code>95) return a + code - 96
    else return a + code - 64 + 26
};

// Part 1
const pairs = lines().map(s => ([s.slice(0,Math.floor(s.length/2)),s.slice(Math.floor(s.length/2))]))
log(pairs.map(pair => pair[0].split("").find(e => pair[1].includes(e))).reduce(sumItems,0))

// Part 2
for (let i=0;i<300;i+=3){
    groups.push(contents.slice(i,i+3))
}
const items = groups.map(group => {
    return group[0].split("").find(l =>group[1].includes(l) && group[2].includes(l))
}).reduce(sumItems,0)
log(items)
