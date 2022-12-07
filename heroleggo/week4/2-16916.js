const fs = require('fs');

const [original, sliced] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getPartialMatch = (N) => {
    const pi = new Array(N.length).fill(0);
    let begin = 1, matched = 0;
    while(begin + matched < N.length) {
        if(N[begin + matched] === N[matched]) {
            matched++;
            pi[begin + matched - 1] = matched;
        }
        else {
            if(matched === 0) begin++;
            else {
                begin += matched - pi[matched - 1];
                matched = pi[matched - 1];
            }
        }
    }
    return pi;
}

const kmpSearch = (H, N) => {
    const ret = [];
    const pi = getPartialMatch(N);
    let begin = 0, matched = 0;
    while(begin <= H.length - N.length) {
        if(matched < N.length && H[begin + matched] === N[matched]) {
            // 모두 일치했다면 답에 추가한다.
            if(++matched === N.length ) ret.push(begin);
        }
        else {
            // 한 글자도 일치하지 않으면 다음 시작 위치에서 탐색한다.
            if(matched === 0) begin++;
            else {
                begin += matched - pi[matched - 1];
                matched = pi[matched - 1];
            }
        }
    }
    return ret;
}

console.log(kmpSearch(original, sliced).length ? 1 : 0);