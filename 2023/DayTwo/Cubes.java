package DayTwo;

public class Cubes {
    
    private int number;
    private Color color;

    public Cubes(String input) {
        String[] cubeRaw = input.split(" ");
        number = Integer.parseInt(cubeRaw[0]);
        switch (cubeRaw[1]){
            case "red":
                color = Color.RED;
                break;
            case "blue":
                color = Color.BLUE;
                break;
            case "green":
                color = Color.GREEN;
                break;
            default:
                color = Color.RED;
                break;
        }
    }

    public int getNumber() {
        return this.number;
    }

    public Color getColor() {
        return this.color;
    }
}
