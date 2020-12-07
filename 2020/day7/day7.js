const helper = require("../helper");
const input1 = helper.getInput("day7", "day7part1");
const input2 = helper.getInput("day7", "day7part2");

function dfs(graph, node, target) {
    if (node === target) {
        return true;
    }

    for (let nei of graph[node]) {
        if (nei === "no other bag") continue;
        if (dfs(graph, nei, target)) {
            return true;
        }
    }
    return false;
}

function day7Part1(input) {
    const target = "shiny gold bag";
    let graph = {};
    for (let str of input) {
        const [parent, ...children] = str.match(/\w+ \w+ bag/gi);
        if (!(parent in graph)) {
            graph[parent] = [];
        }
        graph[parent].push(...children);
    }
    let total = 0;
    for (let node in graph) {
        if (node === target) continue;
        // try to reach target from each node
        if (dfs(graph, node, target, new Set())) {
            total += 1;
        }
    }
    return total;
}

function dfs2(graph, node, total) {
    // sum of every nodes' total in the tree, where total is the product from root to node
    if (graph[node].length === 0) {
        return total;
    }
    let sum = total;
    for (let { name: nei, count } of graph[node]) {
        sum += dfs2(graph, nei, total * count);
    }
    return sum;
}

function day7Part2(input) {
    const start = "shiny gold bag";
    let graph = {};
    for (let str of input) {
        // parse line, e.g. 'light red bags contain 12 bright white bag, 2 muted yellow bags' => ['light red bag', '12 bright white bag', '2 muted yellow bag']
        const [parent, ...rest] = str.match(/(\d+ )*\w+ \w+ bag/gi);
        const children = rest
            .filter((x) => x !== "no other bag")
            .map((x) => {
                const [first, ...rest] = x.split(" ");
                return {
                    name: rest.join(" "),
                    count: Number(first),
                };
            });
        if (!(parent in graph)) {
            graph[parent] = [];
        }
        graph[parent].push(...children);
    }
    // console.log("[DEBUG]", graph);
    return dfs2(graph, start, 1) - 1; // root is not counted
}

console.log(day7Part1(input1));
console.log(day7Part2(input2));
