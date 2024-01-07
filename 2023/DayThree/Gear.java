package DayThree;
import java.util.List;
import java.util.ArrayList;

public class Gear {
  int x;
  int y;
  char value;
  List<Number> partNumbers;

  public Gear(int x, int y, char value){
    this.x = x;
    this.y = y;
    this.value = value;
    this.partNumbers = new ArrayList<Number>();
  }

  int getGearRatio(){
    return Integer.parseInt(partNumbers.get(0).getValue()) * Integer.parseInt(partNumbers.get(1).getValue());
  }

  public String asString() {
    return String.format("%d %d %s",x,y,value);
  }
}