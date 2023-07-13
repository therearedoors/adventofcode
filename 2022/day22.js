const fs = require('fs');
const data = fs.readFileSync('input22.txt',{encoding:'utf8'});
const lines = data.split('\n');

console.log(lines)