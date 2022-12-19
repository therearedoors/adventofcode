const fs = require('fs');
const data = fs.readFileSync('input15.txt',{encoding:'utf8'});
const lines = data => data.trim().split('\n');
const log = (...args)=>console.log(...args);
const numRegex = /-?\d+/g;
const parseInputValues = data => data.map(l=>l.match(numRegex).map(n=>+n))
const Y = 2000000;
const values = parseInputValues(lines(data))
const MAX = 4000000;

const sensors = values.map(val => val.slice(0,2));
const beacons = values.map(val => val.slice(2,4));

let beaconCount = new Set()
const findBeaconsAt = (y) => {
  for (const beacon of beacons){
    if (y === beacon[1]){
      beaconCount.add(beacon[0])
    }
  }
}
findBeaconsAt(Y)
console.log('beaconCount',beaconCount)

function manhattanDistance([Ax,Ay,Bx,By]){
  return Math.abs(Ax-Bx) + Math.abs(Ay-By)
}
const mds = values.map(manhattanDistance)

const highestAndLowest = vals => {
  let highest = -Infinity;
  let lowest = Infinity;
  for (const [A,B,C,D] of vals){
    if (A > highest) highest = A;
    if (C > highest) highest = C;
    if (A < lowest) lowest = A;
    if (C < lowest) lowest = C;
  }
  return [highest,lowest]
}
const [highest,lowest] = highestAndLowest(values);
let count = 0;
const padding = 550000
loop:
for (let i=lowest-padding;i<=highest+padding;i++){
  let X;
  for (let j=0;j<values.length;j++){
    if (manhattanDistance([values[j][0],values[j][1], i, Y]) <= manhattanDistance(values[j])){
      count++;
      continue loop;
    }
    X = i;
  }
}
console.log('partOne',count-beaconCount.size);

// part two, ~ 40 seconds
for (let i=0;i<values.length;i++){
  let J;
  loop:
  for (let j=0;j<=mds[i];j++) {
    const posX = sensors[i][0] + j;
    const posY = sensors[i][1] + mds[i] - j + 1
    const negX = -(sensors[i][0] + j)
    const negY = -(sensors[i][1] + mds[i] - j + 1)
    for (let k=0;k<values.length;k++){
      const sX = sensors[k][0];
      const sY = sensors[k][1];
    if (manhattanDistance([sX,sY,posX,posY]) <= mds[k]) continue loop;
    if (manhattanDistance([sX,sY,posX,negY]) <= mds[k]) continue loop;
    if (manhattanDistance([sX,sY,negX,posY]) <= mds[k]) continue loop;
    if (manhattanDistance([sX,sY,negX,negY]) <= mds[k]) continue loop;
    }
    J = j
  }
  console.log('sensor number',i+1)
  if (J){
    const X = sensors[i][0] + J;
    const Y = sensors[i][1] + mds[i] - J + 1
    if (X > MAX || Y > MAX || X < 0 || Y < 0) {continue;}
    log('md',mds[i],'part two ans',X,Y,X*4000000 + Y);
  }
}
