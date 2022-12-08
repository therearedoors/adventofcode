const fs = require('fs')

const data = () => fs.readFileSync('input8.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');
const log = (...args) => console.log(...args);
const sum = arr => arr.reduce((a,b)=>a+ +b);
const testRaw = `30373
25512
65332
33549
35390`.trim().split('\n')
let testMatrix = testRaw.map(line => line.split('').map(n => +n))
let matrix = lines().map(line => line.split('').map(n => +n))

const counted = matrix.map(row => row.map(value => false));
const visibleMap = matrix.map(row => row.map(value => false));

log(matrix.length,matrix[0].length)

function visibleTress(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        visibleMap[i][0] = true;
        traverseNode(0, i, 's', 0,1);
    }
    for (let i = 0; i < matrix.length; i++) {
        visibleMap[i][matrix.length-1] = true;
        traverseNode(matrix.length - 1, i, 'n', 0,1);
    }
    for (let i = 0; i < matrix.length; i++) {
        visibleMap[0][i] = true;
        traverseNode(i, 0, 'w', 0,1);
    }
    for (let i = 0; i < matrix.length; i++) {
        visibleMap[matrix.length-1][i] = true;
        traverseNode(i, matrix.length - 1, 'e', 0,1);
    }
}

function incrementCoords(i,j,direction){
    let ii, jj;
    if (direction === 'n') { ii = i - 1; jj = j}
    if (direction === 's') { ii = i + 1; jj = j}
    if (direction === 'w') { ii = i; jj = j + 1}
    if (direction === 'e') { ii = i; jj = j - 1}
    return [ii, jj];
}

function traverseNode(i,j,direction,currentTraversalHeight,currentVisible){
    currentTraversalHeight = Math.max(currentTraversalHeight,matrix[i][j]);
    if (currentTraversalHeight === 9) return currentVisible;
    let [ii, jj] = incrementCoords(i,j,direction);
    if (!validate(ii,jj)) return currentVisible;
    if (!counted[ii][jj]) {
        if (currentTraversalHeight < matrix[ii][jj]) {
            counted[ii][jj] = true;
            visibleMap[ii][jj] = true;
            currentVisible += 1;
        }
    }
    return traverseNode(ii,jj,direction,Math.max(matrix[ii][jj],currentTraversalHeight),currentVisible)
}

visibleTress(matrix)

function validate(i,j){
    return  (i >= 0 && i < matrix.length) && (j >= 0 && j < matrix.length)
}

let total = 0;
visibleMap.forEach(row => total += sum(row))
log(total)
