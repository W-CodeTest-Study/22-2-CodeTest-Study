const fs = require('fs');

const [original, sliced] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 원본 문자열에서 탐색을 수행할 때 각 인덱스에 대한 패턴의 길이를 배열로 반환
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

// 실제 서칭을 수행하는 함수
const kmpSearch = (H, N) => {
    const ret = [];
    const pi = getPartialMatch(N);
    let begin = 0, matched = 0;
    const lengthH = H.length;
    const lengthN = N.length;
    while(begin <= lengthH - lengthN) {
        if(matched < lengthN && H[begin + matched] === N[matched]) {
            // 모두 일치했다면 답에 추가한다.
            matched++;
            if(matched === lengthN ) {
                ret.push(begin);
            }
        }
        else {
            // 한 글자도 일치하지 않으면 다음 시작 위치에서 탐색한다.
            if(matched === 0) begin++;
            else {
                begin += matched - pi[matched - 1]; // 다음 탐색을 시작할 인덱스를 입력한다. (부분에 대해 이미 검증을 수행했기 때문에, 값만 더해줌)
                matched = pi[matched - 1]; // 이전 결과값까지 값이 일치하기 때문에 부분을 검증한 것 중 이전 인덱스의 값을 가져온다.
            }
        }
    }
    return ret;
}

console.log(kmpSearch(original, sliced).length ? 1 : 0);