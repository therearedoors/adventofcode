package DayFour;

import java.util.Arrays;

public class Scratchcard {
  public int number;
  int[] winningNumbers;
  int[] numbersYouHave;
  public int count;
  public int winningTotal;

  public Scratchcard(String input) {
    this.count = 1;
    this.winningTotal = 0;
    String[] winningAndHad = input.split(" \\| ");
    String[] winningCard = winningAndHad[0].split("\\: ");
    this.number = Integer.parseInt(
      Arrays.stream(winningCard[0].split(" "))
      .map(String::trim)
      .filter(e -> e != "")
      .toArray(String[]::new)[1]);
    this.winningNumbers = Arrays.stream(winningCard[1].split(" "))
    .map(String::trim)
    .filter(e -> e != "")
    .mapToInt(Integer::parseInt)
    .toArray();
    this.numbersYouHave = Arrays.stream(winningAndHad[1].split(" "))
    .map(String::trim)
    .filter(e -> e != "")
    .mapToInt(Integer::parseInt)
    .toArray();
  }

  public int findAndRecordWinners(){
    int count = 0;
    for (int wN : winningNumbers){
      boolean wins = Arrays.stream(numbersYouHave).anyMatch(n -> n==wN);
      if (wins){count++;}
    }
    winningTotal += count;
    return calcPower(count);
  }

  public void increaseCount(){
    count++;
  }

  public int calcPower(int count){
    int total = 0;
    for (int i=0;i<count;i++){
      if (i==0){total=1;}
      else {total*=2;}
    }
    return total;
  }
}
