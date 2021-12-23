const fs = require('fs');
fs.readFile('inputthree.txt', (err, data) => {
    if (err){
        throw err;
    }
const raw = data + "";

const strArr = raw.split('\n');
function findHighest(arr, num, str){                          // My Day 3 Part 1 solution became this function.
    const dataArr = []                                        // It runs through an array, totals no. of 1s and no. of 0s
    let count1= 0                                             // and then passes these in a 2-place array to zeroOrOne() with
    let count0= 0                                             // the CO2/02 str passed to it by sortingArr().
    for (let i=0; i<arr.length; i++){
        if (arr[i][num] === "1"){
                count1++
            }
        if (arr[i][num] === "0"){
                count0++
            }
        } dataArr.push(count0);
        dataArr.push(count1);
        return zeroOrOne(dataArr, str) 
}
function sortArray(arr, num, str) {
    if (arr.length <= 1){                                        // I struggled alot with this, as I wasn't sure what base condition could work -
        return arr[0]                                            // looking at Ed Withers' (dearshrewdwit) solution helped figure this part out.
    }

const sortingArr = [];                                             
if (findHighest(arr, num, str) === "findone"){                    // For most of the time I spent working on this, I was only returning "1" or "0".
    for (i=0; i<arr.length;i++){                                  // Adding two extra checks was a late last minute fix, would be the first thing to            
    if (arr[i][num] === "1"){                                     // try and improve.
    sortingArr.push(arr[i])
    }}}
if (findHighest(arr, num, str) === "priozero"){
    for (i=0; i<arr.length;i++){
        if (arr[i][num] === "0"){
        sortingArr.push(arr[i])
    }}} 
if (findHighest(arr, num, str) === "findzero") {
    for (i=0; i<arr.length;i++){
        if (arr[i][num] === "0"){
        sortingArr.push(arr[i])
    }}}
if (findHighest(arr, num, str) === "prioone") {
    for (i=0; i<arr.length;i++){
        if (arr[i][num] === "1"){
        sortingArr.push(arr[i])
    }}}
return sortArray(sortingArr, num+1, str);                          // Function returns itself until base condition is met               
    }

function zeroOrOne(arr, str){                                      // This function also at first returned either "1" or "0",
    if (str === "O2") {                                            // and had to change last minute, when I realised both the
    if (arr[0] > arr[1]){                                           // CO2 and O2 checks could require selecting "1"s OR "0"s.
        return "findzero"
        }
        if (arr[1] >= arr[0]){
        return "prioone"
        }}
    if (str === "CO2"){
    if (arr[0] <= arr[1]){
        return "priozero"
        }
        if (arr[1] < arr[0]){
        return "findone"
        }}
    }
const c02 = parseInt(sortArray(strArr, 0, "CO2"), 2)
const o2 = parseInt(sortArray(strArr, 0, "O2"), 2)
    
console.log(c02)
console.log(o2)
console.log(c02*o2)
})
