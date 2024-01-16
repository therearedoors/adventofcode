import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

import DayOne.DayOne;
import DayTwo.DayTwo;
import DayThree.DayThree;
import DayFour.DayFour;
import DayFive.DayFive;
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
        String[][] dayFive = parseDayFive("inputs/day5.txt");
        String[][] dayFiveTest = parseDayFive("inputs/day5test.txt");
        DayFive dayFiveSolver = new DayFive(dayFive);
        dayFiveSolver.solve();
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

        public static String[][] parseDayFive(String path){
            try {
            File file = new File(path);
            Scanner scanner = new Scanner(file);
            ArrayList<String[]> lineList = new ArrayList<String[]>();
            ArrayList<String> nextList = null;
            while(scanner.hasNext()) {
                String nextLine = scanner.nextLine();
                if (nextList == null){
                    nextList = new ArrayList<String>();
                    nextList.add(nextLine);
                    continue;
                }
                if (nextLine == ""){
                    continue;
                }
                if (isMapHeader(nextLine)){
                    String[] nextArray = new String[nextList.size()];
                    nextArray = nextList.toArray(nextArray);
                    lineList.add(nextArray);
                    nextList = new ArrayList<String>();
                    continue;
                }
                nextList.add(nextLine);
            }
            scanner.close();
            String[] nextArray = new String[nextList.size()];
            nextArray = nextList.toArray(nextArray);
            lineList.add(nextArray);
            String[][] lineArray = new String[lineList.size()][0];
            lineArray = lineList.toArray(lineArray);
            return lineArray;
        } catch (FileNotFoundException e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
            }
            return new String[0][0];
    }
    private static boolean isMapHeader(String nextList) {
        return nextList.contains("seed-") 
                || nextList.contains("soil-")  
                || nextList.contains("fertilizer-") 
                || nextList.contains("water-") 
                || nextList.contains("light-") 
                || nextList.contains("temperature-")
                || nextList.contains("humidity-");
    }
}
