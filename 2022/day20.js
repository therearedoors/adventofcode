const fs = require('fs');
const data = fs.readFileSync('input20.txt',{encoding:'utf8'});
const original = data.trim().split('\n').map(n=>+n);
class Encoding {
  constructor(val){
    this.val = val
  }
}
const len = original.length - 1;
const encodings = original.map(n => new Encoding(n));
const clone = [...encodings];
function decode(encodings,clone){
for (const encoding of encodings){
  const index = clone.indexOf(encoding);
  clone.splice(index,1);
  let newIndex = index + encoding.val;
      if (newIndex > len-1){
        newIndex = newIndex % len
      }
  if ((newIndex <= 0)){
    newIndex = len - (Math.abs(newIndex) % len)
  }
  clone.splice(newIndex,0,encoding);
}
}
//part1
decode(encodings,clone)
console.log(clone)
const zeroIdx = clone.findIndex(e=>e.val === 0);
const a = clone[(1000+zeroIdx)%original.length].val
const b = clone[(2000+zeroIdx)%original.length].val
const c = clone[(3000+zeroIdx)%original.length].val
console.log(a,b,c,a+b+c)

//part two
const key = 811589153
const pt2encodings = original.map(n => new Encoding(n*key));
const pt2clone = [...pt2encodings];
for (let i=0;i<10;i++) decode(pt2encodings,pt2clone)
const pt2ZeroIdx = pt2clone.findIndex(e=>e.val === 0);
const a2 = pt2clone[(1000+pt2ZeroIdx)%original.length].val
const b2 = pt2clone[(2000+pt2ZeroIdx)%original.length].val
const c2 = pt2clone[(3000+pt2ZeroIdx)%original.length].val
console.log(a2,b2,c2,a2+b2+c2)
