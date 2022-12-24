const fs = require('fs');
const data = fs.readFileSync('input17.txt',{encoding:'utf8'})
const preparedCache = fs.readFileSync('day17cache.txt',{encoding:'utf8'})
let cache = JSON.parse(preparedCache);

const PT1_ROCK_COUNT = 2022;
console.log('rockCount',PT1_ROCK_COUNT)
const PT2_ROCK_COUNT = 1000000000000;

let turns = 0;
let windDirection;
let shapeParts;
let shapePosition;
let shapeFns;
let hasStopped;
let chutePosition;
let currentShape;
let rocks;

// horizontal rock
const OOXXXXO = n => n === 120 || n === 60 || n === 30 || n === 15;
// cross vertical points
const OOOXOOO = n => n === 32 || n === 16 || n === 8 || n === 4 || n === 2;
// cross and 'L' horizontal edge
const OOXXXOO = n => n === 112 || n === 56 || n === 28 || n === 14 || n === 7;
// 'L' vertical edge
const OOOOXOO = n => n === 16 || n === 8 || n === 4 || n === 2 || n === 1;
// vertical rock
const OOXOOOO = n => n === 64 || n === 32 || n === 16 || n === 8 || n === 4 || n === 2 || n === 1;
// square rock
const OOXXOOO = n => n == 96 || n == 48 || n === 24 || n === 12 || n === 6 || n === 3;

const horizontal = () => [{val: 30, fn: OOXXXXO}];
const cross = () => [{val: 8, fn: OOOXOOO},{val:28,fn:OOXXXOO},{val:8, fn:OOOXOOO}];
const ell = () => [{val: 4, fn:OOOOXOO},{val: 4, fn:OOOOXOO},{val: 28, fn:OOXXXOO}];
const vertical = () => [{val: 16, fn:OOXOOOO},{val: 16, fn:OOXOOOO},{val: 16, fn:OOXOOOO},{val: 16, fn:OOXOOOO}];
const square = () => [{val: 24, fn:OOXXOOO},{val: 24, fn:OOXXOOO}];

let shapeNames = ['horizontal','cross','ell','vertical','square'];

const nextShape = {
  0: horizontal,
  1: cross,
  2: ell,
  3: vertical,
  4: square
}

const getNextShape = rockCount => nextShape[rockCount % 5]
const noClashBetween = (state1,state2) => !(state1 & state2);
const clashBetween = (state1,state2) => state1 & state2;

function moveDown(){
  if (chute.length === chutePosition + shapeParts.length){
    hasStopped = true;
    chutePosition += 1;
    return
  }
  for (let i=0;i<shapePosition.length;i++){
    if (clashBetween(shapePosition[i],chute[chuteIndexAt(chutePosition+i+2)])) {
      chutePosition+=1;
      hasStopped = true;
      return;
    }
  }
  chutePosition+=1;
  return
}

function chuteIndexAt(position){
  return chute.length - position
}

function moveLeft(){
  const prospectiveMove = shapePosition.map(position => position << 1);
  for (let i=0;i<shapeParts.length;i++){
    if (!canMoveLeft(prospectiveMove[i],chute[chuteIndexAt(chutePosition + i + 1)],shapeFns[i])) return
  }
  shapePosition = prospectiveMove;
  return;
}

function moveRight(){
  const prospectiveMove = shapePosition.map(position => position >> 1);
  for (let i=0;i<shapeParts.length;i++){
    if (!canMoveRight(prospectiveMove[i],chute[chuteIndexAt(chutePosition + i + 1)],shapeFns[i])) return
  }
  shapePosition = prospectiveMove;
  return;
}

const canMoveLeft = (move, rowState, shapeHasValid) => noClashBetween(move,rowState) && shapeHasValid(move);
const canMoveRight = (move, rowState, shapeHasValid) => noClashBetween(move,rowState) && shapeHasValid(move);

function adjustForNextPiece(chute){
  while (chute[chute.length-1] === 0) chute.pop();
  for (let i=0;i<3;i++){
    chute.push(0)
  }
}
let chute = [];

//BUSINESS LOOP PART ONE
for (rocks=0;rocks<PT1_ROCK_COUNT;rocks++){
  adjustForNextPiece(chute);
  currentShape = getNextShape(rocks)
  compute()
  if (''+shapeNames[rocks%5]+''+turns%data.length in cache){
    len += cache[''+shapeNames[rocks%5]+''+turns%data.length];
    opCache.push(''+shapeNames[rocks%5]+''+turns%data.length)
  }
}

// PART TWO

// '1730', '218', '436' - and the '1222656' and '3' on ln 131 - are magic numbers specific to the cycle
// pattern of my data.
//1730 is the number of rocks that pass before the rock/wind direction pattern repeats
// the '3' on ln 131 I'm less sure about, it appears to be an anomalous function of the tower reaching
// a certain height (I wasn't checking the top tower section)

while (chute[chute.length-1] === 0) chute.pop();
console.log(chute.slice(chute.length-100))
console.log('Part One:',chute.length);
let cacheAsArr = Object.values(cache);
let len = 670;
let seventeenthirty = 0;
for (let i=0;i<1730;i++){
  seventeenthirty += cacheAsArr[i % 1730];
}
for (rocks=0;rocks<Math.floor((PT2_ROCK_COUNT-436)/1730);rocks++){
  len += seventeenthirty;
 }
 for(let q=0;q<(PT2_ROCK_COUNT-436)%1730;q++){
  len += cacheAsArr[(q+7+218)%1730];
 }
 if (len > 1222656) len += 3;
console.log('Part Two',len)

function compute(){
  shapeParts = currentShape();
  shapePosition = shapeParts.map(part => part.val);
  shapeFns = shapeParts.map(part => part.fn);
  // pad top for ease of computation
  for (let i=0;i<shapeParts.length;i++){
    chute.push(0);
  }
  hasStopped = false;
  chutePosition = 0;
  while (!hasStopped){
    windDirection = data[turns++%data.length];
    if (windDirection === '<') {moveLeft();}
    else {moveRight();}
    moveDown();
  }
  writeToChute()
}

function writeToChute() {
  for (let i=0;i<shapePosition.length;i++){
    chute[chuteIndexAt(chutePosition + i)] = chute[chuteIndexAt(chutePosition + i)] | shapePosition[i];
  }
}