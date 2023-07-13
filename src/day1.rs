use std::collections::HashMap;

fn find_key(lines: &Vec<i32>, freq: &mut HashMap<i32,bool>){
  let mut total = 0;
  'outer: loop {
    for n in lines.iter() {
        total = total + n;
        if freq.contains_key(&total) {
            print!("Day 1 Part 2 answer is {}\n",total);
            break 'outer;
        }
        freq.insert(total, true);
      }
    }
}

pub fn day1(){
  let input = include_str!("./inputs/day1.txt");
  let lines = input
  .trim()
  .split("\n")
  .map(|n|n.parse::<i32>().unwrap())
  .clone()
  .collect::<Vec<i32>>();
  //part one
  print!("Day 1 Part 1 answer is {}\n",&lines.iter().sum::<i32>());
  let mut frequencies = HashMap::new();
  find_key(&lines, &mut frequencies);
}