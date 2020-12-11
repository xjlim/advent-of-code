const helper = require("../helper");
const input1 = helper.getInput("day05", "day05part1");
const input2 = helper.getInput("day05", "day05part2");

function binarySearch(arr, lo, hi, up, down) {
    for (let move of arr) {
        const mid = (lo + hi) >>> 1;
        if (move === up) {
            hi = mid;
        } else if (move === down) {
            lo = mid + 1;
        }
    }
    return lo;
}

function day05Part1(input) {
    let res = [];
    for (let encodedStr of input) {
        const rows = encodedStr.slice(0, -3);
        const cols = encodedStr.slice(-3);

        const finalRow = binarySearch(rows, 0, 127, "F", "B");
        const finalCol = binarySearch(cols, 0, 7, "L", "R");
        res.push(finalRow * 8 + finalCol);
    }
    return Math.max(...res);
}

function day05Part2(input) {
    let res = [];
    for (let encodedStr of input) {
        const rows = encodedStr.slice(0, -3);
        const cols = encodedStr.slice(-3);

        const finalRow = binarySearch(rows, 0, 127, "F", "B");
        const finalCol = binarySearch(cols, 0, 7, "L", "R");
        res.push(finalRow * 8 + finalCol);
    }

    // sort and find missing number
    res.sort((a, b) => a - b);
    let next = res[0];
    for (let num of res) {
        if (num !== next) {
            return next;
        }
        next++;
    }
}

console.log(day05Part1(input1));
console.log(day05Part2(input2));
