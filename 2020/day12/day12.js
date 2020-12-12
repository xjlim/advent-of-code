const helper = require("../helper");
const input1 = helper.getInput("day12", "day12part1");
const input2 = helper.getInput("day12", "day12part2");

function day12Part1(input) {
    let currDir = 0;
    let dirs = ["E", "S", "W", "N"];
    let x = 0;
    let y = 0;
    for (let instruction of input) {
        let dir = instruction[0];
        const val = Number(instruction.slice(1));
        const currDirVal = dirs[currDir];
        if (dir === "F") {
            dir = currDirVal;
        } else if (dir === "L") {
            // wrap around from left
            currDir = (currDir + 4 - val / 90) % 4;
        } else if (dir === "R") {
            currDir = (currDir + val / 90) % 4;
        }

        if (dir === "N") {
            y += val;
        } else if (dir === "S") {
            y -= val;
        } else if (dir === "E") {
            x += val;
        } else if (dir === "W") {
            x -= val;
        }
    }
    return Math.abs(x) + Math.abs(y);
}

function day12Part2Old(input) {
    let wayX = 10;
    let wayY = 1;
    let x = 0;
    let y = 0;
    for (let instruction of input) {
        let dir = instruction[0];
        const val = Number(instruction.slice(1));
        if (dir === "F") {
            x += wayX * val;
            y += wayY * val;
        } else if (dir === "L") {
            const times = (val / 90) % 4;
            // simulate rotate
            for (let i = 0; i < times; i++) {
                [wayX, wayY] = [wayY, wayX];
                wayX *= -1;
            }
        } else if (dir === "R") {
            const times = (val / 90) % 4;
            for (let i = 0; i < times; i++) {
                [wayX, wayY] = [wayY, wayX];
                wayY *= -1;
            }
        } else if (dir === "N") {
            wayY += val;
        } else if (dir === "S") {
            wayY -= val;
        } else if (dir === "E") {
            wayX += val;
        } else if (dir === "W") {
            wayX -= val;
        }
    }
    return Math.abs(x) + Math.abs(y);
}

function day12Part2(input) {
    let wayX = 10;
    let wayY = 1;
    let x = 0;
    let y = 0;
    /* 
        rotate right
        0 degrees: (x,y) -> (x,y)
        90 degrees: (x,y) -> (y,-x)
        180 degrees: (x,y) -> (-x,-y)
        270 degrees: (x,y) -> (-y,x)
        https://github.com/lizthegrey/adventofcode/blob/main/2020/day12.go
    */
    let dirs = [
        [1, 0, 0, 1],
        [0, 1, -1, 0],
        [-1, 0, 0, -1],
        [0, -1, 1, 0],
    ];

    for (let instruction of input) {
        let dir = instruction[0];
        const val = Number(instruction.slice(1));
        if (dir === "F") {
            x += wayX * val;
            y += wayY * val;
        } else if (dir === "L") {
            let i = (4 - val / 90) % 4;
            newWayX = dirs[i][0] * wayX + dirs[i][1] * wayY;
            newWayY = dirs[i][2] * wayX + dirs[i][3] * wayY;
            wayX = newWayX;
            wayY = newWayY;
        } else if (dir === "R") {
            let i = (val / 90) % 4;
            newWayX = dirs[i][0] * wayX + dirs[i][1] * wayY;
            newWayY = dirs[i][2] * wayX + dirs[i][3] * wayY;
            wayX = newWayX;
            wayY = newWayY;
        } else if (dir === "N") {
            wayY += val;
        } else if (dir === "S") {
            wayY -= val;
        } else if (dir === "E") {
            wayX += val;
        } else if (dir === "W") {
            wayX -= val;
        }
    }
    return Math.abs(x) + Math.abs(y);
}

console.log(day12Part1(input1));
console.log(day12Part2(input2));
