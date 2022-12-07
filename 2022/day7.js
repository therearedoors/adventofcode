const fs = require('fs')

const data = () => fs.readFileSync('input7.txt',{encoding: 'utf8'})
const lines = () => data().trim().split('\n');
const sum = arr => arr.reduce((a,b)=>a+b);

function parseFS(path,fs){
    let currentFile = fs;
    for(const p of path){
        currentFile = currentFile[p];
    }
    return currentFile;
}

function writeFS(next,file){
    file[next] = {}
}

const commands = lines();
const numberRegex = /\d+/
const cdRegex = /cd [^\.\s]+/
let fileSystem = {'/':{}};
const currentPath = [];
const totals = {}

for (let i=0;i<commands.length;i++){
    if (commands[i][0] === '$'){
        if (commands[i][2] === 'c'){
            if (commands[i][5] === '.'){
                currentPath.pop();
            }
            else {
                const match = commands[i].match(cdRegex);
                const next = match[0].slice(3);
                writeFS(next, parseFS(currentPath,fileSystem));
                currentPath.push(next);
            }
        }
    } else {
        let match = commands[i].match(numberRegex)
        if (!match) {
            match = [0]
        }
        currentPath.forEach((e, i, a) => {
            const slice = "" + a.slice(0, i+1)
            if (!totals.hasOwnProperty(slice)) {
                totals[slice] = 0
            }
            totals[slice] = totals[slice] + +match[0]
        })
    }
}

const totalsArray = Object.values(totals)

const totalFs = totals['/'];

const totalSpace = 70000000;

const freeSpace = 30000000;
const spaceRequired = totalSpace - freeSpace;

const dirsToDelete = totalsArray.filter(total => totalFs - total < spaceRequired)

dirsToDelete.sort((a,b)=>a - b)

const ans = Object.entries(totals).find(entry => entry[1] === dirsToDelete[0])

console.log("Part Two",ans)

for (let total in totals){
    if (totals[total] > 100000){
        delete totals[total];
    }
}

console.log("Part One",sum(Object.values(totals)))
