package DayFour;

import java.util.Arrays;

public class Scratchcard {
  int[] winningNumbers;
  int[] numbersYouHave;

  public Scratchcard(String input) {
    String[] winningAndHad = input.split(" | ");
    String[] winningCard = winningAndHad[0].split(": ");
    System.out.println(String.format("Winning card: %s",Arrays.toString(winningCard));
    this.winningNumbers = Arrays.stream(winningCard[1].split(" "))
    .mapToInt(Integer::parseInt)
    .toArray();
    this.numbersYouHave = Arrays.stream(winningAndHad[1].split(" "))
    .mapToInt(Integer::parseInt)
    .toArray();
  }

  public int findWinners(){
    int count = 0;
    for (int wN : winningNumbers){
      boolean wins = Arrays.stream(numbersYouHave).anyMatch(n -> n==wN);
      if (wins){count++;}
    }
    return count;
  }
}
