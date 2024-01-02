public class DayOne {
    private String[] lines;
    private String[] testLines = {
"two1nine",
"eightwothree",
"abcone2threexyz",
"xtwone3four",
"4nineeightseven2",
"zoneight234",
"7pqrstsixteen"
    };

    public DayOne(String[] lines){
        this.lines = lines.clone();
    }

    public int getPartOne() {
        return getNumericalCalibrationValueTotal();
    }

    public int getPartTwo() {
        return getCalibrationValueTotal();
    }

    public int testOne() {
        String line = "nineeight";
        return getCalibrationValue(line);
    }

    public int testTwo() {
        String line = "eightwothree";
        return getCalibrationValue(line);
    }

    public int testThree() {
        String line = "abcone2threexyz";
        return getCalibrationValue(line);
    }

    public int testFour() {
        int testTotal = 0;
        for (String line: testLines) {
            testTotal += getCalibrationValue(line);
        }
        return testTotal;
    }
    
    private int getCalibrationValueTotal() {
        int total = 0;
        for (String line : lines) {
            total += getCalibrationValue(line);
        }
        return total;
    }

    private int getCalibrationValue(String line) {
        Character firstDigit = getFirstDigit(line);
        Character lastDigit = getLastDigit(line);
        String s = Character.toString(firstDigit) + Character.toString(lastDigit);
        return Integer.parseInt(s);
    }

    private int getNumericalCalibrationValueTotal() {
        int total = 0;
        for (String line : lines) {
            total += getNumericalCalibrationValue(line);
        }
        return total;
    }

    private int getNumericalCalibrationValue(String line) {
        Character firstDigit = getFirstNumericalDigit(line);
        Character lastDigit = getLastNumericalDigit(line);
        String s = Character.toString(firstDigit) + Character.toString(lastDigit);
        return Integer.parseInt(s);
    }

    private Character getFirstNumericalDigit(String line) {
        for (int i = 0; i < line.length(); i++) {
            if (Character.isDigit(line.charAt(i))) {   // If digit is found, return it.
                return line.charAt(i);
            }
        }
        throw new IllegalArgumentException("No numerical digit found in string");
    }

    private Character getLastNumericalDigit(String line) {
        for (int i = line.length() - 1; i >= 0; i--) {
            if (Character.isDigit(line.charAt(i))) {   // If digit is found, return it.
                return line.charAt(i);
            }
        }
        throw new IllegalArgumentException("No numerical digit found in string");
    }

    private Character getFirstDigit(String line) {
        for (int i = 0; i < line.length(); i++) {
            if (Character.isDigit(line.charAt(i))) {   // If digit is found, return it.
                return line.charAt(i);
            }
            if (line.length() - i >= 5){
                if (line.charAt(i) == 't') {   // If digit is found, return it.
                    if (findThree(line.substring(i,i+5))){
                    return '3';
                    }
                }
                if (line.charAt(i) == 's') {   // If digit is found, return it.
                    if (findSeven(line.substring(i,i+5))){
                    return '7';
                    }
                }
                if (line.charAt(i) == 'e') {   // If digit is found, return it.
                    if (findEight(line.substring(i,i+5))){
                    return '8';
                    }
                }
            }
            if (line.length() - i >= 4){
                if (line.charAt(i) == 'f') {   // If digit is found, return it.
                    if (findFour(line.substring(i,i+4))){
                    return '4';
                    }
                    if (findFive(line.substring(i,i+4))){
                    return '5';
                    }
                    }
                    if (line.charAt(i) == 'n') {   // If digit is found, return it.
                        if (findNine(line.substring(i,i+4))){
                        return '9';
                        }
                    }
            }
            if (line.length() - i >= 3){
                if (line.charAt(i) == 'o') {   // If digit is found, return it.
                    if (findOne(line.substring(i,i+3))){
                    return '1';
                }
                }
                if (line.charAt(i) == 't') {   // If digit is found, return it.
                    if (findTwo(line.substring(i,i+3))){
                    return '2';
                    }
                }
                if (line.charAt(i) == 's') {   // If digit is found, return it.
                    if (findSix(line.substring(i,i+3))){
                    return '6';
                    }
                }
            }
        }
        throw new IllegalArgumentException("No digit found in string");
    }

        private Character getLastDigit(String line) {
        for (int i = line.length() - 1; i >= 0; i--) {
            if (Character.isDigit(line.charAt(i))) {   // If digit is found, return it.
                return line.charAt(i);
            }
            if (i-4 >= 0){
                if (line.charAt(i) == 'e') {   // If digit is found, return it.
                    if (findThree(line.substring(i-4,i+1))){
                    return '3';
                    }
                }
                if (line.charAt(i) == 'n') {   // If digit is found, return it.
                    if (findSeven(line.substring(i-4,i+1))){
                    return '7';
                    }
                }
                if (line.charAt(i) == 't') {   // If digit is found, return it.
                    if (findEight(line.substring(i-4,i+1))){
                    return '8';
                    }
                }
            }
            if (i-3 >= 0){
                if (line.charAt(i) == 'r') {   // If digit is found, return it.
                    if (findFour(line.substring(i-3,i+1))){
                    return '4';
                    }
                }
                if (line.charAt(i) == 'e') {   // If digit is found, return it.
                    if (findFive(line.substring(i-3,i+1))){
                    return '5';
                    }
                    if (findNine(line.substring(i-3,i+1))){
                    return '9';
                    }
                }
            }
            if (i-2 >= 0){
                if (line.charAt(i) == 'e') {   // If digit is found, return it.
                    if (findOne(line.substring(i-2,i+1))){
                    return '1';
                }
                }
                if (line.charAt(i) == 'o') {   // If digit is found, return it.
                    if (findTwo(line.substring(i-2,i+1))){
                    return '2';
                    }
                }
                if (line.charAt(i) == 'x') {   // If digit is found, return it.
                    if (findSix(line.substring(i-2,i+1))){
                    return '6';
                    }
                }
            }
        }
        throw new IllegalArgumentException("No digit found in string");
    }

    private boolean findOne(String line) {
        if (line.length() < 3) {
            return false;
        }
        if (line.charAt(0) == 'o' && line.charAt(1) == 'n' && line.charAt(2) == 'e') {
            return true;
        }
        return false;
    }

    private boolean findTwo(String line) {
        if (line.length() < 3) {
            return false;
        }
        if (line.charAt(0) == 't' && line.charAt(1) == 'w' && line.charAt(2) == 'o') {
            return true;
        }
        return false;
    }

    private boolean findThree(String line) {
        if (line.length() < 5) {
            return false;
        }
        if (line.charAt(0) == 't' && line.charAt(1) == 'h' && line.charAt(2) == 'r' && line.charAt(3) == 'e' && line.charAt(4) == 'e') {
            return true;
        }
        return false;
    }

    private boolean findFour(String line) {
        if (line.length() < 4) {
            return false;
        }
        if (line.charAt(0) == 'f' && line.charAt(1) == 'o' && line.charAt(2) == 'u' && line.charAt(3) == 'r') {
            return true;
        }
        return false;
    }

    private boolean findFive(String line) {
        if (line.length() < 4) {
            return false;
        }
        if (line.charAt(0) == 'f' && line.charAt(1) == 'i' && line.charAt(2) == 'v' && line.charAt(3) == 'e') {
            return true;
        }
        return false;
    }

    private boolean findSix(String line) {
        if (line.length() < 3) {
            return false;
        }
        if (line.charAt(0) == 's' && line.charAt(1) == 'i' && line.charAt(2) == 'x') {
            return true;
        }
        return false;
    }

    private boolean findSeven(String line) {
        if (line.length() < 5) {
            return false;
        }
        if (line.charAt(0) == 's' && line.charAt(1) == 'e' && line.charAt(2) == 'v' && line.charAt(3) == 'e' && line.charAt(4) == 'n') {
            return true;
        }
        return false;
    }

    private boolean findEight(String line) {
        if (line.length() < 5) {
            return false;
        }
        if (line.charAt(0) == 'e' && line.charAt(1) == 'i' && line.charAt(2) == 'g' && line.charAt(3) == 'h' && line.charAt(4) == 't') {
            return true;
        }
        return false;
    }

    private boolean findNine(String line) {
        if (line.length() < 4) {
            return false;
        }
        if (line.charAt(0) == 'n' && line.charAt(1) == 'i' && line.charAt(2) == 'n' && line.charAt(3) == 'e') {
            return true;
        }
        return false;
    }

}
