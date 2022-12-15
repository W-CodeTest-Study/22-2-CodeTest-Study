// 백준 - 가장 긴 바이토닉 부분 수열

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n =+input[0];
const numberList = input[1].split(" ").map((e) => +e);

function main(N, numberList) {
  let answer = 0;

  const reverseNumberList = numberList.slice().reverse();

  // k일 때, 증가 배열의 최대 수 / 감소 배열의 최대 수 저장
  let increase = new Array(N).fill(1);
  let decrease = new Array(N).fill(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (numberList[i] > numberList[j]) {
        increase[i] = Math.max(increase[i], increase[j] + 1);
      }
      if (reverseNumberList[i] > reverseNumberList[j]) {
        decrease[i] = Math.max(decrease[i], decrease[j] + 1);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    answer = Math.max(increase[i] + decrease[N - i - 1] - 1, answer);
  }
  return answer;
}

const answer = main(n, numberList);
console.log(answer);