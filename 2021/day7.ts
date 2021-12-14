import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

const positions = puzzleInput[0].split(',').map(Number)

// Part 1

// look at smallest number and largest number, check each number in between
// and sum the difference between each number and the rest of the numbers in the list
const minNum = Math.min(...positions)
const maxNum = Math.max(...positions)

// costs: [cost, horizontalPostition][]
let costs: [number, number][] = []
for (let i = minNum; i <= maxNum; i++) {
    const cost = positions.reduce((acc, curr) => {
        return acc + Math.abs(curr - i)
    }, 0)
    costs.push([cost, i])
}

const minCost = costs.reduce((acc, cur) => (acc[0] < cur[0]) ? acc : cur)
console.log('Part 1: ', minCost)

// Part 2

function getDynamicCost(difference: number) {
    let nonLinearCost = 0
    for (let j = 1; j <= difference; j++) {
        nonLinearCost += j
    }
    return nonLinearCost
}

// costs: [cost, horizontalPostition][]
let part2costs: [number, number][] = []
for (let i = minNum; i <= maxNum; i++) {
    // cost of movement is not linear, need to sum all the digits between the numbers
    const cost = positions.reduce((acc, curr) => {
        const difference = Math.abs(curr - i)
        return acc + getDynamicCost(difference)
    }, 0)
    part2costs.push([cost, i])
}

const part2minCost = part2costs.reduce((acc, cur) => (acc[0] < cur[0]) ? acc : cur)
console.log('Part 2: ', part2minCost)