const fs = require('fs');

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
let part1 = 0;
let part2 = 0;
let count = 1;
let firstNode = new Node(0);
let prevNode = firstNode;

let currentNode;

while (count < 100) {
    let nextNode = new Node(count);
        if (count === 50){
        currentNode = nextNode;
    }
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    prevNode = nextNode;
    console.log(`Node ${count} created with value: ${nextNode.value}`);
    count++;
}
prevNode.next = firstNode;
firstNode.prev = prevNode;

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').forEach(line => {
    const direction = line[0];
    const distance = Number(line.slice(1));
    if (direction === 'R') {
        for (let i = 0; i < distance; i++) {
            currentNode = currentNode.next;
            if (currentNode.value === 0) {
                part2++;
            }
        }
        if (currentNode.value === 0) {
            part1++;
        }
    } else if (direction === 'L') {
        for (let i = 0; i < distance; i++) {
            currentNode = currentNode.prev;
            if (currentNode.value === 0) {
                part2++;
            }
        }
        if (currentNode.value === 0) {
            part1++;
        }
    }
});
console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);