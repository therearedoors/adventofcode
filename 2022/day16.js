"use strict"
const fs = require('fs')
const data = fs.readFileSync('input16.txt',{encoding: 'utf8'});
// const data = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II`
const lines = data => data.trim().split('\n');
const log = (...args) => console.log(...args);
const valveRegex = /[A-Z]{2}|\d+/g;
const valveSets = lines(data).map(line => line.match(valveRegex));

const valves = {}
const paths = valveSets.map(valveSet => {
    const localPaths = []
    const location = valveSet[0];
    valves[location] = {flow: +valveSet[1], open: false};
    for (const valve of valveSet.slice(2)){
        if (valves[valve]) continue;
        localPaths.push(`${location}-${valve}`)
    }
    return localPaths
}).flat();


function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(paths);
log(Object.entries(roadGraph))
log(valves)

function cloneValves(valves){
    return JSON.parse(JSON.stringify(valves))
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

class CaveState {
    constructor(location ='AA', valves, turn=1,pressure=[]) {
        this.location = location;
        this.valves = valves;
        this.turn = turn
        this.pressure = pressure
    }

    randomMove() {
        const possibleRoads = roadGraph[this.location]
        const rand = randomPick(possibleRoads);
        return new CaveState(roadGraph[rand],this.valves,this.turn+1,this.pressure)
    }

    move(destination) {
        if (!roadGraph[this.location].includes(destination)) {
            return this;
        } else {
            return new CaveState(destination, this.valves, this.turn+1,this.pressure);
        }
    }

    openValve(){
        const currentValve = this.valves[this.location]
        currentValve.open = true;
        this.pressure.push(currentValve.flow * (30 - this.turn))
        return new CaveState(this.location,this.valves,this.turn+1,this.pressure)
    }
}


function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}


function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

const lengthFromOrigin = (path,origin='AA',pressure=0,turn=30) => {
    const route = findRoute(roadGraph,origin,path);
    const length = route.length;
    const flow = valves[path].flow
    const turnsRemaining = turn-length-1;
    pressure += flow * turnsRemaining
    return {length,flow,pressure,turnsRemaining}
}

function takeRoute(paths){
    let memory = lengthFromOrigin(paths[1],paths[0]);
    for (let i=1;i<paths.length-1;i++){
        const origin = paths[i];
        const path = paths[i+1];
        memory = lengthFromOrigin(path,origin,memory.pressure,memory.turnsRemaining);
    }
    return memory
}

const flows = Object.entries(valves).sort((a,b)=> b[1].flow - a[1].flow).filter(entry=>entry[1].flow > 0)
log(flows.map(f => f[0]))


// log('WV',lengthFromOrigin('WV'))
// log('IV',lengthFromOrigin('IV'))
// log('VK',lengthFromOrigin('VK'))
// log('QR',lengthFromOrigin('QR'))
// log('AQ',lengthFromOrigin('AQ'))
// log('SB',lengthFromOrigin('SB'))
// log('MB',lengthFromOrigin('MB'))
// log('TL',lengthFromOrigin('TL'))
// log('XK',lengthFromOrigin('XK'))
// log('QB',lengthFromOrigin('QB'))
// log('UE',lengthFromOrigin('UE'))
// log('DC',lengthFromOrigin('DC'))
// log('ZE',lengthFromOrigin('ZE'))
// log('OF',lengthFromOrigin('OF'))
// log('LG',lengthFromOrigin('LG'))

log('VK',lengthFromOrigin('VK','WV',1536,12))
log('AQ',lengthFromOrigin('AQ','WV',1536,12))
log('SB',lengthFromOrigin('SB','WV',1536,12))
log('MB',lengthFromOrigin('MB','WV',1536,12))
log('TL',lengthFromOrigin('TL','WV',1536,12))
log('XK',lengthFromOrigin('XK','WV',1536,12))
log('UE',lengthFromOrigin('UE','WV',1536,12))
log('DC',lengthFromOrigin('DC','WV',1536,12))
log('ZE',lengthFromOrigin('ZE','WV',1536,12))
log('OF',lengthFromOrigin('OF','WV',1536,12))
log('LG',lengthFromOrigin('LG','WV',1536,12))




//'WVl,1014,18V-IV',lengthFromOrigin('IV','WV',600,24))
// log('AA-WV-QR',lengthFromOrigin('QR','WV',600,24))
// log('AA-MB-QB',lengthFromOrigin('QB','MB',459,27))

// log('AA-IV-WV',lengthFromOrigin('WV','IV',575,25))
// log('AA-IV-QR',lengthFromOrigin('QR','IV',575,25))
// log('AA-IV-WV-QR',lengthFromOrigin('QR','WV',1050,19))
// log('AA-IV-QR-WV',lengthFromOrigin('WV','QR',1103,22))
// log('AA-IV-WV-QR-AQ',lengthFromOrigin('AQ','QR',1314,11))
// log('AA-IV-QR-WV-AQ',lengthFromOrigin('AQ','WV',1453,14))


// log('AA-IV-QR-WV-SB',lengthFromOrigin('SB','WV',1453,14))
// log('AA-IV-QR-WV-MB',lengthFromOrigin('MB','WV',1453,14))

// log('AA-IV-QR-WV-MB-QB',lengthFromOrigin('QB','MB',1572,7))

// //BEST log('AA-IV-QR',lFO('QR','IV',575,25))
//log('route:AA,QR,IV',takeRoute(['AA','IV','QR','WV']))



log('route:',takeRoute(['AA','VK','SB','QB']))
//'IV','WV','XK','DC','QR','QB',,
