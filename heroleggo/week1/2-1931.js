const fs = require('fs');

const [N, ...data] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const schedules = data.map((d) => {
    const [start, end] = d.split(' ').map((v) => +v);

    return {
        start,
        end
    };
}).sort((a, b) => {
    const cmp = a.end - b.end;
    return cmp ? cmp : a.start - b.start;
});

// 각 회의 시간을 끝나는 시간 ASC -> 시작 시간 ASC 순으로 정렬

let cnt = 0;
let curr = 0;

for (let j = 0; j < +N; j++) {
    if (schedules[j].start >= curr) { // 회의 시작 가능하면 회의 카운트
        curr = schedules[j].end;
        cnt++;
    }
}

console.log(cnt);