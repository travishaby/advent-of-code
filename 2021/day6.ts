import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

const initialState = puzzleInput[0].split(',').map(Number)

console.log(initialState)