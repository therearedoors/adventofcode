const fs = require('fs')

const data = () => fs.readFileSync('../input2.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');

const sum = arr => arr.reduce((a,b)=>a+b);

lines().map(l => l.split(' '));


const SCORES = {
    X: 1,
    Y: 2,
    Z: 3,
}

const move = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
}
const instruction = {
    X: 'lose',
    Y: 'draw',
    Z: 'win'
}

const rock = 1;
const paper = 2;
const scissors = 3;

const games = lines().map(l => l.split(' '))

// part 1

const scores1 = games.map(game => {
    let score = SCORES[game[1]];
    if (move[game[0]] === 'rock') {
        if (move[game[1]] === 'paper') score+=6
        if (move[game[1]] === 'rock') score+=3;
    }
    if (move[game[0]] === 'scissors') {
        if (move[game[1]] === 'scissors') score+=3;
        if (move[game[1]] === 'rock') score +=6;
    }
    if (move[game[0]] === 'paper') {
        if (move[game[1]] === 'paper') score+=3;
        if (move[game[1]] === 'scissors') score+=6;
    }
    return score
});

console.log(sum(scores1))

// part 2
const scores2 = games.map(game => {
    let score = 0;
    if (move[game[0]] === 'rock') {
        if (instruction[game[1]] === 'win') score+=6 + paper;
        else if (instruction[game[1]] === 'draw') score +=3 + rock;
        else score += scissors;
    }
    if (move[game[0]] === 'scissors') {
        if (instruction[game[1]] === 'win') score+= 6 + rock;
        else if (instruction[game[1]] === 'draw') score +=3 + scissors;
        else score += paper;
    }
    if (move[game[0]] === 'paper') {
        if (instruction[game[1]] === 'win') score+= 6 + scissors;
        else if (instruction[game[1]] === 'draw') score +=3 + paper;
        else score += rock;
    }
    return score
});

console.log(sum(scores2))
