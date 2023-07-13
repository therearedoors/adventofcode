use std::str::FromStr;
use std::error::Error;

struct Claim {
  id: usize,
  x_start: usize,
  y_start: usize,
  x_end: usize,
  y_end: usize,
}

impl FromStr for Claim {
  type Err = Box<dyn Error>;
  fn from_str(s: &str) -> Result<Claim,Self::Err> {
    let mut split = s.split(" @ ");
     let index = split.next().unwrap();
     let instructions = split.next().unwrap();
     let mut split = instructions.split(": ");
     let start_coords = split.next().unwrap();
     let range_coords = split.next().unwrap();
     let mut split_start = start_coords.split(",");
     let mut split_range = range_coords.split("x");
     let x_start = split_start.next().unwrap().parse::<usize>().unwrap();
     let y_start = split_start.next().unwrap().parse::<usize>().unwrap();
     let x_end = x_start + split_range.next().unwrap().parse::<usize>().unwrap();
     let y_end = y_start + split_range.next().unwrap().parse::<usize>().unwrap();
     Ok(Claim{id:index[1..].parse::<usize>().unwrap(),x_start,y_start,x_end,y_end})
  }
}

pub fn day3() {
   let input = include_str!("./inputs/day3.txt");
   let lines = input.trim().split("\n").collect::<Vec<&str>>();
   let mut claims: Vec<Claim> = vec![];
   let mut matrix: Vec<Vec<usize>> = vec![vec![0;1000];1000];
   for line in lines {
    let claim = line.parse::<Claim>().unwrap();
     for x in claim.x_start..claim.x_end {
       for y in claim.y_start..claim.y_end {
         matrix[x][y] += 1;
       }
     }
     claims.push(claim);
   }
  let mut count = 0;
   for i in 0..1000 {
     for j in 0..1000 {
       if matrix[i][j] > 1 {count += 1}
    }
  }
  print!("Day 3 Part 1 answer is {}\n",count);
  for claim in claims {
    let mut flag = true;
     for m in claim.x_start..claim.x_end {
      for n in claim.y_start..claim.y_end {
          if matrix[m][n] != 1 {flag = false};
      }
     }
     if flag == true {print!("Day 3 Part 2 answer is {}\n", claim.id)}
  }
}