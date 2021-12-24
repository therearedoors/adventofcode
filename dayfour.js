const fs = require('fs');
fs.readFile('inputfour.txt', (err, data) => {
    if (err){
        throw err;
    }

    let winningBoards = 0
let currentCall = 100
const raw = data + ""

const boardData = raw.split("\n\n")

class Board {
    constructor(_board){
        this.numbers = _board
        this.marks = []
        this.hasWon = false
    }
markScore() {
    for (let i=0;i<5;i++){
        if (this.numbers[i].includes(currentCall)) {
        this.marks.push(currentCall)
        }
    }
}
calcScore() {
    let arr = this.numbers.flat().filter(num => this.marks.includes(num) === false)
    let score = 0
    for (let i=0;i<arr.length;i++){
        score += arr[i]
    }
    return console.log(score*currentCall)
}

Wins() {
    for (let x=0;x<5;x++){
        let bingoColumn = 0
        for (let y=0; y<this.numbers.length; y++){
            if (this.marks.includes(this.numbers[y][x])){
                bingoColumn++
            }
            if (bingoColumn === 5){
                return true
            }
        }
    }
    for (let y=0; y<this.numbers.length; y++) {
        let bingoRow = 0
        for (let x=0;x<5;x++){
            if (this.marks.includes(this.numbers[y][x])){
                bingoRow++
            }
            if (bingoRow === 5) {
                return true
            }
        }
    }   return false 
} 
}

const calls = boardData.shift().split(',').map (str => parseInt(str))
const boards = boardData.map(data => {
      let board = data.split("\n").map(row => {
        let stringRow = row.replace(/  /g, ' ').trim()
            return stringRow.split(' ').map (str => parseInt(str))
    })
    return new Board(board)
})

function callBingoPlayer (arr) {
    for (call of arr){
        currentCall = call;
        for (board of boards){
            board.markScore()
            if (board.Wins()){
            return board.calcScore()
            }
        }    
    } return console.log("Nothing found")
}

function callBingoSquid (arr) {
    for (let i = 0; i<arr.length;i++){
        currentCall = arr[i];
        for (board of boards){
            board.markScore()
            if (board.Wins() && board.hasWon === false){
                winningBoards++
                board.hasWon = true
            }
            if (winningBoards === 100) {
                return board.calcScore()
            }
        }
    }    
    return console.log("Nothing found")
}
function resetGame(){
    for (board of boards){
        board.hasWon = false
        for (length of board.marks){
        board.marks.pop()
        }
    }
}

callBingoPlayer(calls)
resetGame()
callBingoSquid(calls)

})
