# frozen_string_literal: true

require("#{__dir__}/get_input")

# part 1

input = get_input(__FILE__).map(&:to_i)
# completed in the console

# part 2
compliments1 = {}
compliments2 = {}
solution = []
input.each do |num1|
  comp = 2020 - num1
  compliments1[comp] = num1

  input.each do |num2|
    next if num2 > comp

    third = comp - num2
    compliments2[third] = num2
  end

  solution.push(num1) if compliments2[num1]
end
solution.push((2020 - solution[0]) - solution[1])
p solution
