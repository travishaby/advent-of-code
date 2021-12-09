import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

const numbers: number[] = puzzleInput[0].split(',').map(Number)

type Board = [number, boolean][][]

let boards: Board[] = 
    puzzleInput
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
    if (row === -1) return
    const col = board[row].findIndex(entry => entry[0] === number)
    if (col === -1) return
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


// Part 2

let lastBoard: Board
let lastWinningNumber: number

for (const number of numbers) {
    for (const board of boards) {
        markNumber(number, board)
    }
    // need to mark any boards as winners, and collect their index in the boards
    // collection for removal before the next iteration
    const winnersIndices = boards.reduce((acc, board, index) => {
        if (hasWinningColumn(board) || hasWinningRow(board)) {
            acc.push(index)
        }
        return acc
    }, [] as number[])

    // remove the winning board(s) from the list of boards if any exist
    if (winnersIndices.length) {
        // assuming there's only one winner on the last pass, stop looping
        if (boards.length <= 1) {
            lastWinningNumber = number
            lastBoard = boards[0]
            break
        }
        boards = boards.filter((_, index) => !winnersIndices.includes(index))
    }
}

const lastBoardSum = sumUnmarkedNumbers(lastBoard!)

console.log('Part 2, sum: ', lastBoardSum);
console.log('Part 2, winning number: ', lastWinningNumber!);
console.log('Part 2, Answer: ', lastBoardSum * lastWinningNumber!);