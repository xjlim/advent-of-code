const helper = require("../helper");
const input1 = helper.getInput("day04", "day04part1");
const input2 = helper.getInput("day04", "day04part2");

function day04Part1(input) {
    const required = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]);
    let total = 0;
    let i = 0;
    while (i < input.length) {
        let count = 0;
        while (i < input.length && input[i]) {
            const str = input[i].split(" ");
            count += str.reduce(
                (acc, curr) => acc + required.has(curr.split(":")[0]),
                0
            );
            i++;
        }
        total += count === required.size;
        i++;
    }
    return total;
}

function day04Part2(input) {
    const required = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]);
    const isValid = (field) => {
        const [name, value] = field.split(":");
        if (!required.has(name)) {
            return false;
        }

        // field validation
        if (name === "byr") {
            return Number(value) >= 1920 && Number(value) <= 2002;
        } else if (name === "iyr") {
            return Number(value) >= 2010 && Number(value) <= 2020;
        } else if (name === "eyr") {
            return Number(value) >= 2020 && Number(value) <= 2030;
        } else if (name === "hgt") {
            const metric = value.slice(-2);
            if (metric === "in") {
                const val = Number(value.slice(0, -2));
                return val >= 59 && val <= 76;
            } else if (metric === "cm") {
                const val = Number(value.slice(0, -2));
                return val >= 150 && val <= 193;
            }
        } else if (name === "hcl") {
            return /#[0-9a-f]{6}/.test(value);
        } else if (name === "ecl") {
            return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
                value
            );
        } else if (name === "pid") {
            return !Number.isNaN(Number(value)) && value.length === 9;
        }
        return false;
    };
    let total = 0;
    let i = 0;
    while (i < input.length) {
        let count = 0;
        while (i < input.length && input[i]) {
            const str = input[i].split(" ");
            count += str.reduce((acc, curr) => acc + isValid(curr), 0);
            i++;
        }
        total += count === required.size;
        i++;
    }
    return total;
}

console.log(day04Part1(input1));
console.log(day04Part2(input2));
