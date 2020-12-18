# frozen_string_literal: true

def get_input(file)
  name = file.split('.')[0]
  input_file = "#{name}.txt"
  File.open(input_file).readlines.map(&:chomp)
end
