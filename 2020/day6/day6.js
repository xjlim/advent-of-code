const helper = require("../helper");
const input1 = helper.getInput("day6", "day6part1");
const input2 = helper.getInput("day6", "day6part2");

function day6Part1(input) {
    let total = 0;
    let i = 0;
    while (i < input.length) {
        let group = [];
        while (i < input.length && input[i]) {
            group = group.concat(input[i].split(""));
            i++;
        }
        total += new Set(group).size;
        i++;
    }
    return total;
}

function day6Part2(input) {
    let total = 0;
    let i = 0;
    while (i < input.length) {
        let isFirst = true;
        let group;
        while (i < input.length && input[i]) {
            const curr = input[i].split("");
            if (isFirst) {
                group = new Set(curr);
                isFirst = false;
            }
            // set intersection
            group = new Set(curr.filter((x) => group.has(x)));
            i++;
        }
        // console.log("[DEBUG]", group);
        total += group.size;
        i++;
    }
    return total;
}

console.log(day6Part1(input1));
console.log(day6Part2(input2));
