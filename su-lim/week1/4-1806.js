// 백준 - 부분합

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, S] = input[0].split(" ").map((e)=> +e);
const sequence = input[1].split(" ").map((e) => +e);

let [L, R] = [0, 0];
let MAX_SIZE = 100000;
let size = MAX_SIZE;
let sum = 0;

while( R !== N ){

    // L부터 R까지 합 구하기
    sum = 0;
    for(let i=L; i<R+1; i++){
        sum += sequence[i];
    }

    if(sum >= S){
        size = R-L+1;
        if(size === 1) break;
        L += 1;
    }
    else{
        R += 1;
        if(size <= R-L+1){
            L += 1;
        }
    }
    
}
console.log(size === MAX_SIZE ? 0 : size);
