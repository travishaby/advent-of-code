# frozen_string_literal: true
# rubocop:disable all

require("#{__dir__}/get_input")

# input looks like: ..#.......#..##...#...#..#.#...
input = get_input(__FILE__)

processed_input = input.map do |row|
  row.strip.chars.map { |c| c != '.' }
end

# part 1

def traverse(delta_x, delta_y, rows)
  current_x = 0
  current_y = 0
  max_x = rows[0].size
  max_y = rows.size
  tree_count = 0
  while current_y <= max_y
    break unless rows[current_y]

    tree_count += 1 if rows[current_y][current_x]
    current_y += delta_y
    current_x += delta_x
    current_x -= max_x if current_x >= max_x
  end
  p "****** Answer for #{delta_x} #{delta_y}: *******"
  p tree_count
  p '*************************'
end

traverse(3, 1, processed_input)

# part 2

# Right 1, down 1.
traverse(1, 1, processed_input)
# Right 3, down 1. (This is the slope you already checked.)
traverse(3, 1, processed_input)
# Right 5, down 1.
traverse(5, 1, processed_input)
# Right 7, down 1.
traverse(7, 1, processed_input)
# Right 1, down 2.
traverse(1, 2, processed_input)
