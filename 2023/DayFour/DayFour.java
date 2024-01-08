package DayFour;

public class DayFour {

  public DayFour(String[] input) {
    for (String i : input){
      Scratchcard scratchcard = new Scratchcard(i);
      scratchcard.findWinners();
    }
  }

  public void test(){
    System.out.println("heelo world");
  }
}
