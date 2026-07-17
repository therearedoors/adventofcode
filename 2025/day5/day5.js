const fs = require('fs');


const testData = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`.trim().split('\n\n');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');
const ranges = data[0].split('\n').map(range => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
});

const ids = data[1].split('\n').map(id => Number(id));

console.log(ids[0])

let freshIds = 0

for (const id of ids) {
    for (const range of ranges) {
         if (id >= range.start && id <= range.end) {
            freshIds++;
            break;
        }
    }
}
ranges.sort((a, b) => a.start - b.start);

let merged = [];
let current = ranges[0];

for (let i = 1; i < ranges.length; i++) {
    const {start, end} = ranges[i];
    
    if (start <= current.end + 1) {  // overlapping or adjacent (assuming inclusive integer IDs)
      current.end = Math.max(current.end, end);
    } else {
      merged.push(current);
      current = {start, end};
    }
}
merged.push(current);

const totalFreshIds = merged.reduce((total, {start, end}) => {
    return total + (end - start + 1);
  }, 0);
console.log(`Part 1 - Fresh IDs: ${freshIds}`);
console.log(`Part 2 - Total Fresh IDs: ${totalFreshIds}`);