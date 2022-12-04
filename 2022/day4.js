const fs = require('fs')

const data = () => fs.readFileSync('input4.txt',{encoding: 'utf8'})
const lines = () => data().trim().split('\n');
const log = (...args) => console.log(...args);

const pairs = lines().map(s => s.split(',')).map(p => [p[0].split("-"),p[1].split("-")])

//PART 1
const part1 = pairs.filter(p => {
    return (+p[0][0] >= +p[1][0] && +p[0][1] <= +p[1][1])
    || (+p[1][0] >= +p[0][0] && +p[1][1] <= +p[0][1])
})

log(part1.length)

// PART 2
const overlaps = p => {
    return (+p[0][1] >= +p[1][0]) // simple case of A and B intersecting
        && !(+p[0][0] > +p[1][1] && +p[0][1] > +p[1][1]) // make sure A isn't totally over to the right
}

const part2 = pairs.filter(overlaps)

log(part2.length)

// tests
log('t',overlaps([[71,81],[70,88]]))
log('f',overlaps([[19,19],[18,18]]))
log('t',overlaps([[5,7],[7,9]]))
log('t',overlaps([[75,84],[39,75]]))
log('f',overlaps([[96,96],[ 20,83]]))
