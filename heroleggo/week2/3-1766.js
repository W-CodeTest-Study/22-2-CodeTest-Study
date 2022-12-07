const fs = require('fs');

const [info, ...data] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = info.split(' ').map((v) => +v);

class PriorityQueue {}