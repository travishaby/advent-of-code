# frozen_string_literal: true

require("#{__dir__}/get_input")

# input looks like: 9-10 m: mmmmnxmmmwm
input = get_input(__FILE__)

processed = input.map do |line|
  policy, letter, password = line.split(' ')
  first, second = policy.split('-').map(&:to_i)

  {
    policy: [first, second],
    letter: letter[0],
    password: password
  }
end

# part 1

def validate_password_part_one(policy:, letter:, password:)
  occurences = password.count(letter)
  (policy[0]..policy[1]).cover? occurences
end

passes = processed.filter { |e| validate_password_part_one(e) }

p 'Part 1'
p passes.size
p '*************'

# part 2

def validate_password_part_two(policy:, letter:, password:)
  char_locations = password.chars.each_with_object({}).with_index do |(c, hash), index|
    hash[index + 1] = c
    hash
  end
  hits = policy.filter { |location| char_locations[location] == letter}
  hits.length == 1
end

passes = processed.filter { |e| validate_password_part_two(e) }

p 'Part 2'
p passes.size
p '*************'
