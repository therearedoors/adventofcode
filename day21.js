class Dice {
  constructor(num) {
    this.value = num
    this.timesRolled = 0
    this.currentRoll = 0
  }
  roll(){
    let roll = 0
    for (let i=0;i<3;i++){
      if (this.value===101){
        this.value = 1
        }
    this.timesRolled++
    roll += this.value
    this.value++
    if (this.value===101){
      this.value = 1
      }
    }
    this.currentRoll = roll
    return roll
  } 
}

const die = new Dice(1)

class Player {
  constructor(num) {
    this.position = num
    this.score = 0
  }
  move(){
    die.roll()
    for (let i=0;i<die.currentRoll;i++){
      if (this.position === 11){
        this.position = 1
        }
      this.position++
    if (this.position === 11){
      this.position = 1
      }
    } 
    this.positionRecord.push(this.position)
    return this.position
  }
  takeTurn(){
      this.score += this.move()
    }
}
let one = new Player(7)
let two = new Player(2)

function playGame() {
    while (one.score<1000 && two.score<1000){
      if (one.score<1000 && two.score<1000){
      one.takeTurn()}
        if (one.score<1000 && two.score<1000){
        two.takeTurn()
        } else break;
      } 
    console.log(one.score*die.timesRolled)
    console.log(two.score*die.timesRolled)
  }
  
playGame()
