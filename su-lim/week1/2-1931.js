// 백준 - 회의실 배정

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +input[0];
let timeList = [];

for(let i=1;i<N+1;i++){
  timeList.push(input[i].split(" ").map((e) => +e));
}

function main(N, timeList) {
    let count = 0;
    let startTime = 0;
    
    timeList.sort(function(a,b){
        return a[0] - b[0];
    })
    timeList.sort(function(a,b){
        return a[1] - b[1];
    })

    for(let i=0;i<timeList.length;i++){
        if(timeList[i][0] >= startTime){
            count += 1;
            startTime = timeList[i][1];
        }
    }
    return count;
}

console.log(main(N, timeList));