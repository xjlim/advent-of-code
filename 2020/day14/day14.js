const helper = require("../helper");
const input1 = helper.getInput("day14", "day14part1");
const input2 = helper.getInput("day14", "day14part2");

function maskBits(mask, binString) {
    let res = "";
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "X") {
            res += binString[i];
        } else {
            res += mask[i];
        }
    }
    // console.log(res);

    return parseInt(res, 2);
}

function day14Part1(input) {
    let mask = {};
    let mem = {};
    for (let code of input) {
        if (code.startsWith("mask")) {
            mask = code.split(" = ")[1];
        } else {
            let memoryCode = code.split(" = ");
            // ex 'mem[11841241]'
            const address = parseInt(memoryCode[0].slice(4));
            // 36 bit binary string
            const binString = Number(memoryCode[1])
                .toString(2)
                .padStart(36, "0");
            mem[address] = maskBits(mask, binString);
        }
    }
    // console.log(mem);
    return Object.values(mem).reduce((a, b) => a + b, 0);
}

function maskBits2(mask, binString) {
    let res = "";
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "0") {
            res += binString[i];
        } else {
            res += mask[i];
        }
    }
    // console.log(res);

    return res;
}

function generateAllAddresses(maskedBits, path = []) {
    if (path.length === maskedBits.length) {
        return [path.slice().join("")];
    }
    let all = [];
    let bit = maskedBits[path.length];
    if (bit === "X") {
        path.push("0");
        all = all.concat(generateAllAddresses(maskedBits, path));
        path.pop();
        path.push("1");
        all = all.concat(generateAllAddresses(maskedBits, path));
    } else {
        path.push(bit);
        all = all.concat(generateAllAddresses(maskedBits, path));
    }
    path.pop();
    return all;
}

function day14Part2(input) {
    let mask = {};
    let mem = {};
    for (let code of input) {
        if (code.startsWith("mask")) {
            mask = code.split(" = ")[1];
        } else {
            let memoryCode = code.split(" = ");
            // ex 'mem[11841241]'
            const address = parseInt(memoryCode[0].slice(4));
            // 36 bit binary string
            const binString = address.toString(2).padStart(36, "0");
            const maskedBits = maskBits2(mask, binString);
            const allAddresses = generateAllAddresses(maskedBits);
            // console.log(allAddresses);
            allAddresses.forEach(
                (address) => (mem[address] = Number(memoryCode[1]))
            );
        }
    }
    // console.log(mem);
    return Object.values(mem).reduce((a, b) => a + b, 0);
}

console.log(day14Part1(input1));
console.log(day14Part2(input2));
