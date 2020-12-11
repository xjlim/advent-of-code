const helper = require("../helper");
const input1 = helper.getInput("day02", "day02part1");
const input2 = helper.getInput("day02", "day02part2");

function day02Part1(input) {
    let total = 0;
    for (let encodedStr of input) {
        const [policy, char, password] = encodedStr.split(" ");
        const [min, max] = policy.split("-");
        const count = password.split("").filter((x) => x === char[0]).length;
        // console.log('[DEBUG]', min, max, char, password, count);
        if (min <= count && count <= max) {
            total++;
        }
    }
    return total;
}

function day02Part2(input) {
    let total = 0;
    for (let encodedStr of input) {
        const [policy, char, password] = encodedStr.split(" ");
        const [first, second] = policy.split("-");
        const pass = password.split("");
        // console.log('[DEBUG]', pass[first-1], pass[second-1], char[0], pass);
        // XOR
        if ((pass[first-1] === char[0]) !== (pass[second-1] === char[0])) {
            total++;
        }
    }
    return total;
}

console.log(day02Part1(input1));
console.log(day02Part2(input2));
