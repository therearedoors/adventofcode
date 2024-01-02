import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;


public class Solver {
    public static void main(String[] args) {
        String [] dayOne = parseInput("inputs/day1.txt");
        DayOne dayOneSolver = new DayOne(dayOne);
        System.out.print(String.format("\n%d\n", dayOneSolver.getPartOne()));
        System.out.print(dayOneSolver.getPartTwo());
        System.out.print(String.format("\n%d\n", dayOneSolver.testOne()));
        System.out.print(String.format("\n%d\n", dayOneSolver.testTwo()));
        System.out.print(String.format("\n%d\n", dayOneSolver.testThree()));
        System.out.print(dayOneSolver.testFour());
    }

    public static String[] parseInput(String path) {
            try {
            File file = new File(path);
            Scanner scanner = new Scanner(file);
            ArrayList<String> lineList = new ArrayList<String>();

            while(scanner.hasNext()) {
                lineList.add(scanner.nextLine());
            }
            scanner.close();

            // Convert ArrayList to Array
            String[] lineArray = lineList.toArray(new String[0]);

            return lineArray;
         } catch (FileNotFoundException e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
            }
            return new String[0];
        }
}
