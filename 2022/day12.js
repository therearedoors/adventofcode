const fs = require('fs')

const data = () => fs.readFileSync('input12.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');

let paths = new Set()


const matrix = lines().map(line => line.split(""))


// define possible paths
const newPathEast = (x,y) => [[x,y],[x,wrapY(y+1)]];
const newPathWest = (x,y) => [[x,y],[x,wrapY(y-1)]];
const newPathNorth = (x,y) => [[x,y],[wrapX(x-1),y]];
const newPathSouth = (x,y) => [[x,y],[wrapX(x+1),y]];

// ensuring coords stay within matrix bounds
const wrapY = (n) => {
    if (n < 0) return 0;
    if (n > matrix[0].length-1) return matrix[0].length-1;
    return n
}
const wrapX = (n) => {
    if (n < 0) return 0;
    if (n > matrix.length-1) return matrix.length-1;
    return n
}

// store possible paths
for (let i=0;i<matrix.length;i++){
    for (let j=0;j<matrix[0].length;j++){
        const N = newPathNorth(i,j);
        const S = newPathSouth(i,j);
        const W = newPathWest(i,j);
        const E = newPathEast(i,j);
        if (N) paths.add(N);
        if (S) paths.add(S);
        if (W) paths.add(W);
        if (E) paths.add(E);
    }
}

// build graph
// cf. https://eloquentjavascript.net/07_robot.html
function buildGraph(paths) {
    let graph = Object.create(null);
    function addPath(from, to) {

        if (graph[from] == null) {
            graph[from] = [String(to)];
        } else {
            graph[from].push(String(to));
        }
    }
    for (const [from,to] of paths) {
        const [fromX,fromY] = from;
        const [toX,toY] = to;
        const codePointFrom = matrix[fromX][fromY].codePointAt(0)
        const codePointTo = matrix[toX][toY].codePointAt(0)
        if (isValidPath(codePointFrom,codePointTo)) {
            if (String(from) !== String(to)) addPath(from, to);
        }
    }
    return graph;
}

// convert Set to Array
const pathArr = []
for (const path of paths){
    pathArr.push(path)
}
const graph = buildGraph(pathArr)

// valid paths for the graph
function isValidPath(fr,to){
    if (to===69) return fr === 122;
    if (fr===83 && to <= 98) return true;
    return fr >= to - 1
}

// brute force solution
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        if (graph[at]){
        for (let place of graph[at]) {
            if (place === to) {
                return route.concat(place);
            }
            if (!work.some(w => w.at === place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
        }
    }
}

//PART ONE
const StoE = findRoute(graph,'20,0','20,146')
console.log(StoE.length)


// PART TWO
const pathList = [];

for (let entry in graph){
    const coords = entry.split(',').map(n => +n);
    if (matrix[coords[0]][coords[1]] === 'b'){
        pathList.push(entry);
    }
}

const results = pathList.map(path => findRoute(graph,path,'20,146'))
results.sort((a,b) => a.length - b.length)

// length of route from closest 'b' to E, visually calculating nearest 'a' is then trivial;
console.log(results[0].length)
