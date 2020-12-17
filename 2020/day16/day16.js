const helper = require("../helper");
const input1 = helper.getInput("day16", "day16part1");
const input2 = helper.getInput("day16", "day16part2");

function hasMatch(num, intervals) {
    // can use binary search here
    for (let [start, end] of intervals) {
        if (num >= start && num <= end) {
            return true;
        }
        if (num < start) {
            return false;
        }
    }
    return false;
}

function mergeIntervals(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= intervals[i - 1][1]) {
            intervals[i - 1][1] = Math.max(
                intervals[i - 1][1],
                intervals[i][1]
            );
            intervals.splice(i, 1);
        }
    }
    return intervals;
}

function day16Part1(input) {
    let i = 0;
    let intervals = [];
    // collect intervals
    while (i < input.length && input[i]) {
        const [first, second] = input[i].split(": ")[1].split(" or ");
        intervals.push(first.split("-").map(Number));
        intervals.push(second.split("-").map(Number));
        i++;
    }
    intervals = mergeIntervals(intervals);

    // skip parts that are not needed
    i++;
    while (i < input.length && input[i]) {
        i++;
    }
    i += 2;

    // nearby tickets
    let res = 0;
    while (i < input.length && input[i]) {
        for (let num of input[i].split(",")) {
            if (!hasMatch(Number(num), intervals)) {
                res += Number(num);
            }
        }
        i++;
    }
    return res;
}

function day16Part2(input) {
    let i = 0;
    let intervals = [];
    let map = {};
    // collect intervals
    while (i < input.length && input[i]) {
        const [field, vals] = input[i].split(": ");
        const [first, second] = vals.split(" or ");
        intervals.push(first.split("-").map(Number));
        intervals.push(second.split("-").map(Number));
        map[field] = [
            first.split("-").map(Number),
            second.split("-").map(Number),
        ];
        i++;
    }
    intervals = mergeIntervals(intervals);

    i += 2;
    let ticket = [];
    while (i < input.length && input[i]) {
        ticket = input[i].split(",").map(Number);
        i++;
    }
    i += 2;

    // nearby tickets
    let valid = [];
    while (i < input.length && input[i]) {
        let bad = false;
        for (let num of input[i].split(",")) {
            if (!hasMatch(Number(num), intervals)) {
                bad = true;
            }
        }
        if (!bad) {
            // add valid tickets group by position
            input[i].split(",").forEach((num, i) => {
                valid[i] = (valid[i] || []).concat([Number(num)]);
            });
        }
        i++;
    }

    // find all positions that are valid for each field
    let fieldsMap = {};
    for (let i = 0; i < valid.length; i++) {
        outer: for (let [field, [[s1, e1], [s2, e2]]] of Object.entries(map)) {
            for (let j = 0; j < valid[i].length; j++) {
                const num = valid[i][j];
                if ((num < s1 || num > e1) && (num < s2 || num > e2)) {
                    continue outer;
                }
            }
            fieldsMap[field] = (fieldsMap[field] || new Set()).add(i);
        }
    }

    let res = {};
    // process of elimination, keep removing mappings with one position
    // and removing that position from all mappings
    while (Object.keys(fieldsMap).length > 0) {
        for (let [field, mappingsSet] of Object.entries(fieldsMap)) {
            const mappings = [...mappingsSet];
            if (mappings.length !== 1) continue;
            res[field] = mappings[0];
            delete fieldsMap[field];
            for (let [_, mappingsSet] of Object.entries(fieldsMap)) {
                mappingsSet.delete(mappings[0]);
            }
        }
    }

    return Object.keys(res)
        .filter((res) => res.startsWith("departure"))
        .reduce((acc, curr) => acc * ticket[res[curr]], 1);
}

console.log(day16Part1(input1));
console.log(day16Part2(input2));
