package dlgochan.week1;

public class 징검다리_건너기 {

    public static void main(String[] args) {
        int[] stones = { 2, 4, 5, 3, 2, 1, 4, 2, 5, 1 };
        int answer = solution(stones, 3);
        System.out.println(answer);
    }

    public static int solution(int[] stones, int k) {
        int answer = 0;
        while (true) {
            int flag = 0;
            // for each person
            // find minimum stone
            int minStone = 200000001;
            for (int i = 0; i < stones.length; i++) {
                if (stones[i] > 0 && minStone > stones[i])
                    minStone = stones[i];
            }
            System.out.println("minStone: " + minStone);
            // find max length 0
            for (int i = 0; i < stones.length; i++) {
                if (stones[i] > 0)
                    stones[i] -= minStone;
            }
            int len = 0;
            for (int i = 0; i < stones.length; i++) {
                if (k == len) {
                    flag = 1;
                    break;
                }
                if (stones[i] > 0) {
                    len = 0;
                    continue;
                }
                len++;
            }
            answer += minStone;

            if (flag == 1)
                break;
        }
        return answer;
    }
}
