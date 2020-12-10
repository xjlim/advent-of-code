const helper = require("../helper");
const input1 = helper.getInput("day10", "day10part1");
const input2 = helper.getInput("day10", "day10part2");

function day10Part1(input) {
    let sorted = input
        .map(Number)
        .slice()
        .sort((a, b) => a - b);
    let prev = 0;
    let ones = 0;
    let threes = 1;
    for (let i = 0; i < sorted.length; i++) {
        curr = sorted[i];
        if (curr - prev === 1) {
            ones++;
        } else if (curr - prev === 3) {
            threes++;
        }
        prev = curr;
    }
    return ones * threes;
}

function backtrackDebug(input, start, prev, path) {
    // debug with path
    if (start === input.length) {
        return [path];
    }
    let total = [];
    for (let i = start; i < input.length; i++) {
        const curr = input[i];
        if (curr - prev <= 3) {
            total.push(...backtrack(input, i + 1, curr, path + "," + curr));
        } else {
            break;
        }
    }
    return total;
}

function backtrack(input, start, prev, memo) {
    const key = `${start}:${prev}`;
    if (key in memo) {
        return memo[key];
    }
    if (start === input.length) {
        return 1;
    }
    let total = 0;
    for (let i = start; i < input.length; i++) {
        const curr = input[i];
        if (curr - prev <= 3) {
            total += backtrack(input, i + 1, curr, memo);
        } else {
            break;
        }
    }
    memo[key] = total;
    return total;
}

function day10Part2(input) {
    let sorted = input
        .map(Number)
        .slice()
        .sort((a, b) => a - b);
    sorted.push(sorted[sorted.length - 1] + 3);
    return backtrack(sorted, 0, 0, {});
}

console.log(day10Part1(input1));
console.log(day10Part2(input2));
