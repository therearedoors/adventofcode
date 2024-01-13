package DaySix;

import java.util.Arrays;

public class DaySix {
  int[] testTimes = {7,15,30};
  int[] testDistances = {9,40,200};
  int[] times;
  int[] distances;
  public DaySix(String[] input){
    times = cleanInput(input[0]);
    distances = cleanInput(input[1]);
  }

  private int[] cleanInput(String input) {
    return Arrays.stream(input.split(":")[1].split(" "))
    .map(String::trim)
    .filter(e -> e != "")
    .mapToInt(Integer::parseInt)
    .toArray();
  }

  public void testSolve(){
    int total = 1;
    for (int i=0;i<testTimes.length;i++){
      Race race = new Race(testTimes[i],testDistances[i]);
      race.calculateWays();
      total *= race.waysToWin;
    }
    System.out.println(String.format("Day 6 Part 1 test: %d", total));
  }

  public void solve(){
    int total = 1;
    for (int i=0;i<times.length;i++){
      Race race = new Race(times[i],distances[i]);
      race.calculateWays();
      total *= race.waysToWin;
    }
    System.out.println(String.format("Day 6 Part 1: %d",total));
  }
}
