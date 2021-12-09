import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

type Point = [number, number];

const deltas = puzzleInput.map(line => {
    return line.split(' -> ').map(x => x.split(',').map(Number))
})

console.log(deltas);
