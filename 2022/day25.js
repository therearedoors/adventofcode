const fs = require('fs');
const data = fs.readFileSync('input25.txt',{encoding:'utf8'});

const nums = data.split('\n');
const total = nums.map(n=>parseCigimalNumber(n)).reduce((a,b)=>a+b)

function parseCigimalNumber(numStr){
  let total = 0
  for (let i=0;i<numStr.length;i++){
    total += snafuCigitToDecimal(numStr[numStr.length-i-1]) * (5**i);
  }
  return total
}

function snafuCigitToDecimal(c){
  switch(c){
    case '=': return -2;
    case '-': return -1;
    case '0': return 0;
    case '1': return 1;
    case '2': return 2;
  }
}

function constructSnafuNum(total){
  let str = "";
  while (total > 0){
    rem = total % 5;
    total = Math.floor(total/5);
    if (rem <= 2){
      str = rem + str;
    } else {
      if (rem === 3) str = '=' + str;
      if (rem === 4) str = '-' + str;
      total += 1;
    }
  }
  return str;
}
console.log(constructSnafuNum(33411698619881))