const fs = require('fs');
const data = fs.readFileSync('input14.txt',{encoding:'utf8'});
const lines = data.trim().split('\n');
const log = (...args)=>console.log(...args);
const rockLines = lines.map(line => line.split(' -> ').map(c => c.split(',')));


//ARBITRARILIY LARGE ARRAY
const matrixOne = new Array(660);
const matrixTwo = new Array(660);

/* part 2 calc floor */let highest = 0;

function rocksInMatrix(grid){
highest = 0;
for (let i=0;i<grid.length;i++){
  grid[i] = [];
  for (let j=0;j<grid.length;j++){
    grid[i].push('.')
  }
}
// using reduce as a means to traverse pairs
rockLines.forEach(line => line.reduce((a,b)=>{
  let tailX = +a[0];
  let tailY = +a[1];
  let headX = +b[0];
  let headY = +b[1];
  // for part 2: calc 'floor'
  if (headY > highest) highest = headY;
  if (tailY > highest) highest = tailY;
  if (tailX === headX){
    const X = tailX;
    if (tailY < headY){
      for (let Y=tailY;Y<=headY;Y++){
        grid[X][Y] = '#';
      }
    } else {
      for (let Y=headY;Y<=tailY;Y++){
        grid[X][Y] = '#';
      }
    }
  } else if (tailY === headY){
    const Y = tailY;
    if (tailX < headX){
      for (let X=tailX;X<=headX;X++){
        grid[X][Y] = '#';
      }
    } else {
      for (let X=headX;X<=tailX;X++){
        grid[X][Y] = '#';
      }
    }
  }
  return b;
}));

}
rocksInMatrix(matrixOne);
// for part 2
rocksInMatrix(matrixTwo);
for (let i=0;i<matrixTwo.length;i++){
  matrixTwo[i][highest+2] = '#';
 }
const isSand = (grid,x,y) => grid[x][y] === '.';
let count = 0;
let X = 500, Y = 0;
// for (let i=0;i<100;i++){
//   console.log(grid[500][i])
// }
loop:
  while (matrixOne[500][0] === '.'){
    while (matrixOne[X][Y] === '.'){
      if (Y >= 153) console.log(X,Y);
      if (isSand(matrixOne,X,Y+1)){Y=Y+1;continue;}
      if (isSand(matrixOne,X-1,Y+1)){X=X-1;Y=Y+1;continue;}
      if (isSand(matrixOne,X+1,Y+1)){X=X+1;Y=Y+1;continue;}
      matrixOne[X][Y] = 'o';
      if (Y >= 200){console.log("ABYSS!"); break loop}
      count++;
    }
    X = 500;
    Y = 0;
}
console.log("part one:",count);

count = 0;
// part 2
loop2:
while (matrixTwo[500][0] === '.') {
  while (matrixTwo[X][Y] === '.'){
    if (isSand(matrixTwo,X,Y+1)){Y=Y+1;continue;}
    if (isSand(matrixTwo,X-1,Y+1)){X=X-1;Y=Y+1;continue;}
    if (isSand(matrixTwo,X+1,Y+1)){X=X+1;Y=Y+1;continue;}
    matrixTwo[X][Y] = 'o';
    if (Y === 0) break loop2;
    count++;
  }
  X = 500;
  Y = 0;
};
console.log("part two",count);