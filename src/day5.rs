type Letter = usize;
type Length = usize;

pub fn day5() {
  let input = include_str!("./inputs/day5.txt");
  let mut polymers = input.trim().to_owned();
  let part_one_solution = find_and_remove_units(&mut polymers,0);
  println!("Day 5 Part 1 Solution is {}",part_one_solution.len());
  let mut min: (Letter, Length) = (0,10000);
  for v in 65..90 {
    let as_u8 = v as u8;
    let lower_case = as_u8 + 32;
    let mut polymers_clone = polymers.replace(as_u8 as char,"");
    let mut polymers_clone = polymers_clone.replace(lower_case as char,"");
    let prospective_min = find_and_remove_units(&mut polymers_clone, 0);
    if prospective_min.len() < min.1 {
      min.0 = v;
      min.1 = prospective_min.len();
    }
  }
  println!("Day 5 Part 2 Solution is {} {} ", min.0, min.1);
}

fn find_and_remove_units(slice: &mut String, start: u32) -> &mut String {
  let mut last = '?';
  let mut count: u32 = 0;
    for (i,ch) in slice[start as usize..slice.len()].chars().enumerate() {
      let comparison = last as i8 - ch as i8;
      let inc = i + start as usize;
      if comparison == 32 || comparison == -32 {
        slice.replace_range(inc-1..=inc, "");
        return find_and_remove_units(slice, count.saturating_sub(2));
      }
      count += 1;
      last = ch;
  }
  return slice
}

#[cfg(test)]
mod tests {
  use super::*;
#[test]
fn solves_basic_string(){
  let mut test_str = "dfFg".to_owned();
  let res = find_and_remove_units(&mut test_str, 0);
  assert_eq!(*res, "dg".to_owned());
}

#[test]
fn solves_another_basic_string(){
  let mut test_str = "MmMmMxcRrCmMA".to_owned();
  let res = find_and_remove_units(&mut test_str, 0);
  assert_eq!(*res, "MxA");
}
}