const fs = require('fs');

const [N, data] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const nums = data.split(' ').map((v) => +v);

const inc = new Array(+N);
const dec = new Array(+N);

// 증가 DP 구하기
for (let i = 0; i < N; i++) {
    const cur = nums[i];
    let cnt = 1;
    for (let j = 0; j < i; j++) {
        const compare = nums[j];
        if (cur > compare) cnt = Math.max(cnt, inc[j] + 1);
    }
    inc[i] = cnt;
}

// 감소 DP 구하기
for (let i = N - 1; i >= 0; i--) {
    const cur = nums[i];
    let cnt = 1;
    for (let j = i + 1; j < N; j++) {
        const compare = nums[j];
        if (cur > compare) cnt = Math.max(cnt, dec[j] + 1);
    }
    dec[i] = cnt;
}

const result = inc.map((v, i) => v + dec[i] - 1);

console.log(Math.max(...result));