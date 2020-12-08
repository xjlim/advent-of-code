const helper = require("../helper");
const input1 = helper.getInput("day8", "day8part1");
const input2 = helper.getInput("day8", "day8part2");

function day8Part1(input) {
    let i = 0;
    let seen = new Set();
    let val = 0;
    while (i < input.length) {
        if (seen.has(i)) {
            return val;
        }
        seen.add(i);
        const [op, num] = input[i].split(" ");
        if (op === "nop") {
            i++;
        } else if (op === "acc") {
            val += Number(num);
            i++;
        } else if (op === "jmp") {
            i += Number(num);
        }
    }
}

function run(input) {
    let i = 0;
    let seen = new Set();
    let val = 0;
    while (i < input.length) {
        if (seen.has(i)) {
            return [false, val];
        }
        seen.add(i);
        const [op, num] = input[i].split(" ");
        if (op === "nop") {
            i++;
        } else if (op === "acc") {
            val += Number(num);
            i++;
        } else if (op === "jmp") {
            i += Number(num);
        }
    }
    return [true, val];
}

function day8Part2(input) {
    // try changing all jmps to nop
    for (let i = 0; i < input.length; i++) {
        if (!input[i].startsWith("jmp")) continue;

        let newInput = input.slice();
        newInput[i] = "nop -1";
        const [status, val] = run(newInput);
        if (status) {
            return val;
        }
    }
}

console.log(day8Part1(input1));
console.log(day8Part2(input2));
