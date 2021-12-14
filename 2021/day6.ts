import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

const initialState = puzzleInput[0].split(',').map(Number)

function buildFishMap(fish: number[]) {
    return fish.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1
        return acc
    }, {} as State)
}

// part 1

// Each day, a 0 becomes a 6 and adds a new 8 to the end of the list,
// while each other number decreases by 1 if it was present at the start of the day.
type State = {
    [timer: string]: number
}

// loop over the fish map, move the count of the fish from the previous
// timer to the next one, and add new fish with a timer of 8 for the count
// of fish that had a timer of 0, and the count of those fish to the count
// for the 6 timer
function tickDay(fishMap: State) {
    const newFishMap: State = {}
    Object.keys(fishMap).forEach(timer => {
        const count = fishMap[timer]
        if (timer === '0') {
            newFishMap[6] = (newFishMap[6] || 0) + count
            newFishMap[8] = count
            newFishMap[0] = 0
        } else {
            newFishMap[Number(timer) - 1] = (newFishMap[Number(timer) - 1] || 0) + count
        }
    })
    return newFishMap
}

let part1 = buildFishMap(initialState)

for (let i = 0; i < 80; i++) {
    part1 = tickDay(part1)
}

const fishCountPart1 = Object.values(part1).reduce((acc, curr) => acc + curr, 0) 
console.log('Part 2: ', fishCountPart1);

// part 2

let part2 = buildFishMap(initialState)

for (let i = 0; i < 256; i++) {
    part2 = tickDay(part2)
}

const fishCountPart2 = Object.values(part2).reduce((acc, curr) => acc + curr, 0) 
console.log('Part 2: ', fishCountPart2);