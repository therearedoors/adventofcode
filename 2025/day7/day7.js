
const testData = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`.trim().split('\n');

const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let beams = new Set(); // columns where beams are active
let splits = 0;

// Find starting position
for (let c = 0; c < data[0].length; c++) {
    if (data[0][c] === 'S') {
        beams.add(c);
        break;
    }
}

for (let r = 1; r < data.length; r++) {        // start from row 1
    const newBeams = new Set();

    for (let c of beams) {
        if (data[r][c] === '^') {
            splits++;
            // split left and right
            if (c - 1 >= 0) newBeams.add(c - 1);
            if (c + 1 < data[r].length) newBeams.add(c + 1);
        } else {
            // continue straight down
            newBeams.add(c);
        }
    }

    beams = newBeams;
}

console.log('Part 1:', splits);