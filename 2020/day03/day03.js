const helper = require("../helper");
const input1 = helper.getInput("day03", "day03part1");
const input2 = helper.getInput("day03", "day03part2");

function day03Part1(input) {
    let total = 0;
    let row = 1;
    let col = 3;
    const colLen = input[0].length;
    while (row < input.length) {
        encounter = input[row][col];
        // console.log('DEBUG', row, encounter);
        total += encounter === "#";
        row++;
        col = (col + 3) % colLen;
    }
    return total;
}

function day03Part2(input) {
    let row = 1;
    let slopes = [1, 3, 5, 7, 1];
    let cols = [1, 3, 5, 7, 1];
    let slopesTotal = [0, 0, 0, 0, 0];
    const colLen = input[0].length;
    while (row < input.length) {
        for (let i = 0; i < slopes.length; i++) {
            // for down 2 case, only process on even rows
            if (i === slopes.length - 1 && row % 2 === 1) continue;
            const col = cols[i];
            encounter = input[row][col];
            // console.log('DEBUG', row, col, encounter);
            slopesTotal[i] += encounter === "#";
            cols[i] = (cols[i] + slopes[i]) % colLen;
        }

        row++;
    }
    return slopesTotal.reduce((a, b) => a * b);
}

console.log(day03Part1(input1));
console.log(day03Part2(input2));
