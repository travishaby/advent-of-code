# frozen_string_literal: true
# rubocop:disable all

require("#{__dir__}/get_input")

input = get_input(__FILE__)

# result is: {"eyr"=>"2024", "pid"=>"662406624", "hcl"=>"#cfa07d", "byr"=>"1947", "iyr"=>"2015", "ecl"=>"amb", "hgt"=>"150cm"}
processed_input = input.reduce([{}]) do |agg, line|
  agg.push({}) if line.empty?

  attrs = line.split(' ').reduce({}) do |agg, attr|
    pair = attr.split(':') 
    agg[pair[0]] = pair[1]
    agg
  end
  agg[-1] = agg[-1].merge(attrs)
  agg
end

# Part 1

# num_valid_passports = processed_input.count do |passport|
#   passport.tap { |p| p.delete('cid') }.keys.length == 7
# end

# p num_valid_passports

# Part 2

# byr (Birth Year) - four digits; at least 1920 and at most 2002.
# iyr (Issue Year) - four digits; at least 2010 and at most 2020.
# eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
# hgt (Height) - a number followed by either cm or in:
# If cm, the number must be at least 150 and at most 193.
# If in, the number must be at least 59 and at most 76.
# hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
# ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
# pid (Passport ID) - a nine-digit number, including leading zeroes.

def validate_field(key, value)
  mappings = {
    "byr" => ->(v) { (1920..2002).cover?(v.to_i) },
    "iyr" => ->(v) { (2010..2020).cover?(v.to_i) },
    "eyr" => ->(v) { (2020..2030).cover?(v.to_i) },
    "hgt" => ->(v) { 
      if v[-2..-1] == 'cm'
        (150..193).cover?(v[0..-3].to_i)
      elsif v[-2..-1] == 'in'
        (59..76).cover?(v[0..-3].to_i)
      else
        false
      end
     },
     "hcl" => ->(v) { /^[#]([0-9|a-f]){6}$/.match?(v) },
     "ecl" => ->(v) { %w(amb blu brn gry grn hzl oth).include?(v) },
     "pid" => ->(v) { /^[0-9]{9}$/.match?(v) }
  }
  mappings[key].call(value)
end

num_valid_passports = processed_input.count do |passport|
  passport.delete('cid')
  has_all_keys = passport.keys().length == 7
  all_validations_pass = passport.all? { |k, v| validate_field(k, v) }
  has_all_keys && all_validations_pass
end

p num_valid_passports