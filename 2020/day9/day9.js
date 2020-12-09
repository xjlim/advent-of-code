const helper = require("../helper");
const input1 = helper.getInput("day9", "day9part1");
const input2 = helper.getInput("day9", "day9part2");

function twoSum(nums, target) {
    const pair = {};
    for (let num of nums) {
        if (target - num in pair) {
            return true;
        }
        pair[num] = true;
    }
    return false;
}

function day9Part1(input) {
    const parsedInput = input.map(Number);
    const SIZE = 25;
    let nums = [];
    for (let i = 0; i < SIZE; i++) {
        nums.push(parsedInput[i]);
    }
    for (let i = SIZE; i < parsedInput.length; i++) {
        const target = parsedInput[i];
        if (!twoSum(nums, target)) {
            return target;
        }
        nums.shift();
        nums.push(target);
    }
}

function day9Part2(input) {
    const invalid = day9Part1(input);
    const parsedInput = input.map(Number);
    let start = 0;
    let windowSum = 0;
    for (let end = 0; end < parsedInput.length; end++) {
        windowSum += parsedInput[end];
        while (windowSum > invalid) {
            windowSum -= parsedInput[start];
            start += 1;
        }

        if (windowSum === invalid) {
            const window = parsedInput.slice(start, end + 1);
            return Math.min(...window) + Math.max(...window);
        }
    }
}

console.log(day9Part1(input1));
console.log(day9Part2(input2));
