const helper = require("../helper");
const input1 = helper.getInput("day13", "day13part1");
const input2 = helper.getInput("day13", "day13part2");

function day13Part1(input) {
    const num = Number(input[0]);
    const buses = input[1]
        .split(",")
        .filter((x) => x !== "x")
        .map(Number);

    let minBus, minVal;
    for (let bus of buses) {
        const time = Math.ceil(num / bus) * bus;
        if (minVal === undefined || time < minVal) {
            minVal = time;
            minBus = bus;
        }
    }

    return minBus * (minVal - num);
}

function day13Part2(input) {
    // Find t such that t + v % buses[k] === 0 for each k,v
    // https://github.com/lizthegrey/adventofcode/blob/main/2020/day13.go

    // use map to preserve order
    const buses = input[1].split(",").reduce((acc, curr, i) => {
        if (curr === "x") {
            return acc;
        }
        acc.set(curr, i);
        return acc;
    }, new Map());
    let minValue = 0;
    let runningProduct = 1;
    for (let [k, v] of buses) {
        // minValue offset must be divisible by previous primes
        while ((minValue + v) % k !== 0) {
            minValue += runningProduct;
        }
        runningProduct *= k; // lcm of primes are product of them
        // console.log(k, v, minValue, runningProduct);
    }
    return minValue;
}

console.log(day13Part1(input1));
console.log(day13Part2(input2));
