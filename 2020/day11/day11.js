const helper = require("../helper");
const input1 = helper.getInput("day11", "day11part1");
const input2 = helper.getInput("day11", "day11part2");

function countAdjacent(grid, row, col, sym) {
    // count number of sym's in adjacent cells
    let count = 0;
    for (let [dr, dc] of [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ]) {
        if (
            row + dr < 0 ||
            row + dr >= grid.length ||
            col + dc < 0 ||
            col + dc >= grid[0].length
        )
            continue;
        if (grid[row + dr][col + dc] === sym) {
            count++;
        }
    }
    return count;
}

function run(grid) {
    // simulate with rules
    let res = [];
    let stable = true;
    for (let row = 0; row < grid.length; row++) {
        res.push([]);
        for (let col = 0; col < grid[0].length; col++) {
            const curr = grid[row][col];
            let newCell = "";
            if (curr === "L" && countAdjacent(grid, row, col, "#") === 0) {
                newCell = "#";
                stable = false;
            } else if (
                curr === "#" &&
                countAdjacent(grid, row, col, "#") >= 4
            ) {
                newCell = "L";
                stable = false;
            } else {
                newCell = curr;
            }
            res[row].push(newCell);
        }
    }
    return [stable, res];
}

function count(grid) {
    // count number of '#'s in grid
    return grid.reduce(
        (acc, row) => acc + row.filter((x) => x === "#").length,
        0
    );
}

function day11Part1(input) {
    let grid = input.map((x) => x.split(""));
    let stable = false;
    do {
        [stable, grid] = run(grid);
    } while (!stable);
    return count(grid);
}

function countAdjacent2(grid, row, col, sym) {
    // count number of sym's in adjacent cells, keep going unless cell is not a '.'
    let count = 0;
    for (let [dr, dc] of [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ]) {
        let nr = row + dr;
        let nc = col + dc;
        while (
            nr >= 0 &&
            nr < grid.length &&
            nc >= 0 &&
            nc < grid[0].length &&
            grid[nr][nc] === "."
        ) {
            nr += dr;
            nc += dc;
        }
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
            continue;
        if (grid[nr][nc] === sym) {
            count++;
        }
    }
    return count;
}

function run2(grid) {
    let res = [];
    let stable = true;
    for (let row = 0; row < grid.length; row++) {
        res.push([]);
        for (let col = 0; col < grid[0].length; col++) {
            const curr = grid[row][col];
            let newCell = "";
            if (curr === "L" && countAdjacent2(grid, row, col, "#") === 0) {
                newCell = "#";
                stable = false;
            } else if (
                curr === "#" &&
                countAdjacent2(grid, row, col, "#") >= 5
            ) {
                newCell = "L";
                stable = false;
            } else {
                newCell = curr;
            }
            res[row].push(newCell);
        }
    }
    return [stable, res];
}

function day11Part2(input) {
    let grid = input.map((x) => x.split(""));
    let stable = false;
    do {
        [stable, grid] = run2(grid);
    } while (!stable);
    return count(grid);
}

console.log(day11Part1(input1));
console.log(day11Part2(input2));
