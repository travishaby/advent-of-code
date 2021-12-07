import { getInput } from './get_input';
import * as path from 'path';

const fileName = path.parse(__filename).name
const puzzleInput = getInput(fileName).map(bits => bits.split('').map(bit => parseInt(bit, 10)));

// Part 1

function countBitExtremity(input: number[][], extreme: 'max' | 'min'): number[] {
    // [ [0s, 1s], ... ]
    const bitCounts: [number, number][] = []
    
    input.forEach(bits => {
        bits.forEach((bit, index) => {
            if (!bitCounts[index]) bitCounts[index] = [0, 0]
            bitCounts[index][bit]++
        })
    })
    return bitCounts.map(counts => counts.indexOf(Math[extreme](...counts)))
}

const indicesOfMax = countBitExtremity(puzzleInput, 'max')
const gammaRate = parseInt(indicesOfMax.join(''), 2)
console.log('Part 1 gammeRate: ', gammaRate);

const indicesOfMin = countBitExtremity(puzzleInput, 'min')
const epsilonRate = parseInt(indicesOfMin.join(''), 2)
console.log('Part 1 episilonRate: ', epsilonRate);

console.log('Part 1 Answer: ', gammaRate * epsilonRate);

// Part 2

const exampleInput = [
    [0,0,1,0,0],
    [1,1,1,1,0],
    [1,0,1,1,0],
    [1,0,1,1,1],
    [1,0,1,0,1],
    [0,1,1,1,1],
    [0,0,1,1,1],
    [1,1,1,0,0],
    [1,0,0,0,0],
    [1,1,0,0,1],
    [0,0,0,1,0],
    [0,1,0,1,0]
]

/* 
For example, to determine the oxygen generator rating value using the same example diagnostic report from above:

Start with all 12 numbers and consider only the first bit of each number. There are more 1 bits (7) 
    than 0 bits (5), so keep only the 7 numbers with a 1 in the first position: 11110, 10110, 10111, 10101, 11100, 10000, and 11001.
Then, consider the second bit of the 7 remaining numbers: there are more 0 bits (4) than 1 bits (3), 
    so keep only the 4 numbers with a 0 in the second position: 10110, 10111, 10101, and 10000.
In the third position, three of the four numbers have a 1, so keep those three: 10110, 10111, and 10101.
In the fourth position, two of the three numbers have a 1, so keep those two: 10110 and 10111.
In the fifth position, there are an equal number of 0 bits and 1 bits (one each). So, to find the 
    oxygen generator rating, keep the number with a 1 in that position: 10111.
As there is only one number left, stop; the oxygen generator rating is 10111, or 23 in decimal.
*/

// if row has a 1 in the first position, put into one list,
// if row has a 0 in the first position, put into another list
const buckets: [number[][], number[][]] = [[], []]
const lineIndex = 0
const result = exampleInput.reduce((acc, row) => {
    acc[row[lineIndex]].push(row)
    return acc
}, buckets)
console.log(result);
