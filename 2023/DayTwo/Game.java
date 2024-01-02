package DayTwo;
import java.util.List;
import java.util.ArrayList;

public class Game {

    int id;
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
}