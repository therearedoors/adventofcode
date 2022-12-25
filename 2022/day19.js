const fs = require('fs');
const data = fs.readFileSync('input19.txt',{encoding:'utf8'})
const numRegex = /\d+/g
const test = `Blueprint 1:Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
const bluePrintData = data.trim().split('\n').map(line => line.match(numRegex));
//const bluePrintData = test.split('\n').map(line => line.match(numRegex));
const costs = {}
const maxSpends = {}
bluePrintData.forEach(bp => {
  costs[bp[0]] = [
    {0: bp[1]},
    {0: bp[2]},
    {
      0:bp[3],
      1:bp[4]
    },
    {
      0: bp[5],
      2: bp[6]
    }
  ]
  maxSpends[bp[0]] = {
    0:Math.max(bp[1],bp[3],bp[5]),
    1:Math.max(bp[2],bp[4]),
    2:Math.max(bp[6])
  }
})

const sequences = {}
for (const blueprint in costs){
  sequences[blueprint] = {}
}

class RobotFactory {
  constructor(bp,counts,robots){
    this.bp = bp,
    this.counts = counts
    this.robots = robots
  }
  makeOre(){
    this.noop()
  this.counts[0] -= costs[this.bp][0][0];
  this.robots[0] += 1;
  }
  makeClay(){
    this.noop()
    this.counts[0] -= costs[this.bp][1][0];
    this.robots[1] += 1;
  }
  makeObsidian(){
    this.noop()
    this.counts[0] -= costs[this.bp][2][0];
    this.counts[1] -= costs[this.bp][2][1];
    this.robots[2] += 1;
  }
  makeGeode(){
    this.noop()
    this.counts[0] -= costs[this.bp][3][0];
    this.counts[2] -=costs[this.bp][3][2];
    this.robots[3] += 1;
  }
  noop(){
    for (const robot in this.robots){
      this.counts[robot]+=this.robots[robot];
    }
  }
  canMakeOre = () => this.counts[0] - costs[this.bp][0][0] >= 0;
  canMakeClay = () => this.counts[0] - costs[this.bp][1][0] >= 0;
  canMakeObsidian = () => this.counts[0] - costs[this.bp][2][0] >= 0 && this.counts[1] - costs[this.bp][2][1] >= 0;
  canMakeGeode = () => this.counts[0] - costs[this.bp][3][0] >= 0 && this.counts[2] - costs[this.bp][3][2] >= 0;
}
let geodes = {};
function dfs(factory,turns,cache){
  if (turns === 0) {
    return factory.counts[3];
  }
  let max = factory.counts[3] + (factory.robots[3]*turns);
  const key = turns+','+factory.robots+JSON.stringify(factory.counts);
  if (key in cache) return cache[key];
  for (const entry of Object.entries(costs[factory.bp])){
    const botType = entry[0];
    const recipe = entry[1];
    if (botType !== 3 && factory.robots[botType] >= maxSpends[factory.bp][botType]){
      continue;
    }
    let wait = 0;
    let flag = true;
    for (const rType in recipe){
      if (factory.robots[rType] === 0){flag=false;break;}
      wait = Math.max(wait, Math.ceil((recipe[rType] - factory.counts[rType]) / factory.robots[rType]));
    }
    if (flag){
      const remTurns = turns - wait - 1;
      if (remTurns <= 0) continue;
      const bots_ = [...factory.robots];
      const counts_ = factory.counts.map((c,i)=>c+(bots_[i]*(wait+1)));
      for (rType in recipe){
        counts_[rType] -= recipe[rType]
      }
      bots_[botType]+=1;
      for (let i=0;i<3;i++){
        counts_[i] = Math.min(counts_[i],maxSpends[factory.bp][i] * remTurns);
      }
      const nextFactory = new RobotFactory(factory.bp, counts_, bots_)
      max = Math.max(max,dfs(nextFactory,remTurns,cache))
    }
  }
  // const options = ['noop'];
  // if (factory.canMakeGeode() && turns > 1) options.push('makeGeode');
  // if (factory.canMakeObsidian() && turns > 3) options.push('makeObsidian');
  // if (factory.canMakeClay() && turns > 6) options.push('makeClay');
  // if (factory.canMakeOre() && turns > 15) options.push('makeOre');
  // for (const option of options){
  //   const nextCounts = {...factory.counts};
  //   const nextRobots = {...factory.robots};
  //   const nextFactory = new RobotFactory(factory.bp, nextCounts, nextRobots)
  //   nextFactory[option]();
  //   geodes[factory.bp] = Math.max(~~geodes[factory.bp], nextFactory.counts[3]);
  //   //if (turns === 1) console.log(nextFactory,options);
  //   max = Math.max(nextFactory.counts[3], dfs(nextFactory,turns-1,cache))
  cache[key] = max;
  return max;
}
const factories = Object.keys(costs).map(bp => new RobotFactory(bp,[
  0,
  0,
  0,
  0
],[
  1,
  0,
  0,
  0
]));
let total = 0;
//part1
factories.forEach((f,i) => {
  const next = dfs(f,24,{});
  total += (next*(i+1));
  console.log(i+1,total)
});
//part2
console.log(dfs(factories[1],32,{}))
console.log(dfs(factories[0],32,{}))
console.log(dfs(factories[2],32,{}))

/*
//part 2 an 21 * 2 * 
*/