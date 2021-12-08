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
console.log('Part 1, gammeRate: ', gammaRate);

const indicesOfMin = countBitExtremity(puzzleInput, 'min')
const epsilonRate = parseInt(indicesOfMin.join(''), 2)
console.log('Part 1, episilonRate: ', epsilonRate);

console.log('Part 1, Answer: ', gammaRate * epsilonRate);

// Part 2

function groupLines(lines: number[][], lineIndex: number, commonness: 'most' | 'least'): number[] {
    // break the recursion if we're at the end of the list
    if (lines.length === 1) return lines[0]

    const buckets: [number[][], number[][]] = [[], []]
    const [zeros, ones] = lines.reduce((acc, row) => {
        acc[row[lineIndex]].push(row)
        return acc
    }, buckets)

    const comparison = commonness === 'most' ? zeros.length > ones.length : zeros.length <= ones.length
    const newLines = comparison ? zeros : ones

    return groupLines(newLines, lineIndex + 1, commonness)
}

const oxygenRatingBits = groupLines(puzzleInput, 0, 'most')
const oxygenRating = parseInt(oxygenRatingBits.join(''), 2)
console.log('Part 2, Oxygen rating: ', oxygenRating)

const CO2RatingBits = groupLines(puzzleInput, 0, 'least')
const CO2Rating = parseInt(CO2RatingBits.join(''), 2)
console.log('Part 2, CO2 rating: ', CO2Rating)

console.log('Part 2, Answer: ', oxygenRating * CO2Rating);