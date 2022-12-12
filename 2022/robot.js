"use strict"
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

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

  const roadGraph = buildGraph(roads);


class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place == address);
            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels);
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

  let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"},{place:"Bob's House", address: "Cabin"}]
  );
  let next = first.move("Alice's House");

  console.log(next.place);
  // → Alice's House
  console.log(next.parcels);
  // → []
  console.log(first.place);
  // → Post Office
  let third = next.move("Bob's House")

  console.log(third.parcels)
  console.log(third.place)

  let fourth = third.move("Town Hall")

  console.log(fourth.parcels)

  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        //console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      //console.log(`Moved to ${action.direction}`);
    }
    return state
  }

  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }

  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }

runRobot(VillageState.random(), randomRobot);

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }

  console.log(runRobot(VillageState.random(),routeRobot,[]))

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}
  function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        if (parcels.some(parcel => parcel.place != place)){
        const routes = []
        parcels.forEach(parcel => {
            if (parcel.place != place){
                routes.push(findRoute(roadGraph,place,parcel.place))
            }
        })
        route = routes.reduce((shortest,current)=>current.length<shortest.length?current:shortest,Array.from({length:10000}))
        console.log(route)
      } else {
          const routes = []
          parcels.forEach(parcel => {
                  routes.push(findRoute(roadGraph,place,parcel.address))
              })
        route = routes.reduce((shortest,current)=>current.length<shortest.length?current:shortest,Array.from({length:10000}));
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }

  function compareRobots(robot1,robot2){
    const villages = []
    for (let i=0;i<100;i++){
        let randomVillage
        do {
        randomVillage = VillageState.random()
      } while (villages.some(village => {
          randomVillage.parcels.every(parcel => village.parcels.includes(parcelToCompare => parcelToCompare.place === parcel.place && parcelToCompare.address === parcel.address)
          )
      })
    )
    villages.push(randomVillage)
    }

    function getAverage (villages,robot){
        let robotCount = 0
        for (const village of villages){
            let currentVillage = village
            let memory = []
            for (let turn=0;;turn++){
                if (currentVillage.parcels.length == 0){
                    robotCount += turn
                    break;
                }
                let action = robot(currentVillage,memory);
                currentVillage = currentVillage.move(action.direction)
                memory = action.memory
            }
        }
        robotCount /= 100
        return robotCount
    }
    return {robot1: getAverage(villages,robot1),
            robot2: getAverage(villages,robot2)}
  }

  function lazyRobot({place, parcels}, route) {
    if (route.length == 0) {
      // Describe a route for every parcel
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {route: findRoute(roadGraph, place, parcel.place),
                  pickUp: true};
        } else {
          return {route: findRoute(roadGraph, place, parcel.address),
                  pickUp: false};
        }
      });

      // This determines the precedence a route gets when choosing.
      // Route length counts negatively, routes that pick up a package
      // get a small bonus.
      function score({route, pickUp}) {
        return (pickUp ? 0.5 : 0) - route.length;
      }
      route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }

    return {direction: route[0], memory: route.slice(1)};
  }

  console.log(compareRobots(lazyRobot,goalOrientedRobot));
