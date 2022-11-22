import java.util.*;
import java.util.stream.Collectors;

/*
 * https://www.acmicpc.net/problem/1766
 * 문제
 * 1. N개의 문제는 모두 풀어야 한다.
 * 2. 먼저 푸는 것이 좋은 문제가 있는 문제는, 먼저 푸는 것이 좋은 문제를 반드시 먼저 풀어야 한다.
 * 3. 가능하면 쉬운 문제부터 풀어야 한다.
 *
 * 접근
 * 1. node: 문제 번호, direction: 먼저 푸는 것이 좋은 문제 -> 다음 문제
 * 2. 입력값을 그래프화
 * 3. topological sort 사용
 * 4. priority queue를 사용하여 쉬운 문제 부터 풀기
 * */
public class 문제집 {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int N = in.nextInt();
        int M = in.nextInt();

        Map<Integer, List<Integer>> info = new HashMap<>();
        for (int i = 1; i <= N; i++) {
            info.put(i, new ArrayList<>());
        }

        int[] indegree = new int[N + 1];
        for (int i = 0; i < M; i++) {
            int from = in.nextInt();
            int to = in.nextInt();
            info.get(from).add(to);
            indegree[to]++;
        }

        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int i = 1; i <= N; i++) {
            if (indegree[i] == 0) { // 먼저 풀어야하는 문제가 없는 경우
                pq.offer(i);
            }
        }

        List<Integer> solveSeq = new ArrayList<>();
        while (!pq.isEmpty()) {
            int from = pq.poll();
            solveSeq.add(from);

            // now와 연결된 문제가 있는지 확인.
            for (int to : info.get(from)) {
                // now에 해당하는 문제를 풀었기때문에
                // next보다 먼저 풀어야하는 문제의 개수가 1개 줄어듦.
                indegree[to]--;

                // 먼저 풀어야하는 문제가 없는 경우
                // 새롭게 큐에 데이터를 집어넣는다.
                if (indegree[to] == 0) {
                    pq.offer(to);
                }
            }
        }

        System.out.println(solveSeq.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(" ")));
    }
}
