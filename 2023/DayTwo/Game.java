package DayTwo;
import java.util.List;
import java.util.ArrayList;

public class Game {

    int id;
    int fewestRed = 0;
    int fewestBlue = 0;
    int fewestGreen = 0;
    List<Cubes> cubes = new ArrayList<Cubes>();

    final int MAX_RED = 12;
    final int MAX_BLUE = 14;
    final int MAX_GREEN = 13;

    public Game(String input){
        String[] raw = input.split(": ");
        id = Integer.parseInt(raw[0].split(" ")[1]);
        String[] cubeLists = raw[1].split("; ");
        for (String cubeList : cubeLists) {
            String[] cubeSets = cubeList.split(", ");
            for (String cubeSet: cubeSets) {
                cubes.add(new Cubes(cubeSet));
        }
        for (Cubes cube : cubes) {
            switch (cube.getColor()) {
                case RED:
                    fewestRed = Math.max(fewestRed,cube.getNumber());
                    break;
                case BLUE:
                    fewestBlue = Math.max(fewestBlue,cube.getNumber());
                    break;
                case GREEN:
                    fewestGreen = Math.max(fewestGreen,cube.getNumber());
                    break;
                default:
                    break;
            }
        }
    }
    }

    public boolean isPossible() {
        for (Cubes cube : cubes) {
            switch (cube.getColor()) {
                case RED:
                    if (cube.getNumber() > MAX_RED){
                        return false;
                    }
                    break;
                case BLUE:
                    if (cube.getNumber() > MAX_BLUE){
                        return false;
                    };
                    break;
                case GREEN:
                    if (cube.getNumber() > MAX_GREEN){
                        return false;
                    };
                    break;
                default:
                    break;
            }
        }
        return true;
    }

    public int getPower() {
        return fewestRed * fewestBlue * fewestGreen;
    }
}