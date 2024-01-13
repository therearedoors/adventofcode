package DaySix;

public class Race {
  int time;
  int distance;
  int waysToWin;

  public Race(int t, int d){
    this.time = t;
    this.distance = d;
    this.waysToWin = 0;
  }

  public void calculateWays(){
    for (int i=1;i<time;i++){
      int millisecondsPerMillimeter = i;
      int distanceTravelled = millisecondsPerMillimeter * (time-i);
      if (distanceTravelled > distance) {
        waysToWin++;
      }
    }
  }
}
