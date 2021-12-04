import * as fs from 'fs';

export function getInput(file: string) {
    var name = file.split('.')[0];
    var inputFile = name + '.txt';
    return fs.readFileSync(inputFile).toString().split('\n').map(line => line.trim());
}