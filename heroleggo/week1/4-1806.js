const fs = require('fs');

const [[N, S], nums] = `10 15
5 1 3 5 10 7 4 9 2 8`.split('\n').map((v) => v.split(' ').map((v) => +v)) //fs.readFileSync('/dev/stdin').toString().trim().split('\n').map((v) => v.split(' ').map((v) => +v));

const divideAndConquer = (data, start, end) => {
    let result = -1;

    // base condition
    if (start === end) {
        return data[start];
    }

    const mid = (start + end) % 2 ? (start + end + 1) / 2 : (start + end) % 2;

    let left = -1;
    let right = -1;

    let leftSum = 0;
    let rightSum = 0;

    for (let i = mid; i >= start; i--) {
        leftSum += data[i];
        left = Math.max(left, leftSum);
    }

    for (let i = mid + 1; i < end; i++) {
        rightSum += data[i];
        right = Math.max(right, rightSum);
    }

    result = Math.max(divideAndConquer(data, start, mid), divideAndConquer(data, mid + 1, end));
    result = Math.max(result, left + right);

    return result;
}

const getSubsequence = (data, criteria) => {

}