import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String original = sc.nextLine();
        String sliced = sc.nextLine();
        int result = Main.doKMP(original, sliced);
        System.out.println(result);
    }

    public static int doKMP(String original, String sliced) {
        List<Integer> returnValue = new ArrayList<Integer>();
        int[] partialInfo = Main.getPartialMatch(original);

        int begin = 0, matched = 0;
        int originalLength = original.length();
        int slicedLength = sliced.length();

        while (begin <= originalLength - slicedLength) {
            if (matched < slicedLength && original.charAt(begin + matched) == sliced.charAt(matched)) {
                matched++;
                if (matched == slicedLength) {
                    returnValue.add(begin);
                }
            } else {
                if (matched == 0) {
                    begin++;
                } else {
                    begin += matched - partialInfo[matched - 1];
                    matched = partialInfo[matched - 1];
                }
            }
        }
        return returnValue.size();
    }

    private static int[] getPartialMatch(String original) {
        int[] info = new int[original.length()];

        int begin = 1, matched = 0;

        while (begin + matched < original.length()) {
            if (original.charAt(begin + matched) == original.charAt(matched)) {
                matched++;
                info[begin + matched - 1] = matched;
            } else {
                if (matched == 0) {
                    begin++;
                } else {
                    begin += matched - info[matched - 1];
                    matched = info[matched - 1];
                }
            }
        }

        return info;
    }
}