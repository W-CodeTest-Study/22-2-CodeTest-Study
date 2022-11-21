const fs = require('fs');

const [info, ...lines] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [k, n] = info.split(' ').map((v) => +v);

const data = lines.map((v) => +v);

const min = 1;
const max = Math.max(...data);

const possible = (start, end, lines, target) => {
    const mid = parseInt((start + end) / 2);
    let result = 0;
    lines.forEach((line) => {
        result += parseInt(line / mid);
    })

    if (target <= result) { // 조건 충족 시 길이 조건을 늘려서 다시 시도
        if (start === end) { // 같으면 그게 답이므로 반환
            return start;
        }
        return possible(mid + 1, end, lines, target);
    } else { // 조건 미충족시 길이 조건을 줄여서 다시 시도
        if (start === end) { // 같으면 하나 작은 값이 충족한 것이므로, 하나 빼서 반환
            return start - 1;
        }
        return possible(start, mid, lines, target);
    }
}

console.log(possible(min, max, data, n));