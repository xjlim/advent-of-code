const helper = require("../helper");
const input1 = helper.getInput("day15", "day15part1");
const input2 = helper.getInput("day15", "day15part2");

function day15Part1(input) {
    let last = {};
    const parsedInput = input[0].split(",");
    let i;
    let prev;
    for (i = 1; i <= parsedInput.length; i++) {
        const curr = parsedInput[i - 1];
        if (!(curr in last)) {
            last[curr] = [];
        }
        last[curr].push(i);
    }
    prev = parsedInput[parsedInput.length - 1];
    while (i <= 2020) {
        if (last[prev].length < 2) {
            if (!("0" in last)) {
                last["0"] = [];
            }
            last["0"].push(i);
            prev = "0";
        } else {
            const arr = last[prev];
            const diff = arr[arr.length - 1] - arr[arr.length - 2];
            if (!(diff in last)) {
                last[diff] = [];
            }
            last[diff].push(i);
            prev = diff;
        }
        i++;
    }
    return prev;
}

function insert(arr, idx, val) {
    if (arr[idx].first === undefined) {
        arr[idx].first = val;
    } else if (arr[idx].second === undefined) {
        arr[idx].second = val;
    } else {
        arr[idx].first = arr[idx].second;
        arr[idx].second = val;
    }
}

function day15Part2(input) {
    // bucketized
    let last = Array.from({ length: 30000000 }, () => ({
        first: undefined,
        second: undefined,
    }));
    const parsedInput = input[0].split(",");
    let i;
    let prev;
    for (i = 1; i <= parsedInput.length; i++) {
        const curr = parsedInput[i - 1];
        insert(last, curr, i);
    }

    prev = parsedInput[parsedInput.length - 1];
    while (i <= 30000000) {
        if (last[prev].second === undefined) {
            insert(last, 0, i);
            prev = "0";
        } else {
            const diff = last[prev].second - last[prev].first;
            insert(last, diff, i);
            prev = diff;
        }
        // console.log(prev);
        i++;
    }
    return prev;
}

console.log(day15Part1(input1));
console.log(day15Part2(input2));
