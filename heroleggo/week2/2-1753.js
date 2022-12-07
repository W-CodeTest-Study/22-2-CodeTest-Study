const fs = require('fs');

const [info, start, ...data] = `5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6`.split('\n');
//const [info, start, ...data] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Heap {
    data;

    constructor(length) {
        this.data = Array(length).fill(0);
        this.len = 0;
    }

    add = (key, value) => {
        const node = { key, value };
        this.data.push(node);
        this.len += 1;
    }

    getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1

    getRightChildIdx = (parentIdx) => parentIdx * 2 + 2

    getParentidx = (idx) => Math.floor((idx - 1) / 2)

    peek = () => data[0];

}

const [V, E] = info.split(' ').map((v) => +v);

let dijkstra = Array(V).fill(Number.MAX_SAFE_INTEGER);

const map = new Map();

dijkstra.forEach((_, i) => {
    map.set(i + 1, []);
});

data.map((d) => d.split(' ').map((v) => +v)).forEach(([s, e, w]) => {
    map.set(s, [...map.get(s), { end: e, weight: w }]);
});

dijkstra[+start - 1] = 0;

const queue = [];

queue.push(+start);

while (queue.length) {
    let tmp = queue.shift();

    const nodes = map.get(tmp);

    nodes.forEach(({ end, weight }) => {
        dijkstra[end - 1] = Math.min(dijkstra[end - 1], dijkstra[tmp - 1] + weight);
        queue.push(end);
    })
}

console.log(dijkstra.map((i) => i === Number.MAX_SAFE_INTEGER ? 'INF' : i).join('\n'));