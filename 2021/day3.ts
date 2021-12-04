import { getInput } from './get_input';
import * as path from 'path';

const fileName = path.parse(__filename).name
const puzzleInput = getInput(fileName)

const partOne = puzzleInput

console.log('Part 1 Answer: ', partOne);


