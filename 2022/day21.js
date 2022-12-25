const fs = require('fs');
const data = fs.readFileSync('input21.txt',{encoding:'utf8'});
// const data = `root: pppw + sjmn
// dbpl: 5
// cczh: sllz + lgvd
// zczc: 2
// ptdq: humn - dvpt
// dvpt: 3
// lfqf: 4
// humn: 5
// ljgn: 2
// sjmn: drzm * dbpl
// sllz: 4
// pppw: cczh / lfqf
// lgvd: ljgn * ptdq
// drzm: hmdt - zczc
// hmdt: 32`
let subjects = {};

class Subject {
  leftVal;
  rightVal;
  value;
  constructor(left,operator,right){
    this.left = getNewSubject(left);
    this.operator = operator;
    this.right = getNewSubject(right);
    if (typeof(this.left) === 'number' && typeof(this.right) === 'number') this.value = eval(this.left+this.operator+this.right)
  }

  evaluate(){
    if (this.value) return this.value;
    else {
    this.leftVal = typeof(this.left) === 'number' ? this.left : this.left.evaluate();
    this.rightVal = typeof(this.right) === 'number' ? this.right : this.right.evaluate();
    return eval(this.leftVal + this.operator + this.rightVal);
    }
  }

}

function getNewSubject(value){
  //console.log(value)
  value = subjects[value]
  const toNum = parseInt(value);
  if (!isNaN(toNum)) return toNum;
  else {
    //console.log(value)
    const left = value.slice(0,4);
    const operator = value[5]
    const right = value.slice(7)
    return new Subject(left,operator,right);
  }
}

const lines = data.trim().split('\n');
const keyValuePairs = lines.map(line=>line.split(':'));

function binarySearch (fn, x, left, right){
    if (left > right) {
      return false;
    }
    const mid = Math.floor((left+right)/2)
    const res = fn(mid).leftVal;
    if (res === x) {
      return mid
    } else if (x > res){
      return binarySearch(fn, x, left, mid-1)
    } else {
    return binarySearch(fn,x,mid+1,right)
    }
  }
function partOne(){
  subjects = {}
  keyValuePairs.forEach(p=>{
    const toNum = parseInt(p[1]);
      if (isNaN(toNum)) subjects[p[0]] = p[1].slice(1);
      else subjects[p[0]] = toNum;
    });

    subjects['root'] = new Subject('pnhm','+','zvcm');
    return subjects['root'].evaluate();
}

function iterateOnPartTwo(num){
  subjects = {}
  keyValuePairs.forEach(p=>{
    const toNum = parseInt(p[1]);
    if (isNaN(toNum)) subjects[p[0]] = p[1].slice(1);
    else subjects[p[0]] = toNum;
  });
  subjects['humn'] = num
  subjects['root'] = new Subject('pnhm','===','zvcm');
  
  subjects['root'].evaluate();
  return subjects['root']
}
console.log(partOne())
const lVal = iterateOnPartTwo(2500).rightVal
console.log(binarySearch(iterateOnPartTwo,lVal,0,9999999999999))



