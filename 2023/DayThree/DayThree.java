package DayThree;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;


public class DayThree {
    private String[] testInput = {"467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598.."};
    private char[][] matrix;
    private char[][] testMatrix;
    private Number currentNumber;
    private Number currentTestNumber;
    private List<Number> numbers = new ArrayList<Number>();
    private List<Number> testNumbers = new ArrayList<Number>();
    private List<Number> partNumbers = new ArrayList<Number>();
    private List<Number> testPartNumbers = new ArrayList<Number>();

    public DayThree(String[] input) {
        // MAIN INPUT
        List<char[]> matrixList = new ArrayList<>();
        for (String line : input) {
            char[] chars = line.toCharArray();
            matrixList.add(chars);
        }
        matrix = new char[matrixList.size()][];
        matrix = matrixList.toArray(matrix);
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                char c = matrix[i][j];
                if (Character.isDigit(c) && j == 0){
                    if (currentNumber != null) {
                        numbers.add(currentNumber);
                        Digit digit = new Digit(i,j,c);
                        currentNumber = new Number(digit);
                        continue;
                    }
                }
                if (Character.isDigit(c) && currentNumber == null){
                    Digit digit = new Digit(i,j,c);
                    currentNumber = new Number(digit);
                } else if (Character.isDigit(c) && currentNumber != null) {
                    currentNumber.digits.add(new Digit(i,j,c));
                } else if (!Character.isDigit(c) && currentNumber != null) {
                    numbers.add(currentNumber);
                    currentNumber = null;
                }
            }
        }
        for (Number number : numbers) {
            for (Digit digit : number.digits) {
                if (symbolAdjacentNorth(digit, matrix) || symbolAdjacentSouth(digit, matrix) || symbolAdjacentWest(digit, matrix) || symbolAdjecentEast(digit, matrix) || symbolAdjacentNorthWest(digit, matrix) || symbolAdjacentNorthEast(digit, matrix) || symbolAdjacentSouthWest(digit, matrix) || symbolAdjacentSouthEast(digit, matrix)) {
                partNumbers.add(number);
                    break;
                }
            }
        }
        // TEST INPUT
        testSetup();
        int total = 0;
        for (Number partNumber: partNumbers) {
            //System.out.println(String.format("\nPart number: %s\n", partNumber.getValue()));
           total += Integer.parseInt(partNumber.getValue());
        }
        System.out.print(String.format("Day 3 Part 1: %d %d\n", numbers.size(), total));
    }

    private void testSetup() {
        List<char[]> matrixList = new ArrayList<>();
        for (String line : testInput) {
            char[] chars = line.toCharArray();
            matrixList.add(chars);
        }
        testMatrix = new char[matrixList.size()][];
        testMatrix = matrixList.toArray(testMatrix);
        for (int i = 0; i < testMatrix.length; i++) {
            for (int j = 0; j < testMatrix[0].length; j++) {
                char c = testMatrix[i][j];
                if (Character.isDigit(c) && j == 0){
                    if (currentNumber != null) {
                        numbers.add(currentNumber);
                        Digit digit = new Digit(i,j,c);
                        currentNumber = new Number(digit);
                        continue;
                    }
                }
                if (Character.isDigit(c) && currentTestNumber == null){
                    Digit digit = new Digit(i,j,c);
                    currentTestNumber = new Number(digit);
                } else if (Character.isDigit(c) && currentTestNumber != null) {
                    currentTestNumber.digits.add(new Digit(i,j,c));
                } else if (!Character.isDigit(c) && currentTestNumber != null) {
                    testNumbers.add(currentTestNumber);
                    currentTestNumber = null;
                }
            }
        }
        for (Number number : testNumbers) {
            for (Digit digit : number.digits) {
                if (symbolAdjacentNorth(digit, testMatrix) || symbolAdjacentSouth(digit, testMatrix) || symbolAdjacentWest(digit, testMatrix) || symbolAdjecentEast(digit, testMatrix) || symbolAdjacentNorthWest(digit, testMatrix) || symbolAdjacentNorthEast(digit, testMatrix) || symbolAdjacentSouthWest(digit, testMatrix) || symbolAdjacentSouthEast(digit, testMatrix)) {
                testPartNumbers.add(number);
                    break;
                }
            }
        }
        int total = 0;
        for (Number partNumber: testPartNumbers) {
           total += Integer.parseInt(partNumber.getValue());
        }
        System.out.println(String.format("Day 3 test Part 1: %d", total));
    }

    private boolean symbolAdjacentNorth(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (x == 0) {
            return false;
        }
        char symbol = matrix[x-1][y];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjacentSouth(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (x == matrix.length - 1) {
            return false;
        }
        char symbol = matrix[x+1][y];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjacentWest(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (y == 0) {
            return false;
        }
        char symbol = matrix[x][y-1];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjecentEast(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (y == matrix[0].length - 1) {
            return false;
        }
        char symbol = matrix[x][y+1];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjacentNorthWest(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (x == 0 || y == 0) {
            return false;
        }
        char symbol = matrix[x-1][y-1];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjacentNorthEast(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (x == 0 || y == matrix[0].length - 1) {
            return false;
        }
        char symbol = matrix[x-1][y+1];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjacentSouthWest(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (x == matrix.length - 1 || y == 0) {
            return false;
        }
        char symbol = matrix[x+1][y-1];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean symbolAdjacentSouthEast(Digit digit, char[][] matrix) {
        int x = digit.x;
        int y = digit.y;
        if (x == matrix.length - 1 || y == matrix[0].length - 1) {
            return false;
        }
        char symbol = matrix[x+1][y+1];
        return !Character.isDigit(symbol) && symbol != '.';
    }

    private boolean digitAdjacentNorth(Gear gear, char[][] matrix){
        int x = gear.x;
        int y = gear.y;
        if (x == 0) {
            return false;
        }
        char c = matrix[x-1][y];
        return Character.isDigit(c);

    }

    private boolean digitAdjacentSouth(Gear gear, char[][] matrix){
        
    }
}
