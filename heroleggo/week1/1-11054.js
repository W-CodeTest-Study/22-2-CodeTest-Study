const fs = require('fs');

const [N, data] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const nums = data.split(' ').map((v) => +v);

const reversedNums = [...nums].reverse();

const findLargeNum = (array, idx) => {
    let max = array[0];
    let ret = 0;
    if (max === array[idx]) {
        return -1;
    }
    for (let i = 0; i < idx; i++) {
        if (max <= array[i] && array[i] < array[idx]) {
            max = array[i];
            ret = i;
        }
    }

    return ret;
}

const getLIS = (array, idx) => {
    if (!idx) {
        return 1;
    }
    const lastLargeIdx = findLargeNum(array, idx);

    if (lastLargeIdx === -1) {
        return 1;
    }

    return getLIS(array, lastLargeIdx) + 1;
}

// 각 위치별로, 증가하는 수열, 감소하는 수열을 만들어 보자

let inc = Array(+N);
let dec = Array(+N);

for (let i = 0; i < +N; i++) {
    inc[i] = getLIS(nums, i);
    dec[i] = getLIS(reversedNums, i);
}

dec.reverse();

const result = inc.map((v, i) => {
    return v + dec[i] - 1;
}).sort((a, b) => b - a);

console.log(result[0]);