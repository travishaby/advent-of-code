import { getInput } from "./get_input";

const puzzleInput = getInput(__filename).map(line => line.split('').map(Number));

function compareAdjacentPositions(currentPosition: [number, number], heightmap: number[][]) {
    const [x, y] = currentPosition;
    const point = heightmap[y][x];
    const left = (heightmap[y] || [])[x - 1] ?? 10;
    const right = (heightmap[y] || [])[x + 1] ?? 10;
    const up = (heightmap[y - 1] || [])[x] ?? 10
    const down = (heightmap[y + 1] || [])[x] ?? 10;
    const isLow = point < left && point < right && point < up && point < down;
    return { isLow, pointRisk: point + 1 };
}

const result = puzzleInput.reduce((acc, row, y) => {
    return acc.concat(row.reduce((acc, _col, x) => {
        const { isLow, pointRisk } = compareAdjacentPositions([x, y], puzzleInput);
        if (isLow) acc.push(pointRisk);
        return acc
    }, [] as number[]))
}, []);

console.log('Part 1: ', result.reduce((acc, curr) => acc + curr, 0));