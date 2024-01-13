import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

import DayOne.DayOne;
import DayTwo.DayTwo;
import DayThree.DayThree;
import DayFour.DayFour;
import DaySix.DaySix;


public class Solver {
    public static void main(String[] args) {
        String[] dayOne = parseInput("inputs/day1.txt");
        DayOne dayOneSolver = new DayOne(dayOne);
        System.out.print(String.format("Day 1 Part 1: %d\n", dayOneSolver.getPartOne()));
        System.out.print(String.format("Day 1 Part 2: %d\n", dayOneSolver.getPartTwo()));
        String[] dayTwo = parseInput("inputs/day2.txt");
        DayTwo dayTwoSolver = new DayTwo(dayTwo);
        System.out.print(String.format("Day 2 Part 1: %d\n", dayTwoSolver.getPartOne()));
        System.out.print(String.format("Day 2 Part 2: %d\n", dayTwoSolver.getPartTwo()));
        String[] dayThree = parseInput("inputs/day3.txt");
        DayThree dayThreeSolver = new DayThree(dayThree);
        String[] dayFour = parseInput("inputs/day4.txt");
        DayFour dayFourSolver = new DayFour(dayFour);
        String[] daySix = parseInput("inputs/day6.txt");
        DaySix daySixSolver = new DaySix(daySix);
        daySixSolver.solve();
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
