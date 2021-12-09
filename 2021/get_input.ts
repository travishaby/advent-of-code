import * as fs from 'fs';
import * as path from 'path';

export function getInput(filename: string) {
    const file = path.parse(filename).name
    var name = file.split('.')[0];
    var inputFile = name + '.txt';
    return fs.readFileSync(inputFile).toString().split('\n').map(line => line.trim());
}