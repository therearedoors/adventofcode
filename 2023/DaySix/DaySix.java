package DaySix;
import java.util.Arrays;
import java.util.stream.Collectors;

public class DaySix {
  String[] testTimes = {"7","15","30"};
  String[] testDistances = {"9","40","200"};
  long[] times;
  long[] distances;
  long partTwoTime;
  long partTwoDistance;

  public DaySix(String[] input){
    times = cleanInput(input[0]);
    distances = cleanInput(input[1]);
    partTwoTime = fixKerning(input[0]);
    partTwoDistance = fixKerning(input[1]);
  }

  private long[] cleanInput(String input) {
    return Arrays.stream(input.split(":")[1].split(" "))
    .map(String::trim)
    .filter(e -> e != "")
    .mapToLong(Long::parseLong)
    .toArray();
  }

  private long fixKerning(String input) {
    return Long.parseLong(Arrays.stream(input.split(":")[1].split(" "))
    .map(String::trim)
    .filter(e -> e != "")
    .collect(Collectors.joining()));
  }

  public void testSolve(){
    long total = 1;
    for (int i=0;i<testTimes.length;i++){
      Race race = new Race(Long.parseLong(testTimes[i]),Long.parseLong(testDistances[i]));
      race.calculateWays();
      total *= race.waysToWin;
    }
    System.out.println(String.format("Day 6 Part 1 test: %d", total));
    long partTwoTestTime = Long.parseLong(Arrays.stream(testTimes).collect(Collectors.joining()));
    long partTwoTestDistance = Long.parseLong(Arrays.stream(testDistances).collect(Collectors.joining()));
    Race partTwoRace = new Race(partTwoTestTime, partTwoTestDistance);
    partTwoRace.calculateWays();
    System.out.println(String.format("Day 6 Part 2 test: %d", partTwoRace.waysToWin));
  }

  public void solve(){
    int total = 1;
    for (int i=0;i<times.length;i++){
      Race race = new Race(times[i],distances[i]);
      race.calculateWays();
      total *= race.waysToWin;
    }
    System.out.println(String.format("Day 6 Part 1: %d",total));
    //part 2
    Race partTwoRace = new Race(partTwoTime, partTwoDistance);
    partTwoRace.calculateWays();
    long partTwoTotal = partTwoRace.waysToWin;
    System.out.println(String.format("Day 6 Part 2: %d",partTwoTotal));
  }
}
