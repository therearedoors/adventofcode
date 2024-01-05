package DayThree;

import java.util.List;
import java.util.ArrayList;

public class Number {
    List<Digit> digits;

    public Number(Digit digit) {
        this.digits = new ArrayList<Digit>();
        this.digits.add(digit);
    }

    public String getValue() {
        String value = "";
        for (Digit digit : digits) {
            value = value + Character.toString(digit.value);
        }
        return value;
    }
}
