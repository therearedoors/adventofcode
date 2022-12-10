const fs = require('fs')

const data = () => fs.readFileSync('input9.txt',{encoding: 'utf8'});
const lines = () => data().trim().split('\n');

let tailPath = [];

function computeMove(rope,moveMethod,moveCount) {
    for (let i = 0; i < moveCount; i++) {
        rope.head[moveMethod](1);
        let pointer = rope.head;
        while (pointer.tail !== null) {
            pointer = pointer.tail;
            pointer.computePhysics();
        }
        if (tailPath.filter(tuple => tuple[0] === pointer.x && tuple[1] === pointer.y).length === 0) {
            tailPath.push([pointer.x, pointer.y])
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

    computeInstructions(lines){
        for (let i=0;i<lines.length;i++){
            const direction = lines[i][0];
            const moveCount = parseInt(lines[i].slice(2));
            switch (direction){
                case 'U': computeMove(this,'moveUp',moveCount);
                    break;
                case 'D': computeMove(this,'moveDown',moveCount);
                    break;
                case 'L': computeMove(this,'moveLeft',moveCount);
                    break;
                case 'R': computeMove(this,'moveRight',moveCount);
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

    moveUp = n =>  this.y += n;
    moveDown = n =>  this.y -= n;
    moveLeft = n => this.x -= n;
    moveRight = n => this.x += n;

    isHorizontallyParallel = () => this.y === this.head.y;
    isVerticaLlyParallel = () => this.x === this.head.x;

    isLeftFromHeadBy = p => this.x + p === this.head.x;
    isLeftFromHead = () => this.x < this.head.x;
    isRightFromHeadBy = p => this.x - p === this.head.x;
    isRightFromHead = () => this.x > this.head.x;
    isUpFromHeadBy = p => this.y - p === this.head.y;
    isUpFromHead = () => this.y > this.head.y;
    isDownFromHeadBy = p => this.y + p === this.head.y;
    isDownFromHead = () => this.y < this.head.y;

    computePhysics() {
        if (this.isHorizontallyParallel()){
            if (this.isUpFromHeadBy(2)) return ++this.y;
            if (this.isDownFromHeadBy(2)) return --this.y;
        }
        if (this.isVerticaLlyParallel()){
            if (this.isLeftFromHeadBy(2)) return ++this.x;
            if (this.isRightFromHeadBy(2)) return --this.x;
        }
        if (this.isUpFromHeadBy(2)){
            this.y -= 1;
            if (this.isLeftFromHead()) return ++this.x;
            if (this.isRightFromHead()) return --this.x;
        }
        if (this.isDownFromHeadBy(2)){
            this.y += 1;
            if (this.isLeftFromHead()) return ++this.x;
            if (this.isRightFromHead()) return --this.x;
        }
        if (this.isLeftFromHeadBy(2)){
            this.x += 1;
            if (this.isDownFromHead()) return ++this.y;
            if (this.isUpFromHead()) return this.y --;
        }
        if (this.isRightFromHeadBy(2)){
            this.x -= 1;
            if (this.isDownFromHead()) return ++this.y;
            if (this.isUpFromHead()) return --this.y;
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
