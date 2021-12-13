import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

const initialState = puzzleInput[0].split(',').map(Number)

// part 1

// Each day, a 0 becomes a 6 and adds a new 8 to the end of the list,
// while each other number decreases by 1 if it was present at the start of the day.
function tickDay(fish: number[]) {
    const newFish: number[] = []
    const tickedFish = fish.reduce((acc, curr) => {
        if (curr === 0) {
            acc.push(6)
            newFish.push(8)
        } else {
            acc.push(curr - 1)
        }
        return acc
    }, [] as number[])
    return [...tickedFish, ...newFish]
}

const result = tickDay(initialState)

let current = [...initialState];
for (let i = 0; i < 80; i++) {
    current = tickDay(current)
}
console.log('Part 1: ', current.length);

// part 2
let part2 = [...initialState];
for (let i = 0; i < 256; i++) {
    part2 = tickDay(part2)
}
console.log('Part 2: ', part2.length);