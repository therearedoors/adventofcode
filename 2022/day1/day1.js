const fs = require('fs')

const data = () => fs.readFileSync('../input1.txt',{encoding: 'utf8'})
const trimData = () => data().trim();
const lines = () => trimData().split('\n');
const numbers = () => lines().map(n=>+n);

const splitSpace = s => s.split(' ');
const split = s => s.split('');
const filterStr = (s,f) => splitSpace(s).filter(f).join('');
const sum = arr => arr.reduce((a,b)=>a+b);
const product = arr => arr.reduce((a,b)=>a*b);
const log = any => console.log(any);
