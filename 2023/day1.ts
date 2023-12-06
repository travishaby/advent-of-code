import { getInput } from "./get_input";

const puzzleInput: string[] = getInput(__filename);

// Part 1
function justNumbers(line: string) {
  return line.replace(/\D/g, "");
}
const justNumbersResult = puzzleInput.map(justNumbers);
function alwaysTwoNumbers(line: string) {
  if (line.length === 1) {
    line = line + line;
  } else {
    line = line.charAt(0) + line.charAt(line.length - 1);
  }
  return line;
}
const alwaysTwoNumbersResult = justNumbersResult.map(alwaysTwoNumbers);
const sumOfNumbers = alwaysTwoNumbersResult.reduce(
  (a, b) => a + parseInt(b),
  0
);
console.log("The answer to Part 1 is...");
console.log(sumOfNumbers);

// Part 2

// https://adventofcode.com/2023/day/1#part2
const wordsToNumbersMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
  zero: "0",
} as const;

type NumberWords = keyof typeof wordsToNumbersMap;

const numberWords = Object.keys(wordsToNumbersMap) as NumberWords[];

const wordsToNumbers = puzzleInput.map((line) => {
  return line.split("").reduce((agg, char) => {
    const nextAgg = agg + char;
    const matchingNumberWord = numberWords.find((key) => nextAgg.includes(key));
    if (matchingNumberWord) {
      return nextAgg.replace(
        matchingNumberWord,
        wordsToNumbersMap[matchingNumberWord]
      );
    }
    return agg + char;
  }, "");
});
const partTwoResult = wordsToNumbers
  .map(justNumbers)
  .map(alwaysTwoNumbers)
  .reduce((a, b) => a + parseInt(b), 0);
console.log(partTwoResult);
