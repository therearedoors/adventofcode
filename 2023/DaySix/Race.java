package DaySix;

public class Race {
  long time;
  long distance;
  long waysToWin;

  public Race(long t, long d){
    this.time = t;
    this.distance = d;
    this.waysToWin = 0;
  }

  public void calculateWays(){
    for (long i=1;i<time;i++){
      long millisecondsPerMillimeter = i;
      long distanceTravelled = millisecondsPerMillimeter * (time-i);
      if (distanceTravelled > distance) {
        waysToWin++;
      }
    }
  }
}
