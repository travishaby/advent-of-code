import { getInput } from './get_input';
import * as path from 'path';

const fileName = path.parse(__filename).name
const puzzleInput = getInput(fileName)

// iterates over a list of binary numbers
// and determines the most common bit, 1 or 0, for the corresponding index
function extractBitExtremity(input: string[], index: number, extreme: 'min' | 'max'): string {
    const bitCounts: { [key: string]: number } = {
        '0': 0,
        '1': 0
    };

    for (const inputString of input) {
        const bit = inputString[index];
        bitCounts[bit]++;
    }

    let result: string;
    if (extreme === 'min') {
        const min = Math.min(...Object.values(bitCounts));
        result = min === bitCounts['0'] ? '0' : '1';
    } else {
        const max = Math.max(...Object.values(bitCounts));
        result = max === bitCounts['0'] ? '0' : '1';
    }
    return result
}

const mostCommonBits = puzzleInput[0].split('').map((_, index) => extractBitExtremity(puzzleInput, index, 'max'));
const gammaRate = parseInt(mostCommonBits.join(''), 2);

const leastCommonBits = puzzleInput[0].split('').map((_, index) => extractBitExtremity(puzzleInput, index, 'min'));
const epsilonRate = parseInt(leastCommonBits.join(''), 2);

console.log('Part 1 gammeRate: ', gammaRate);
console.log('Part 1 episilonRate: ', epsilonRate);
console.log('Part 1 Answer: ', gammaRate * epsilonRate);