package DayFour;

import DayFour.Scratchcard;
import java.util.ArrayList;
import java.util.List;

public class DayFour {

  String[] testNumbers = {
"Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
"Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
"Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
"Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
"Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
"Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"
  };
  List<Scratchcard> testScratchcards;
  List<Scratchcard> scratchcards;

  public DayFour(String[] input) {
    this.scratchcards = new ArrayList<Scratchcard>();
    this.testScratchcards = new ArrayList<Scratchcard>();
    int total = 0;
    int testTotal = 0;
    int cardTotal = 0;
    int testCardTotal = 0;
    for (String t : testNumbers){
      Scratchcard scratchcard = new Scratchcard(t);
      testScratchcards.add(scratchcard);
      testTotal += scratchcard.findAndRecordWinners();
    };
    Scratchcard[] testCardArray = new Scratchcard[testScratchcards.size()];
    testCardArray = testScratchcards.toArray(testCardArray);
    for (Scratchcard s : testCardArray){
      for (int i=0;i<s.count;i++){
        incrementWonCards(testCardArray, s.number, s.winningTotal);
      }
    }
    for (Scratchcard s : testCardArray){
      testCardTotal += s.count;
    }
    for (String i : input){
      Scratchcard scratchcard = new Scratchcard(i);
      scratchcards.add(scratchcard);
      total += scratchcard.findAndRecordWinners();
    };
    Scratchcard[] cardArray = new Scratchcard[scratchcards.size()];
    cardArray = scratchcards.toArray(cardArray);
    for (Scratchcard s : cardArray){
      for (int i=0;i<s.count;i++){
        incrementWonCards(cardArray, s.number, s.winningTotal);
      }
    }
    for (Scratchcard s : cardArray){
      cardTotal += s.count;
    }
    System.out.println(String.format("Day 4 Part 1: %d",total));
    System.out.println(String.format("Day 4 Part 2: %d",cardTotal));
  }

  private void incrementWonCards(Scratchcard[] cards, int number, int total){
    for (int i=number;i<number+total;i++){
        cards[i].increaseCount();
      }
  }
}
