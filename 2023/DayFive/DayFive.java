package DayFive;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class DayFive {
  long[] seeds;
  SeedMap seedToSoil = new SeedMap();
  SeedMap soilToFertilizer = new SeedMap();
  SeedMap fertilizerToWater = new SeedMap();
  SeedMap waterToLight = new SeedMap();
  SeedMap lightToTemperature = new SeedMap();
  SeedMap temperatureToHumidity = new SeedMap();
  SeedMap humidityToLocation = new SeedMap();
  SeedMap currentMap;
  SeedMap[] seedMaps = {
    null,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation
  };

  public DayFive(String[][] input) {
    for (int i=0;i<input.length;i++){
      switch (i){
        case 0:
          this.seeds = Arrays.stream(input[i][0].split(" "))
          .skip(1)
          .mapToLong(Long::parseLong)
          .toArray();
          break;
        case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          for (String line: input[i]){
            String[] mapValues = line.split(" ");
            seedMaps[i].put(
              Long.parseLong(mapValues[1]),
              new Destination(
                Long.parseLong(mapValues[0]),
                Long.parseLong(mapValues[2])
              ));
        }
      }
    }
  }

  public void solve(){
    long lowestLocationNumber = Long.MAX_VALUE;
    long currentMappedValue;
    for (int i=0;i<seeds.length;i++){
      long seed = seeds[i];
      currentMappedValue = seed;
      for (int j=1;j<seedMaps.length;j++){
        SeedMap currentMap = seedMaps[j];
        for (long source: currentMap.keySet()){
          Destination destination = currentMap.get(source);
          if (currentMappedValue >= source && currentMappedValue <= source + destination.range){
            currentMappedValue = destination.value + (currentMappedValue - source);
            break;
          }
        }
      };
      lowestLocationNumber = Math.min(lowestLocationNumber, currentMappedValue);
    }
    System.out.println(String.format("Day 5 Part 1: %d", lowestLocationNumber));
    }
}
