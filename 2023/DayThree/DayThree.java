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
        // testSetup();
        int total = 0;
        for (Number partNumber: partNumbers) {
           total += Integer.parseInt(partNumber.getValue());
        }
        System.out.print(String.format("Day 3 Part 1: %d\n", total));
        //partTwoTest();
        partTwo();
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

    private void partTwo(){
        int total = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                char c = matrix[i][j];
                if (c == '*'){
                    Gear gear = new Gear(i,j,matrix[i][j]);
                    int count = 0;
                    if (digitAdjacentNorth(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentSouth(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentWest(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentEast(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentNorthWest(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentNorthEast(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentSouthWest(gear, matrix, partNumbers)){count++;}
                    if (digitAdjacentSouthEast(gear, matrix, partNumbers)){count++;}
                    if (count == 2){
                        total += gear.getGearRatio();
                    }
                }
            }
        }
        System.out.println(String.format("Day 3 Part 2: %d", total));
    }

    private void partTwoTest(){
        int total = 0;
        for (int i = 0; i < testMatrix.length; i++) {
            for (int j = 0; j < testMatrix[0].length; j++) {
                char c = testMatrix[i][j];
                if (c == '*'){
                    Gear gear = new Gear(i,j,testMatrix[i][j]);
                    int count = 0;
                    if (digitAdjacentNorth(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentSouth(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentWest(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentEast(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentNorthWest(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentNorthEast(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentSouthWest(gear, testMatrix, testPartNumbers)){count++;}
                    if (digitAdjacentSouthEast(gear, testMatrix, testPartNumbers)){count++;}
                    if (count == 2){
                        total += gear.getGearRatio();
                    }
                }
            }
        }
        System.out.println(String.format("Day 3 Part 2 Test: %d", total));
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

    private boolean digitAdjacentNorth(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (x == 0) {
            return false;
        }
        char c = matrix[x-1][y];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x-1, y);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;

    }

    private boolean digitAdjacentSouth(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (x == matrix.length - 1) {
            return false;
        }
        char c = matrix[x+1][y];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x+1, y);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private boolean digitAdjacentWest(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (y == 0) {
            return false;
        }
        char c = matrix[x][y-1];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x, y-1);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private boolean digitAdjacentEast(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (y == matrix[0].length - 1) {
            return false;
        }
        char c = matrix[x][y+1];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x, y+1);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private boolean digitAdjacentNorthWest(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (x == 0 || y == 0) {
            return false;
        }
        char c = matrix[x-1][y-1];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x-1, y-1);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private boolean digitAdjacentNorthEast(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (x == 0 || y == matrix[0].length - 1) {
            return false;
        }
        char c = matrix[x-1][y+1];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x-1, y+1);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private boolean digitAdjacentSouthWest(Gear gear, char[][] matrix, List<Number> numbers) {
        int x = gear.x;
        int y = gear.y;
        Number n = new Number(new Digit(-1, -1, 'x'));
        boolean isNewNumber = false;
        if (x == matrix.length - 1 || y == 0) {
            return false;
        }
        char c = matrix[x+1][y-1];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x+1, y-1);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private boolean digitAdjacentSouthEast(Gear gear, char[][] matrix, List<Number> numbers){
        int x = gear.x;
        int y = gear.y;
        boolean isNewNumber = false;
        Number n = new Number(new Digit(-1, -1, 'x'));
        if (x == matrix.length - 1 || y == matrix[0].length - 1) {
            return false;
        }
        char c = matrix[x+1][y+1];
        if (Character.isDigit(c)){
            n = searchArrayList(numbers, x+1, y+1);
            isNewNumber = !gear.partNumbers.contains(n);
            if (isNewNumber) {gear.partNumbers.add(n);};
        }
        return Character.isDigit(c) && isNewNumber;
    }

    private Number searchArrayList(List<Number> list, int x, int y) {
        for (Number n : list) {
            for (Digit d: n.digits){
                if (d.x == x && d.y == y){
                    return n;
                }
            }
        }
        return null;
    }
}
