package Utils;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class Matrix  {
    public Matrix (String[] input) {
        List<char[]> matrix = new ArrayList<>();
        for (String line : input) {
            char[] chars = line.toCharArray();
            matrix.add(chars);
        }
    }
}
