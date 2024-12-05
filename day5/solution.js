const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

// Process input
const lines = input.split("\n");
const separator = lines.indexOf('')
let rules = []
let updates = []
if (separator !== -1) {
 rules = lines.slice(0, separator).map(line => {
    const [first, second] = line.split('|').map(Number);
    return { first, second };
    });
 updates = lines.slice(separator + 1).map(line => {
    return line.split(',').map(Number);
    });
}


const isValidUpdate = (update, rules) => {
    for (const rule of rules) {
        const indexFirst = update.indexOf(rule.first);
        const indexSecond = update.indexOf(rule.second);
        // Number not in the update
        if (indexFirst === -1 || indexSecond === -1) {
            continue;
        }
        // Update not valid because first index is bigger than the second
        if (indexFirst >= indexSecond) {
            return false;
        }
    }
    return true;
}

const reorderUpdate = (update, rules) => {
    // Perform a topological sorting to order update
    // Build a graph
    const graph = {};
    const nodes = new Set(update);

    nodes.forEach(node => {
        graph[node] = { inEdges: [], outEdges: [] };
    });

    // Add graph edges with rules
    for (const rule of rules) {
        if (nodes.has(rule.first) && nodes.has(rule.second)) {
            graph[rule.first].outEdges.push(rule.second);
            graph[rule.second].inEdges.push(rule.first);
        }
    }

    const ordered = [];
    const queue = [];

    // First nodes with no incoming edges
    for (const node of nodes) {
        if (graph[node].inEdges.length === 0) {
            queue.push(node);
        }
    }

    while (queue.length > 0) {
        const node = queue.shift();
        ordered.push(node);

        const outEdges = graph[node].outEdges.slice();
        for (const m of outEdges) {
            // REmove out and in edges from queue node
            graph[node].outEdges.splice(graph[node].outEdges.indexOf(m), 1);
            graph[m].inEdges.splice(graph[m].inEdges.indexOf(node), 1);

            // When m has no edges add to queue
            if (graph[m].inEdges.length === 0) {
                queue.push(m);
            }
        }
    }

    // Security check cycle in rules (Should be a DAG (Directed acyclic graph))
    for (const node of nodes) {
        if (graph[node].inEdges.length > 0 || graph[node].outEdges.length > 0) {
            throw new Error('Cycle detected in rules; cannot reorder update');
        }
    }

    return ordered;
}



let sum = 0;
let invalidSum = 0;
const validUpdates = [];
const invalidUpdates = [];

for (const update of updates) {
    if (isValidUpdate(update, rules)) {
        validUpdates.push(update);
        const middleIndex = Math.floor(update.length / 2);
        sum += update[middleIndex];
    }
    else {
        invalidUpdates.push(update);
    }
}

const orderedUpdates = [];

for (const update of invalidUpdates) {
    try {
        const orderedUpdate = reorderUpdate(update, rules);
        orderedUpdates.push(orderedUpdate);
        const middleIndex = Math.floor(orderedUpdate.length / 2);
        invalidSum += orderedUpdate[middleIndex];
    } catch (error) {
        console.error(`Could not reorder update ${update.join(',')}: ${error.message}`);
    }
}


console.log('Part 1: ', sum);
console.log('Part 2: ', invalidSum)