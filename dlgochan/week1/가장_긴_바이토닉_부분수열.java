package dlgochan.week1;

import java.util.Scanner;

/**
 * 가장긴바이토닉부분수열
 */
public class 가장_긴_바이토닉_부분수열 {

    private static int N;

    public static void main(String[] args) {
        // input
        Scanner sc = new Scanner(System.in);
        N = sc.nextInt();
        int[] seq = new int[N];
        for (int i = 0; i < N; i++) {
            seq[i] = sc.nextInt();
        }

        // set reversed array
        int[] seqReverse = new int[N];
        for (int i = 0; i < seq.length; i++) {
            seqReverse[i] = seq[N - 1 - i];
        }

        // get max LIS dp array for each seq
        int[] dp = LongestIncrementSeq(seq);
        int[] dpReverse = LongestIncrementSeq(seqReverse);

        // find longest bitonic
        int max = -1;
        for (int i = 0; i < N; i++) {
            dp[i] += dpReverse[N - 1 - i] - 1; // remove dup
        }
        for (int i = 0; i < dpReverse.length; i++) {
            if (max < dp[i])
                max = dp[i];
        }

        System.out.println(max);
        sc.close();
    }

    public static int[] LongestIncrementSeq(int[] seq) {
        int[] dp = new int[seq.length];

        // dp
        for (int i = 0; i < seq.length; i++) {
            dp[i] = 1;

            // 0 ~ i 이전 원소들 탐색
            for (int j = 0; j < i; j++) {

                // j번째 원소가 i번째 원소보다 작으면서 i번째 dp가 j번째 dp+1 값보다 작은경우
                if (seq[j] < seq[i] && dp[i] < dp[j] + 1) {
                    dp[i] = dp[j] + 1; // j번째 원소의 +1 값이 i번째 dp가 된다.
                }
            }
        }

        return dp;
    }

}