pub fn day2() {
  let input = include_str!("./inputs/day2.txt");
  let lines = input.trim().split("\n").collect::<Vec<&str>>();
  let mut frequencies = [0;256];
  let mut two_count = 0;
  let mut three_count = 0;
  let mut part_two_solution = String::new();
  for (i,line) in lines.iter().enumerate() {
    for char in line.chars() {
      frequencies[char as usize] += 1;
    }
    if frequencies.iter().any(|f|f==&2) {
      two_count += 1;
    }
    if frequencies.iter().any(|f|f==&3){
      three_count += 1;
    }
    frequencies = [0;256];
    //part two
    for n in 0..lines.len() {
      if i == n {continue}
      let mut line_to_check = line.chars();
      let mut count = 0;
      for char in lines[n].chars() {
        if line_to_check.next().unwrap() == char {
          count += 1;
        }
      }
      if count == line.len() - 1 {
        part_two_solution = line.chars().zip(lines[n].chars())
        .filter(|(n1,n2)|n1==n2)
        .map(|(n1,_n2)|n1)
        .collect::<String>();
      }
    }
  }
  print!("Day 2 Part 1 answer is {}\n",two_count * three_count);
  print!("Day 2 Part 2 answer is {}\n",part_two_solution);
}