import java.util.Arrays;
import java.util.Scanner;

/*
* https://www.acmicpc.net/problem/1654
* 문제
* 1. K개의 랜선의 길이를 입력받음
* 2. K개의 랜선을 잘라서 N개의 랜선을 만들 수 있는 최대 길이 answer 를 구해야 함
*
* 접근
* 1. answer 는 K개의 랜선 중 가장 긴 랜선의 길이보다 작다. (제약 조건 K<N 이기 때문)
* 2. 따라서 특정 길이( max_length / 2 )로 N개 보다 많이 만들 수 있는지 파악한다.
* 3. 많이 만들 수 있다면 큰 쪽으로 다시 탐색
* 4. 만들 수 없다면 작은 쪽으로 다시 탐색
* 5. 이진 탐색 시간 복잡도 O(logN)
* */
public class 랜선_자르기 {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        long k = in.nextInt();
        long n = in.nextInt();

        long[] lengths = new long[(int) k];
        for (int i = 0; i < k; i++) {
            lengths[i] = in.nextInt();
        }

        long maxLength = Arrays.stream(lengths).max().orElseThrow(IllegalArgumentException::new);

        long start = 0;
        long end = maxLength+1; // max length 가 1인 경우 non divided by zero
        long mid;
        while(start < end) {
            mid = (start + end) / 2;
            if (makeLANLIne(lengths, mid) >= n) {
                start = mid+1;
            } else {
                end = mid;
            }
        }

        System.out.println(start-1);
    }

    private static long makeLANLIne(long[] lengths, long length) {
        long number = 0;
        for (long l : lengths) {
            number += l / length;
        }
        return number;
    }
}
