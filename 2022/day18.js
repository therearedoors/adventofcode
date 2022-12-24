const fs = require('fs');
const data = fs.readFileSync('input18.txt',{encoding:'utf8'});

// lazy hard coding
const highest = 23;

class Cube {
  constructor(x,y,z){
    this.X = x,
    this.Y = y,
    this.Z = z,
    this.area = 0;
    this.isAir = false;
    this.isFilled = false;
  }
}

//part one
const points = data.trim().split('\n').map(coords => {
  const s = coords.split(',')
  // shift everything along one place to avoid JS out of bound errors in 0 case;
  return new Cube(+s[0]+1,+s[1]+1,+s[2]+1)
});
const matrix3D = [];

for (let i=0;i<=highest;i++){
  matrix3D.push([]);
  for (let j=0;j<=highest;j++){
    matrix3D[i].push([])
    for (let k=0;k<=highest;k++){
      matrix3D[i][j].push(new Cube(i,j,k))
    }
  }
}

points.forEach(p=>{
  matrix3D[p.X][p.Y][p.Z].area = 6;
  matrix3D[p.X][p.Y][p.Z].isFilled = true;
})

const isTouchedNorth = pt => pt.Y < highest && matrix3D[pt.X][pt.Y+1][pt.Z].isFilled;
const isTouchedSouth = pt => pt.Y > 0 && matrix3D[pt.X][pt.Y-1][pt.Z].isFilled;
const isTouchedWest = pt => pt.X > 0 && matrix3D[pt.X-1][pt.Y][pt.Z].isFilled;
const isTouchedEast = pt => pt.X < highest && matrix3D[pt.X+1][pt.Y][pt.Z].isFilled;
const isTouchedForward = pt => pt.Z < highest && matrix3D[pt.X][pt.Y][pt.Z+1].isFilled;
const isTouchedBack = pt => pt.Z > 0 && matrix3D[pt.X][pt.Y][pt.Z-1].isFilled;

for (let i=0;i<=highest;i++){
  for (let j=0;j<=highest;j++){
    for (let k=0;k<=highest;k++){
      let cube = matrix3D[i][j][k];
      if (cube.isFilled){
      if (isTouchedNorth(cube)) cube.area--;
      if (isTouchedSouth(cube)) cube.area--
      if (isTouchedWest(cube)) cube.area--
      if (isTouchedEast(cube)) cube.area--
      if (isTouchedForward(cube)) cube.area--
      if (isTouchedBack(cube)) cube.area--
      }
    }
  }
}

 let total = 0;
for (let i=0;i<=highest;i++){
  for (let j=0;j<=highest;j++){
    for (let k=0;k<=highest;k++){
      let cube = matrix3D[i][j][k];
      total += cube.area;
    }
  }
}

 console.log(total);

/*part two => initial plan of looking for 'air pockets' worked
* for test data but not for input
* the air pockets can be 'large' and so some sort of matrix/graph traversal
* makes the most sense
* Since the 'outer surface' area is the goal however, it does make most sense,
* is likely most efficient - to limn the outer surface, allowing us to ignore air pockets
* The other way - use part 1 total surface area and substract 'inner' surface area
* will require detecting muliple air pockets. Counting air pockets might be a good part three!
* Intuitively it probably requires still finding the 'outside', since detecting what counts as
* 'inside' is otherwise tricky (checking partial contact with filled areas will find both inside
* and out)
*/
let partTwoSurfaceArea = 0;
function incrementSurfaceArea(cube){
  if (isTouchedNorth(cube)) partTwoSurfaceArea++;
  if (isTouchedSouth(cube)) partTwoSurfaceArea++
  if (isTouchedWest(cube)) partTwoSurfaceArea++
  if (isTouchedEast(cube)) partTwoSurfaceArea++
  if (isTouchedForward(cube)) partTwoSurfaceArea++
  if (isTouchedBack(cube)) partTwoSurfaceArea++
}

// more hard coding of min/max
let MIN = 0;
let MAX = 23;
let next;
let visited={}
const queue = [matrix3D[0][0][0]]
while (queue.length > 0){
  next = queue.shift();
  if (next.X < MIN || next.X > MAX) continue;
  if (next.Y < MIN || next.Y > MAX) continue;
  if (next.Z < MIN || next.Z > MAX) continue;
  if (next.isFilled) continue;
  if (visited[`${next.X},${next.Y},${next.Z}`]) continue;
  visited[`${next.X},${next.Y},${next.Z}`] = true;
  incrementSurfaceArea(next)
  if (next.X > MIN) queue.push(matrix3D[next.X-1][next.Y][next.Z])
  if (next.X < MAX) queue.push(matrix3D[next.X+1][next.Y][next.Z])
  if (next.Y > MIN) queue.push(matrix3D[next.X][next.Y-1][next.Z])
  if (next.Y < MAX) queue.push(matrix3D[next.X][next.Y+1][next.Z])
  if (next.Z > MIN) queue.push(matrix3D[next.X][next.Y][next.Z-1])
  if (next.Z < MAX) queue.push(matrix3D[next.X][next.Y][next.Z+1])
}

console.log(partTwoSurfaceArea)
