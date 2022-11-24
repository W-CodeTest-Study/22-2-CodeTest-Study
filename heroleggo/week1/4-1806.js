const fs = require('fs');

const [[N, S], nums] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map((v) => v.split(' ').map((v) => +v));

let start = 0;
let end = 0;

let result = Number.MAX_SAFE_INTEGER;

let sum = 0;

while (start < N) {
    if (sum >= S) { // 조건 충족 시
        if (end - start < result) {
            result = end - start;
        }
        sum -= nums[start];
        start++;
    } else {
        if (end !== N) {
            sum += nums[end];
            end++;
        } else { // start 인덱스를 증가시켜야 함
            sum -= nums[start];
            start++;
        }
    }
}

console.log(result === Number.MAX_SAFE_INTEGER ? 0 : result);