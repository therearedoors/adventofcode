const fs = require('fs')

const data = () => fs.readFileSync('input10.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');

class Register {
    constructor(val = 1) {
        this.regVal = val;
        this.cycles = 0;
        this.stateAtCycles = [];
        this.signalStrengths = [];
        this.output = [[],[],[],[],[],[]];
    }

    incCycle(count,val){
        for (let i=0;i<count;i++) {
            this.drawPixelOnCycle();
            this.cycles++;
            this.stateAtCycles.push(this.regVal);
            this.signalStrengths.push([this.cycles,this.regVal * this.cycles,this.regVal]);
        }
        this.regVal += val
    }

    addx(val){
        this.incCycle(2,val)
    }

    noop(){
        this.incCycle(1,0);
    }

    drawPixelOnCycle(){
        const rowNum = Math.floor(this.cycles/40)
        const currentCycle = this.cycles % 40
        if (currentCycle === this.regVal
            ||  currentCycle === this.regVal  - 1
            || currentCycle === this.regVal + 1 ) {
            this.output[rowNum].push('#')
        } else {
            this.output[rowNum].push('.')
        }
    }

    getOutput(){
        this.output.forEach(l => {
            const row = l.join("")
            console.log(row)
        })
    }
}

const numberRegex = /-?\d+/
const register = new Register()

function runInstructions(instructions){
    for (let i=0;i<instructions.length;i++){
        const command = instructions[i].slice(0,4)
        if (command === 'noop') {
            register.noop()
        }
        if (command === 'addx') {
            const number = instructions[i].match(numberRegex)
            register.addx(parseInt(number[0]))
        }
    }
}

runInstructions(lines())

function sumStrengths(){
    let total = 0;
    total += register.signalStrengths[19][1]
    total += register.signalStrengths[59][1]
    total += register.signalStrengths[99][1]
    total += register.signalStrengths[139][1]
    total += register.signalStrengths[179][1]
    total += register.signalStrengths[219][1]
    return total
}

//part One
console.log(sumStrengths())
//part Two
register.getOutput()
