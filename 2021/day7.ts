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
console.log(minCost)