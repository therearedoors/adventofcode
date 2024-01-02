package DayTwo;
import java.util.List;
import java.util.ArrayList;

public class DayTwo {

    List<Game> games = new ArrayList<Game>();
    String[] testLines = {"Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"};
    List<Game> testGames = new ArrayList<Game>();

    public DayTwo(String[] input){
        for (String line : input) {
            if (line.contains("Game")) {
                games.add(new Game(line));
            }
        }
        for (String line : testLines){
            testGames.add(new Game(line));
        }
    }

    public int testPartOne() {
        int total = 0;
        for (Game game : testGames) {
            if (game.isPossible()){
                total += game.id;
            }
        }
        return total;
    }

    public int getPartOne() {
        int total = 0;
        for (Game game : games) {
            if (game.isPossible()){
                total += game.id;
            }
        }
        return total;
    }
}
