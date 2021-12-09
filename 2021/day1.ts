import { getInput } from './get_input';

const puzzleInput = getInput(__filename).map(string => parseInt(string, 10));

const partOne = puzzleInput.reduce((acc, curr, index, input) => {
    const isIncrease = curr > input[index - 1];
    return isIncrease ? acc + 1 : acc;
}, 0);

console.log('Part 1 Answer: ', partOne);

function getThreeNumberWindow(index: number, input: number[]): number {
    const window = input.slice(index - 3, index);
    if (window.length < 3) return 0;
    return window.reduce((acc, curr) => acc + curr, 0);
}

const partTwo = puzzleInput.reduce((acc, _curr, index, input) => {
    if (index < 4) return acc;
    const isIncrease = getThreeNumberWindow(index, input) > getThreeNumberWindow(index - 1, input);
    return isIncrease ? acc + 1 : acc;
}, 0);

console.log('Part 2 Answer: ', partTwo);