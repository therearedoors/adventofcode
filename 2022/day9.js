const fs = require('fs')

const data = () => fs.readFileSync('input9.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');

let tailPath = [];

function computeMove(head,moveMethod,moveCount) {
    for (let i = 0; i < moveCount; i++) {
        head[moveMethod](1)
        let propagator = head
        do {
            propagator = propagator.tail
            propagator.computePhysics()

        } while (propagator.tail !== null) ;
        if (tailPath.filter(tuple => tuple[0] === propagator.x && tuple[1] === propagator.y).length === 0) {
            tailPath.push([propagator.x, propagator.y])
        }
    }
}

class Rope {
    constructor(length) {
        this.head = new RopeKnot();
        this.tail = new RopeKnot();
        this.head.tail = this.tail;
        this.tail.head = this.head;
        for (let i=1;i<length;i++){
            this.push(i);
        }
    }

    push(i) {
        const previous = this.tail.head;
        const current = new RopeKnot(previous, this.tail,i)
        previous.tail = current
        this.tail.head = current
    }

    unshift() {
        const next = this.head.tail
        const current = new RopeKnot(this.head, next)
        next.head = current
        this.head.tail = current
    }

    computeInstructions(lines){
        for (let i=0;i<lines.length;i++){
            const direction = lines[i][0];
            const moveCount = parseInt(lines[i].slice(2));
            switch (direction){
                case 'U': computeMove(this.head,'moveUp',moveCount);
                    break;
                case 'D': computeMove(this.head,'moveDown',moveCount);
                    break;
                case 'L': computeMove(this.head,'moveLeft',moveCount);
                    break;
                case 'R': computeMove(this.head,'moveRight',moveCount);
                    break;
            }
        }
    }
}

class RopeKnot {
    constructor(head = null, tail = null) {
        this.x = 0;
        this.y = 0;
        this.head = head;
        this.tail = tail;
    }

    moveUp(n){
        this.y += n;
    }

    moveDown(n){
        this.y -= n;
    }

    moveLeft(n){
        this.x -= n;
    }

    moveRight(n){
        this.x += n;
    }

    isInSamePlaceAsHead(){
        return this.isHorizontallyParallelToHead() && this.isVerticaLlyParallelToHead()
    }

    isHorizontallyParallelToHead(){
        return this.y === this.head.y
    }

    isVerticaLlyParallelToHead(){
        return this.x === this.head.x
    }

    isPUnitsLeftOfHead(p){
        return this.x + p === this.head.x
    }

    isPUnitsRightOfHead(p){
        return this.x - p === this.head.x
    }

    isPUnitsUpFromHead(p){
        return this.y - p === this.head.y
    }

    isPUnitsDownFromHead(p){
        return this.y + p === this.head.y
    }

    computePhysics() {
        if (this.isInSamePlaceAsHead()){
          return;
        }
        if (this.isHorizontallyParallelToHead()){
            if (this.isPUnitsUpFromHead(2)){
                this.y += 1;
                return;
            }
            if (this.isPUnitsDownFromHead(2)){
                this.y -= 1;
                return;
            }
        }
        if (this.isVerticaLlyParallelToHead()){
            if (this.isPUnitsLeftOfHead(2)){
                this.x += 1;
                return;
            }
            if (this.isPUnitsRightOfHead(2)){
                this.x -= 1;
                return;
            }
        }
        if (this.isPUnitsUpFromHead(2)){
            this.y -= 1;
            if (this.isPUnitsLeftOfHead(1) || this.isPUnitsLeftOfHead(2)){
                this.x += 1;
                return;
            }
            if (this.isPUnitsRightOfHead(1) || this.isPUnitsRightOfHead(2)){
                this.x -= 1;
                return;
            }
        }
        if (this.isPUnitsDownFromHead(2)){
            this.y += 1;
            if (this.isPUnitsLeftOfHead(1) || this.isPUnitsLeftOfHead(2)){
                this.x += 1;
                return;
            }
            if (this.isPUnitsRightOfHead(1) || this.isPUnitsRightOfHead(2)){
                this.x -= 1;
                return;
            }
        }
        if (this.isPUnitsLeftOfHead(2)){
            this.x += 1;
            if (this.isPUnitsDownFromHead(1) || this.isPUnitsDownFromHead(2)){
                this.y += 1;
                return;
            }
            if (this.isPUnitsUpFromHead(1) || this.isPUnitsUpFromHead(2)){
                this.y -= 1;
                return;
            }
        }
        if (this.isPUnitsRightOfHead(2)){
            this.x -= 1;
            if (this.isPUnitsDownFromHead(1) || this.isPUnitsDownFromHead(2)){
                this.y += 1;
                return;
            }
            if (this.isPUnitsUpFromHead(1) || this.isPUnitsUpFromHead(2)){
                this.y -= 1;
            }
        }
    }
}

const rope2 = new Rope(1);
const rope10 = new Rope(9);
//part 1
rope2.computeInstructions(lines())
console.log(tailPath.length)
// part 2
tailPath = []
rope10.computeInstructions(lines())
console.log(tailPath.length)
