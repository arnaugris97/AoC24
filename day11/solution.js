const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const parseInput = (input) => {
  return input
    .trim()
    .split(/\s+/)
    .map((x) => BigInt(x));
};

const countStonesAfterBlinks = (initialStones, blinks) => {
  let map = new Map();
  for (let num of initialStones) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  // Simulate each blink
  for (let i = 0; i < blinks; i++) {
    let nextMap = new Map();

    for (let [num, count] of map.entries()) {
      if (num === 0n) {
        // Rule 1: Replace 0 with 1
        let newNum = 1n;
        if (nextMap.has(newNum)) {
          nextMap.set(newNum, nextMap.get(newNum) + count);
        } else {
          nextMap.set(newNum, count);
        }
      } else {
        // Rule 2: Split into two stones
        let numStr = num.toString();
        if (numStr.length % 2 === 0) {
          let mid = Math.floor(numStr.length / 2);
          let leftStr = numStr.slice(0, mid);
          let rightStr = numStr.slice(mid);

          let left = leftStr.length > 0 ? BigInt(leftStr) : 0n;
          let right = rightStr.length > 0 ? BigInt(rightStr) : 0n;

          if (nextMap.has(left)) {
            nextMap.set(left, nextMap.get(left) + count);
          } else {
            nextMap.set(left, count);
          }

          if (nextMap.has(right)) {
            nextMap.set(right, nextMap.get(right) + count);
          } else {
            nextMap.set(right, count);
          }
        } else {
          // Rule 3: Multiply by 2024
          let newNum = num * 2024n;
          if (nextMap.has(newNum)) {
            nextMap.set(newNum, nextMap.get(newNum) + count);
          } else {
            nextMap.set(newNum, count);
          }
        }
      }
    }

    map = nextMap;
  }

  let total = 0;
  for (let count of map.values()) {
    total += count;
  }

  return total;
};

let initialStones = parseInput(input);
console.log("Part 1: ", countStonesAfterBlinks(initialStones, 25));
console.log("Part 2: ", countStonesAfterBlinks(initialStones, 75));
