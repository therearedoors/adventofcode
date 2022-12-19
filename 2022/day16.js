const fs = require('fs');
const data = fs.readFileSync('input16.txt',{encoding:'utf8'})
const lines = data => data.trim().split('\n');
const valveRegex = /[A-Z]{2}|\d+/g;
const valveSets = lines(data).map(line => line.match(valveRegex));

// adapted from hyper-neutrino

const valves = {}
const paths = valveSets.map(valveSet => {
    const localPaths = []
    const location = valveSet[0];
    valves[location] = {paths: valveSet.slice(2),flow: +valveSet[1], open: false};
    for (const valve of valveSet.slice(2)){
        if (valves[valve]) continue;
        localPaths.push(`${location}-${valve}`)
    }
    return localPaths
}).flat();

const flows = {}
const tunnels = {}
Object.entries(valves).forEach(valve => {
  flows[valve[0]] = valve[1].flow
  tunnels[valve[0]] = valve[1].paths
})
const dists = {}
const nonEmpty = [];

for (const valve in flows){
  if (valve !== 'AA' && !flows[valve]) continue;

  if (valve !== 'AA') nonEmpty.push(valve);

  distances[valve] = {[valve]: 0, 'AA': 0}
  let visited = {valve}
  let queue = [[0,valve]]
  while (queue.length > 0){
    let [distance, position] = queue.shift();
    for (const neighbour of tunnels[position]){
      if (neighbour in visited) continue;
      visited[neighbour] = true;
      if (flows[neighbour]){
        dists[valve][neighbour] = distance + 1;
      }
      queue.push([distance + 1, neighbour])
    }
  }
  delete dists[valve][valve]
  if (valve !== 'AA') delete dists[valve].AA
}

const indices = {}

for (let i=0;i<nonEmpty.length;i++){
  const element = nonEmpty[i]
  indices[element] = i;
}

class Tracker {
  constructor(
    ZE,LG,UE,OF,WV,IV,QB,SB,VK,MB,AQ,DC,TL,XK,QR){
    this.ZE = ZE
    this.LG = LG
    this.UE = UE
    this.OF = OF
    this.WV = WV
    this.IV = IV
    this.QB = QB
    this.SB = SB
    this.VK = VK
    this.MB = MB
    this.AQ = AQ
    this.DC = DC
    this.TL = TL
    this.XK = XK
    this.QR = QR
    this.permutationCount = 0;
  }
  toggle(valve){
    this[valve] = true;
  }
  clone(){
    return new Tracker(
      this.ZE,
      this.LG,
      this.UE,
      this.OF,
      this.WV,
      this.IV,
      this.QB,
      this.SB,
      this.VK,
      this.MB,
      this.AQ,
      this.DC,
      this.TL,
      this.XK,
      this.QR
    )
 }
 stamp(){
  return Object.keys(this).filter(key => this[key])
 }
 permutation(){
  const permutedKeys = []
  for (const key of Object.keys(this)){
    if (this[key]) permutedKeys.push(false);
    else permutedKeys.push(true);
  }
  return new Tracker(...permutedKeys);
 }
 static getTracker(bitmask){
  const newKeys = []
  for (const key in indices){
    const bit = 1 << indices[key];
    if (bitmask & bit) newKeys.push(true);
    else newKeys.push(false);
  }
  return new Tracker(...newKeys);
 }
}

const TRACKER = new Tracker(
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  )

const cache = {};
let count = 0;
function depthFirstSearch(time,valve,tracker){
  if (''+time+','+valve+','+tracker.stamp() in cache) return cache[''+time+','+valve+','+tracker.stamp()];
  let maxVal = 0;
  for (const neighbour in distances[valve]){
    if (tracker[neighbour]) continue;
    let timeRemaining = time - distances[valve][neighbour] - 1;
    if (timeRemaining <= 0) continue;
    const nextTracker = tracker.clone();
    nextTracker.toggle(neighbour)
    maxVal = Math.max(maxVal, depthFirstSearch(timeRemaining, neighbour,nextTracker) + (flows[neighbour] * timeRemaining));
  }
  cache[''+time+','+valve+','+tracker.stamp()] = maxVal
  return maxVal;
}

// part one
console.log(dfs(30,'AA',new Tracker(
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  )))

//part two (slow! ~ 60 seconds)
const b = (1 << nonEmpty.length) - 1;
let max = 0;
let nextTracker;
for (let i=0;i<Math.floor((b+1)/2);i++){
  nextTracker = Tracker.getTracker(i);
  max = Math.max(max,dfs(26,'AA',nextTracker) + dfs(26,'AA',nextTracker.permutation()))
}
console.log(max)