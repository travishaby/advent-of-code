import { getInput } from './get_input';

const puzzleInput = getInput(__filename)

type Point = [number, number];

const deltas: [Point, Point][] = puzzleInput.map(line => {
    return line
        .split(' -> ')
        .map(x => x.split(',').map(Number)) as [Point, Point]
})

// part 1

// takes two points and finds the slope of the line between them
function getSlope(points: [Point, Point]) {
    const [p1, p2] = points
    const xDiff = p2[0] - p1[0]
    const yDiff = p2[1] - p1[1]
    let slope = yDiff / xDiff
    if (slope === -0 || slope === -Infinity) slope = Math.abs(slope)
    return { slope, yDiff, xDiff }
}

type Line = {
    points: [Point, Point],
    slope: number,
    yDiff: number,
    xDiff: number
}

const lines = deltas.map(delta => {
    return {
        points: delta,
        ...getSlope(delta)
    }
})

// for part 1, we only care about straight lines
const straightLines = lines.filter(line => [Infinity, 0].includes(line.slope))

// FIXME: Need to dynamically calculate the size of the grid
// build an x by x grid of zeros
const straightLinesGraph = Array.from(Array(1000), _ => Array(1000).fill(0));

function markPointsForLines(lines: Line[], graph: number[][]) {
    lines.forEach(line => {
        // take the first point, move by one unit in the direction of
        // the slope until we reach the second point
        const { points: [p1, p2], yDiff, xDiff } = line
        const xDirection = xDiff === 0 ? 0 : Math.sign(xDiff) === 1 ? 1 : -1 
        const yDirection = yDiff === 0 ? 0 : Math.sign(yDiff) === 1 ? 1 : -1
        let currentPoint = p1
        while (currentPoint[0] !== p2[0] || currentPoint[1] !== p2[1]) {
            graph[currentPoint[1]][currentPoint[0]]++
            currentPoint = [currentPoint[0] + xDirection, currentPoint[1] + yDirection]
        }
        graph[currentPoint[1]][currentPoint[0]]++
    })
    return graph
}

const markedStraightLinesGraph = markPointsForLines(straightLines, straightLinesGraph)

const numStraightLineOverlaps = markedStraightLinesGraph.reduce((acc, row) => {
    return acc + row.reduce((acc, col) => {
        return acc + (col > 1 ? 1 : 0)
    }, 0)
}, 0)

console.log({ numStraightLineOverlaps })

// part 2


const diagonalLinesGraph = Array.from(Array(1000), _ => Array(1000).fill(0));

const markedDiagonalLinesGraph = markPointsForLines(lines, diagonalLinesGraph)

const numAllOverlaps = markedDiagonalLinesGraph.reduce((acc, row) => {
    return acc + row.reduce((acc, col) => {
        return acc + (col > 1 ? 1 : 0)
    }, 0)
}, 0)

console.log({ numAllOverlaps })
