# frozen_string_literal: true
# rubocop:disable all

require("#{__dir__}/get_input")

input = get_input(__FILE__)

processed = input.map do |line|
  {
    row: line[0..-4].chars,
    seat: line[-3..-1].chars
  }
end

# Part 1

LAST_ROW = 127


ids = processed.map do |boarding_pass|
  rows = Range.new(0, 127).to_a
  row = boarding_pass[:row].reduce(rows) do |partition, direction|
    half = partition.length / 2
    if direction == 'F'
      partition[0..half - 1]
    elsif direction == 'B'
      partition[half..partition[-1]]
    end
  end

  seats = Range.new(0, 7).to_a
  seat = boarding_pass[:seat].reduce(seats) do |partition, direction|
    half = partition.length / 2
    if direction == 'L'
      partition[0..half - 1]
    elsif direction == 'R'
      partition[half..partition[-1]]
    end
  end

  (row[0] * 8) + seat[0] # return the id
end


# Part 2

sorted_ids = ids.sort
result = sorted_ids.index.with_index do |id, index|
  curr_plus_one = id + 1
  next_id = (sorted_ids[index + 1])
  curr_plus_one != next_id
end
p 'Missing seat is:'
p sorted_ids[result] + 1