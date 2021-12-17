import { getInput } from "./get_input";

const puzzleInput = getInput(__filename);

const patterns = puzzleInput.map((line) => line.split(" | "));
const chunked = patterns.map((line) =>
  line.map((lineChunk) => lineChunk.split(" "))
);

// Part 1

const uniqueLengthDigitMapping = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
};

const uniqueLengthDigits = Object.keys(uniqueLengthDigitMapping);

const count = chunked.reduce((acc, [_input, output]) => {
  return (
    acc +
    output.reduce((acc, digit) => {
      return acc + (uniqueLengthDigits.includes(String(digit.length)) ? 1 : 0);
    }, 0)
  );
}, 0);

// Part 2

// need to understand which letters are in which positions
// for each new line, then use that deduction to decode
const outputs = chunked.reduce((numAgg, [input, output]) => {
  let positions: { [key: string]: string } = {};
  type StringToString = {
    [key: string]: string;
  };
  let mapping: { [key: string]: number } = {};

  function getUniqueDigitsChars(input: string[]) {
    return input.reduce((acc, digit) => {
      if (uniqueLengthDigits.includes(String(digit.length))) {
        acc[
          uniqueLengthDigitMapping[
            digit.length as keyof typeof uniqueLengthDigitMapping
          ]
        ] = digit;
      }
      return acc;
    }, {} as StringToString);
  }
  const uniqueDigits = getUniqueDigitsChars(input);

  function getTop(uniqueDigits: StringToString) {
    const oneChars = uniqueDigits[1].split("");
    return uniqueDigits[7]
      .split("")
      .filter((chunk) => !oneChars.includes(chunk))[0];
  }

  const top = getTop(uniqueDigits);
  positions = { ...positions, ...{ top } };

  const length6Chars = input
    .filter((digit) => digit.length === 6)
    .map((digit) => digit.split(""));
  const length5Chars = input
    .filter((digit) => digit.length === 5)
    .map((digit) => digit.split(""));

  // length of 4 (4) minus length of 2 (1) is just the middle and top left,
  // and two the length 5 chars should have the middle but not the top left
  function getTopLeft(uniqueDigits: StringToString, length5Chars: string[][]) {
    const oneChars = uniqueDigits[1].split("");
    const middleAndTopLeft = uniqueDigits[4]
      .split("")
      .filter((chunk) => !oneChars.includes(chunk));
    return middleAndTopLeft.find((char) => {
      return length5Chars.filter((chars) => chars.includes(char)).length === 1;
    })!;
  }

  const topLeft = getTopLeft(uniqueDigits, length5Chars);
  positions = { ...positions, ...{ topLeft } };

  // 4, minus 1, minus the top left is the middle
  function getMiddle(uniqueDigits: StringToString, positions: StringToString) {
    const fourChars = uniqueDigits[4].split("");
    const oneChars = uniqueDigits[1].split("");
    return fourChars.filter(
      (char) => char !== positions.topLeft && !oneChars.includes(char)
    )[0];
  }

  const middle = getMiddle(uniqueDigits, positions);
  positions = { ...positions, ...{ middle } };

  // Out of 0, 6 and 9, 6 and 9 both have the middle, 9 has all of 1
  function getNineAndSix(
    length6Chars: string[][],
    positions: StringToString,
    uniqueDigits: StringToString
  ) {
    const sixAndNine = length6Chars.filter((chars) =>
      chars.includes(positions.middle)
    );
    const [six, nine] = sixAndNine.reduce((acc, chars) => {
      const isNine = uniqueDigits[1]
        .split("")
        .every((char) => chars.includes(char));
      if (isNine) {
        acc[1] = chars.join("");
      } else {
        acc[0] = chars.join("");
      }
      return acc;
    }, []);
    return { [six]: 6, [nine]: 9 };
  }

  mapping = {
    ...mapping,
    ...getNineAndSix(length6Chars, positions, uniqueDigits),
  };

  // Out of 0, 6 and 9, 0 is the one without the middle
  function getZero(length6chars: string[][], positions: StringToString) {
    const zero = length6chars
      .filter((chars) => !chars.includes(positions.middle))[0]
      .join("");
    return { [zero]: 0 };
  }
  mapping = { ...mapping, ...getZero(length6Chars, positions) };

  // Out of 5, 2 and 3, only 3 has all of 1
  function getThree(length5Chars: string[][], uniqueDigits: StringToString) {
    const oneChars = uniqueDigits[1].split("");
    const three = length5Chars
      .find((chars) => oneChars.every((char) => chars.includes(char)))!
      .join("");
    return { [three]: 3 };
  }
  mapping = { ...mapping, ...getThree(length5Chars, uniqueDigits) };

  const three = Object.entries(mapping).find(
    ([_key, value]) => value === 3
  )![0];
  // Out of 5 and 2, only 5 has the top left
  function getFiveAndTwo(
    length5Chars: string[][],
    three: string,
    positions: StringToString
  ) {
    const fiveAndTwo = length5Chars.filter((chars) => chars.join("") !== three);
    const [five, two] = fiveAndTwo.reduce((acc, chars) => {
      const isFive = chars.includes(positions.topLeft);
      if (isFive) {
        acc[0] = chars.join("");
      } else {
        acc[1] = chars.join("");
      }
      return acc;
    }, []);
    return { [five]: 5, [two]: 2 };
  }

  mapping = { ...mapping, ...getFiveAndTwo(length5Chars, three, positions) };

  const uniqueLengthChars = Object.fromEntries(
    Object.entries(uniqueDigits).map(([key, value]) => [value, Number(key)])
  );
  mapping = { ...mapping, ...uniqueLengthChars };

  mapping = Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [
      key.split("").sort().join(""),
      value,
    ])
  );
  const result = output.map(
    (digit) => mapping[digit.split("").sort().join("")]
  );
  numAgg.push(result);
  return numAgg;
}, [] as number[][]);

const nums = outputs.map((item) => Number(item.join("")));
console.log(
  "Part 2: ",
  nums.reduce((acc, num) => acc + num, 0)
);
