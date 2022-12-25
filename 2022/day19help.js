const test = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
const fs = require("fs");

const input = fs
  .readFileSync("input19.txt", {encoding:"utf8"})
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" ");
    let robotCosts = [];
    // Ore robot
    let type = split[3];
    let resource = split[7].slice(0, -1);
    let amount = parseInt(split[6]);
    let cost = [{ resource, amount }];
    robotCosts.push({ type, cost });
    // Clay robot
    type = split[9];
    resource = split[13].slice(0, -1);
    amount = parseInt(split[12]);
    cost = [{ resource, amount }];
    robotCosts.push({ type, cost });
    // Obsidian robot
    type = split[15];
    let resource1 = split[19];
    let amount1 = parseInt(split[18]);
    let resource2 = split[22].slice(0, -1);
    let amount2 = parseInt(split[21]);
    cost = [
      { resource: resource1, amount: amount1 },
      { resource: resource2, amount: amount2 },
    ];
    robotCosts.push({ type, cost });
    // Geode robot
    type = split[24];
    resource1 = split[28];
    amount1 = parseInt(split[27]);
    resource2 = split[31].slice(0, -1);
    amount2 = parseInt(split[30]);
    cost = [
      { resource: resource1, amount: amount1 },
      { resource: resource2, amount: amount2 },
    ];
    robotCosts.push({ type, cost });

    return robotCosts;
  });

console.time("ExecutionTime");

const canAfford = (cost, ore, clay, obsidian) => {
  let oreCost = cost.find((c) => c.resource === "ore");
  let clayCost = cost.find((c) => c.resource === "clay");
  let obsidianCost = cost.find((c) => c.resource === "obsidian");

  return (
    (oreCost === undefined || oreCost.amount <= ore) &&
    (clayCost === undefined || clayCost.amount <= clay) &&
    (obsidianCost === undefined || obsidianCost.amount <= obsidian)
  );
};

const craftRobot = (
  robotCost,
  oreProduction,
  clayProduction,
  obsidianProduction,
  newTimeLeft
) => {
  let { ore, orePerSecond } = oreProduction;
  let { clay, clayPerSecond } = clayProduction;
  let { obsidian, obsidianPerSecond } = obsidianProduction;

  while (!canAfford(robotCost, ore, clay, obsidian) && newTimeLeft > 0) {
    ore += orePerSecond;
    clay += clayPerSecond;
    obsidian += obsidianPerSecond;
    newTimeLeft--;
  }
  ore += orePerSecond;
  clay += clayPerSecond;
  obsidian += obsidianPerSecond;
  newTimeLeft--;
  for (let cost of robotCost) {
    if (cost.resource === "ore") ore -= cost.amount;

    if (cost.resource === "clay") clay -= cost.amount;
    if (cost.resource === "obsidian") obsidian -= cost.amount;
  }

  return { ore, clay, obsidian, newTimeLeft };
};

const nextOptimalRobot = (
  oreProduction,
  clayProduction,
  obsidianProduction,
  geodeProduction,
  timeLeft,
  blueprint
) => {
  let geodeProduced = 0;
  for (let robot of blueprint) {
    if (robot.type === "ore" && timeLeft < 16) continue;
    if (robot.type === "clay" && timeLeft < 6) continue;
    if (robot.type === "obsidian" && timeLeft < 3) continue;
    if (robot.type === "geode" && timeLeft < 2) continue;
    let { ore, clay, obsidian, newTimeLeft } = craftRobot(
      robot.cost,
      oreProduction,
      clayProduction,
      obsidianProduction,
      timeLeft
    );
    if (newTimeLeft <= 0) {
      continue;
    }

    let newOreProduction = { ...oreProduction };
    let newClayProduction = { ...clayProduction };
    let newObsidianProduction = { ...obsidianProduction };
    let newGeodeProduction = { ...geodeProduction };
    if (robot.type === "ore") newOreProduction.orePerSecond++;
    if (robot.type === "clay") newClayProduction.clayPerSecond++;
    if (robot.type === "obsidian") newObsidianProduction.obsidianPerSecond++;
    if (robot.type === "geode") newGeodeProduction.geodePerSecond++;
    newOreProduction.ore = ore;
    newClayProduction.clay = clay;
    newObsidianProduction.obsidian = obsidian;
    let score = robot.type === "geode" ? newTimeLeft : 0;

    score += nextOptimalRobot(
      newOreProduction,
      newClayProduction,
      newObsidianProduction,
      newGeodeProduction,
      newTimeLeft,
      blueprint
    );

    if (score > geodeProduced) {
      geodeProduced = score;
    }
  }
  return geodeProduced;
};
let qualitySum = 0;
let i = 1;
for (let blueprint of input) {
  let score = nextOptimalRobot(
    { ore: 0, orePerSecond: 1 },
    { clay: 0, clayPerSecond: 0 },
    { obsidian: 0, obsidianPerSecond: 0 },
    { geode: 0, geodePerSecond: 0 },
    24,
    blueprint
  );
  console.log(i,score)
  qualitySum += score * i++;
}
console.log(qualitySum);

console.timeEnd("ExecutionTime");