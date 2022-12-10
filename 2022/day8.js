const fs = require('fs')

const data = () => fs.readFileSync('input8.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');
const log = (...args) => console.log(...args);
const sum = arr => arr.reduce((a,b)=>a+ +b);

let matrix = lines().map(line => line.split('').map(n => +n))

const counted = matrix.map(row => row.map(value => false));
const visibleMap = matrix.map(row => row.map(value => false));
const scenicScores = []

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
        traverseNode(i, 0, 'e', 0,1);
    }
    for (let i = 0; i < matrix.length; i++) {
        visibleMap[matrix.length-1][i] = true;
        traverseNode(i, matrix.length - 1, 'w', 0,1);
    }
}

function incrementCoords(i,j,direction){
    let ii, jj;
    if (direction === 'n') { ii = i - 1; jj = j}
    if (direction === 's') { ii = i + 1; jj = j}
    if (direction === 'w') { ii = i; jj = j - 1}
    if (direction === 'e') { ii = i; jj = j + 1}
    return [ii, jj];
}

function partTwoTraversal(){
    for (let i=0;i<matrix.length;i++){
        for (let j=0;j<matrix.length;j++){
            const south = traverseBack(i, j, 's', matrix[i][j],0,0, true);
            const north = traverseBack(i, j, 'n', matrix[i][j],0, 0,true);
            const east = traverseBack(i, j, 'e', matrix[i][j],0, 0,true);
            const west = traverseBack(i, j, 'w', matrix[i][j],0,0,true);
            const scenicScore = south * north * west * east;
            scenicScores.push(scenicScore);
        }
    }
}

function traverseBack(i,j,direction,startingTraversalHeight,currentTraversalHeight,currentVisible,isFirstTraversal){
    let [ii, jj] = incrementCoords(i,j,direction);
    if (!validate(ii,jj)) return currentVisible;
    if (startingTraversalHeight <= matrix[ii][jj]){
        currentVisible += 1;
        return currentVisible;
    }
    if (startingTraversalHeight > matrix[ii][jj]){
        currentVisible += 1;
        currentTraversalHeight = matrix[ii][jj];
    }
    if (isFirstTraversal) currentTraversalHeight = Math.min(currentTraversalHeight,matrix[ii][jj]);
    return traverseBack(ii,jj,direction,startingTraversalHeight,currentTraversalHeight,currentVisible,false)
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
    return traverseNode(ii,jj,direction,currentTraversalHeight,currentVisible)
}

visibleTress(matrix)

function validate(i,j){
    return  (i >= 0 && i < matrix.length) && (j >= 0 && j < matrix.length)
}

let partOneTotal = 0;
visibleMap.forEach(row => partOneTotal += sum(row))
//part one
log(partOneTotal)
partTwoTraversal()
scenicScores.sort((a,b)=>b-a)
//part two
log(scenicScores[0])

