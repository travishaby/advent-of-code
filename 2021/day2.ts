import { getInput } from './get_input';
import * as path from 'path';

const fileName = path.parse(__filename).name
const puzzleInput = getInput(fileName).map(command => {
    const [direction, scalar] = command.split(' ')
    return { direction, scalar: parseInt(scalar) }
});

const partOne = puzzleInput.reduce((acc, curr) => {
    if (curr.direction === 'forward') {
        acc.x += curr.scalar
    } else {
        const vector = curr.scalar * (curr.direction === 'down' ? 1 : -1) 
        acc.y += vector
    }
    return acc
}, {x: 0, y: 0})

console.log('Part 1 Answer: ', partOne.x * partOne.y);


const partTwo = puzzleInput.reduce((acc, curr) => {
    if (curr.direction === 'forward') {
        acc.x += curr.scalar
        acc.y += curr.scalar * acc.aim
    } else {
        const vector = curr.scalar * (curr.direction === 'down' ? 1 : -1) 
        acc.aim += vector
    }
    return acc
}, {x: 0, y: 0, aim: 0})

console.log('Part 2 results: ', { x: partTwo.x, y: partTwo.y, aim: partTwo.aim });
console.log('Part 2 Answer: ', partTwo.x * partTwo.y);