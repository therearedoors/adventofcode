extern crate lazy_static;
extern crate regex;
use chrono::Local;

mod day1;
mod day2;
mod day3;
mod day4;
mod day5;

fn main() {
    println!("Timestamp: {}", Local::now());
    day1::day1();
    println!("Timestamp: {}", Local::now());
    day2::day2();
    println!("Timestamp: {}", Local::now());
    day3::day3();
    println!("Timestamp: {}", Local::now());
    day4::day4();
    println!("Timestamp: {}", Local::now());
    day5::day5();
}
