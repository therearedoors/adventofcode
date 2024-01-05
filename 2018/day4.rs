use std::collections::HashMap;
use std::str::FromStr;
use std::error::Error;

type Day = usize;
type Month = usize;
type ShiftDate = (Month, Day);
type Guard = usize;
type Shift = [Wakefulness;60];
type Minute = usize;
type Count = usize;

#[derive(Debug, Clone, Copy)]
enum Wakefulness {
  Asleep,
  Awake,
  Unknown
}

use Wakefulness::{Asleep, Awake, Unknown};

struct Record {
  timestamp: Timestamp,
  guard: Guard,
}

struct Timestamp {
  month: usize,
  day: usize,
  _hour: usize,
  minute: usize,
}

impl Timestamp {
  fn shift_date(&self) -> ShiftDate {
    (self.month, self.day)
  }
}

impl FromStr for Timestamp {
  type Err = Box<dyn Error>;
  fn from_str(s: &str) -> Result<Timestamp,Self::Err> {
    let get_usize = |i:usize,j:usize| s[i..j].parse::<usize>().unwrap();
    let month = get_usize(6,8);
    let day = get_usize(9,11);
    let _hour = get_usize(12,14);
    let minute = get_usize(15,17);
    Ok(Timestamp{month, day, _hour, minute})
  }
}

impl FromStr for Record {
  type Err = Box<dyn Error>;
  fn from_str(s: &str) -> Result<Record,Self::Err> {
    let mut split = s.split(" Guard #");
    let mut timestamp = split.next().unwrap().parse::<Timestamp>().unwrap();
    if timestamp.minute > 44 { 
      match timestamp.month {
        2 => {
          if timestamp.day == 28 {timestamp.month += 1;}
          timestamp.day = (timestamp.day + 1) % 28;
        },
        4|6|9|11 => {
          if timestamp.day == 30 {timestamp.month += 1;}
          timestamp.day = (timestamp.day + 1) % 30;
        },
        _ => {
          if timestamp.day == 31 {timestamp.month += 1;}
          timestamp.day = (timestamp.day + 1) % 31;
        },
      };
    }
    let mut split = split.next().unwrap().split(" begins");
    let guard = split.next().unwrap().parse::<usize>().unwrap();
    return Ok(Record{timestamp, guard})
  }
}

fn parse_input() -> &'static str {
  include_str!("./inputs/day4.txt")
}

fn split_input(input: &str) -> Vec<&str> {
  input.trim().split("\n").collect::<Vec<&str>>()
}

fn get_schedule_and_shifts(lines : Vec<&str>) -> (HashMap<ShiftDate,Guard>, HashMap<Guard,HashMap<ShiftDate,Shift>>) {
  let mut schedule: HashMap<ShiftDate,Guard> = HashMap::new();
  let mut guard_shifts: HashMap<Guard,HashMap<ShiftDate,Shift>> = HashMap::new();
  lines.iter().for_each(|line|
    if line.find("Guard").is_some() {
      let record = line.parse::<Record>().unwrap();
      schedule.insert(record.timestamp.shift_date(),record.guard);
      let current_guard_shifts = guard_shifts.entry(record.guard).or_insert(HashMap::new());
      current_guard_shifts.entry(record.timestamp.shift_date()).or_insert([Wakefulness::Unknown;60]);
    } else {
      if line.find("falls").is_some() {
        let mut split = line.split(" falls");
        let timestamp = split.next().unwrap().parse::<Timestamp>().unwrap();
        let current_guard = schedule.get(&timestamp.shift_date()).unwrap_or(&0);
        guard_shifts.entry(*current_guard).and_modify(|shifts|{
        shifts.entry(timestamp.shift_date()).and_modify(|s|{
            s[timestamp.minute] = Asleep;
          });
      });
      }
      if line.find("wakes").is_some() {
        let mut split = line.split(" wakes");
        let timestamp = split.next().unwrap().parse::<Timestamp>().unwrap();
        let current_guard = schedule.get(&timestamp.shift_date()).unwrap_or(&0);
        guard_shifts.entry(*current_guard).and_modify(|shifts|{
        shifts.entry(timestamp.shift_date()).and_modify(|s|{
            s[timestamp.minute] = Awake;
          });
        });
      }
    }
  );
  (schedule, guard_shifts)
}

