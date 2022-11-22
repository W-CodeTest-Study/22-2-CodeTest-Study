package dlgochan.week1;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

/**
 * 회의실_배정
 */
public class 회의실_배정 {

    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        int N = in.nextInt();

        /*
         * time[][0] 은 시작시점을 의미
         * time[][1] 은 종료시점을 의미
         */
        int[][] time = new int[N][2];

        for (int i = 0; i < N; i++) {
            time[i][0] = in.nextInt(); // 시작시간
            time[i][1] = in.nextInt(); // 종료시간
        }

        // 끝나는 시간을 기준으로 정렬하기 위해 compare 재정의
        Arrays.sort(time, (o1, o2) -> {

            // 종료시간이 같을 경우 시작시간이 빠른순(작은순)으로 정렬해야한다.
            if (o1[1] == o2[1]) {
                return o1[0] - o2[0]; // if o1 is bigger(return value is over 0), then switch. so this operation
                // switch v1 and v2 when return value is over 0
            }

            return o1[1] - o2[1];
        });

        int count = 0;
        int prev_end_time = 0;

        for (int i = 0; i < N; i++) {

            // 직전 종료시간이 다음 회의 시작 시간보다 작거나 같다면 갱신
            if (prev_end_time <= time[i][0]) {
                prev_end_time = time[i][1];
                count++;
            }
        }

        System.out.println(count);
        in.close();
    }

}