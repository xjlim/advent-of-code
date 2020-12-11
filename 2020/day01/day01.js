const helper = require("../helper");
const input1 = helper.getInput("day01", "day01part1");
const input2 = helper.getInput("day01", "day01part2");

function day01Part1(input) {
    const pair = {};
    for (let num of input) {
        num = Number(num);
        if (2020 - num in pair) {
            console.log("[DEBUG]", num, 2020 - num);
            return num * (2020 - num);
        }
        pair[num] = true;
    }
}

function day01Part2(input) {
    for (let i = 0; i < input.length; i++) {
        const first = Number(input[i]);
        const pair = {};
        for (let j = i + 1; j < input.length; j++) {
            num = Number(input[j]);
            if (2020 - num - first in pair) {
                console.log("[DEBUG]", first, num, 2020 - num - first);
                return first * num * (2020 - num - first);
            }
            pair[num] = true;
        }
    }
}

console.log(day01Part1(input1));
console.log(day01Part2(input2));