fn calculate_sleepiest_minute(guard_shifts: &mut HashMap<Guard,HashMap<ShiftDate,Shift>>) -> (Guard, Count, Minute) {
  let mut max: (Guard, Count, Minute) = (0,0,0);
  for (guard, shifts) in guard_shifts.iter_mut() {
    let mut counts = [0;60];
    for ((_month, _day), shift) in shifts {
        let mut wakefulness = Awake;
        for i in 0..60 {
          match shift[i] {
            Unknown => {
              match wakefulness {
                Awake => {shift[i] = Wakefulness::Awake},
                Asleep => {shift[i] = Wakefulness::Asleep},
                _ => {()},
              };
            },
            Asleep => {
              wakefulness = Asleep;
            },
            Awake => {
              wakefulness = Awake;
            }
          };
        }
        for m in 0..60 {
          match shift[m] {
            Asleep => {
              counts[m] += 1;
            },
            Awake => {()},
            Unknown => panic!("didn't populate in first pass")
          };
        }
        let minutes_asleep = counts.iter().sum::<usize>();
        if minutes_asleep > max.1 {
          let max_times_spent_asleep_a_minute = counts.iter().max().unwrap();
          let max_minute = counts.iter().position(|m|m == max_times_spent_asleep_a_minute).unwrap();
          max = (*guard,minutes_asleep,max_minute)
        }
      }
    }
    max
}

pub fn day4() -> (Guard, Minute) {
  let input = parse_input();
  let mut lines = split_input(input);
  lines.sort();
  let (_schedule, mut guard_shifts) = get_schedule_and_shifts(lines);
  let max = calculate_sleepiest_minute(&mut guard_shifts);
  let mut max_part_two: (Guard, Count, Minute) = (0,0,0);
  for (guard, shifts) in guard_shifts {
    let mut counts = [0;60];
    for ((_month, _day), shift) in shifts {
      for i in 0..60 {
        match shift[i] {
          Asleep => {counts[i] += 1},
          _ => {()}
      }
    }
  }
    let current_guard_max = *counts.iter().max().unwrap();
    let max_minute = counts.iter().position(|m|m == &current_guard_max).unwrap();
    if current_guard_max > max_part_two.1 {
      max_part_two.0 = guard;
      max_part_two.1 = current_guard_max;
      max_part_two.2 = max_minute;
    }
  }
  print!("Day 4 Part 1 answer is {} {} {}\n",max.0,max.2, max.0 * max.2);
  print!("Day 4 Part 2 answer is {} {} {}\n", max_part_two.0,max_part_two.2,max_part_two.0 * max_part_two.2);
  (max.0, max.2)
}

#[cfg(test)]
mod tests {
  use super::*;
    #[ignore]
    #[test]
    fn parses_and_splits_input(){
      let input = split_input(parse_input());
      assert!(input.len() == 1045);
    }

    #[ignore]
    #[test]
    fn extracts_data(){
      let lines = vec!["[1518-07-26 23:50] Guard #487 begins shift"];
      let (schedule, _guard_shifts) = get_schedule_and_shifts(lines);
      assert_eq!(schedule.get(&(7,27)).unwrap(), &487);
    }

    #[test]
    fn tracks_days_from_multiple_months(){
      let lines = vec![
        "[1518-07-26 23:50] Guard #487 begins shift",
        "[1518-06-26 23:51] Guard #1471 begins shift",
        "[1518-05-11 23:58] Guard #641 begins shift",
        "[1518-04-21 00:01] Guard #1889 begins shift"
      ];
      let (schedule, _guard_shifts) = get_schedule_and_shifts(lines);
      assert_eq!(schedule.get(&(7,27)).unwrap(), &487);
      assert_eq!(schedule.get(&(6,27)).unwrap(), &1471);
    }

}