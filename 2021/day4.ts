import { getInput } from './get_input';
import * as path from 'path';

const fileName = path.parse(__filename).name
const puzzleInput = getInput(fileName)

const numbers: number[] = puzzleInput[0].split(',').map(Number)

type Board = [number, boolean][][]

const boards: Board[] = puzzleInput
    .slice(1)
    .reduce((acc, curr) => {
        if (curr === '') {
            acc.push([])
            return acc
        }
        acc[acc.length - 1].push(
            curr
            .split(' ')
            .filter(number => number !== '')
            // each entry is the number and whether it's been called
            .map(number => [Number(number.trim()), false])
        )
        return acc
    }, [] as any)


// Part 1
function markNumber(number: number, board: Board) {
    const row = board.findIndex(row => row.find(entry => entry[0] === number))
    const col = board[row].findIndex(entry => entry[0] === number)
    board[row][col][1] = true
}

function hasWinningColumn(board: Board) {
    for (let i = 0; i < board[0].length; i++) {
        if (board.every(row => row[i][1])) {
            return true
        }
    }
    return false
}

function hasWinningRow(board: Board) {
    return board.some(row => row.every(entry => entry[1]))
}

let winningNumber: number
let winner: Board | undefined

for (const number of numbers) {
    for (const board of boards) {
        markNumber(number, board)
    }
    winner = boards.find(board => {
        if (hasWinningColumn(board) || hasWinningRow(board)) {
            console.log('We have a winner!');
            console.log(board);
            return true
        }
    })
    if (winner) {
        winningNumber = number
        break
    }
}

function sumUnmarkedNumbers(board: Board) {
    return board.reduce((boardAcc, row) => {
        return boardAcc + row.reduce((acc, entry) => {
            if (!entry[1]) {
                return acc + entry[0]
            }
            return acc
        }, 0)
    }, 0)
}

const sum = sumUnmarkedNumbers(winner!)


console.log('Part 1, sum: ', sum);
console.log('Part 1, winning number: ', winningNumber!);
console.log('Part 1, Answer: ', sum * winningNumber!);