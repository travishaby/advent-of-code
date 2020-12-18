# frozen_string_literal: true
# rubocop:disable all

require("#{__dir__}/get_input")

input = get_input(__FILE__)

processed = input.reduce([[]]) do |agg, line|
  if line.empty?
    agg.push([])
  else
    agg[-1].push(line.chars)
  end
  agg
end

# Part 1
count = processed.reduce(0) do |count, group|
  g_count = group.reduce([]) { |gc, ans| (gc + ans).uniq }
  count + g_count.size
end

p 'part 1'
p count

# Part 2

all_answered_count = processed.reduce(0) do |count, group|
  group_answers = group.reduce(group[0]) { |gc, ans| gc & ans }
  count + group_answers.size
end

p 'part 2'
p all_answered_count