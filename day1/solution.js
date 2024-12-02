const fs = require("fs");

const input = fs.readFileSync("test-input.txt", "utf-8").trim();

const lines = input.split("\n");

const list1 = [];
const list2 = [];

lines.forEach((line) => {
  const [num1, num2] = line.split("   ").map(Number);
  list1.push(num1);
  list2.push(num2);
});

let totalLength = 0;
let similarityScore = 0;

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

for (let i = 0; i < list1.length; i++) {
  totalLength += Math.abs(list1[i] - list2[i]);
  const count = list2.filter((num) => num === list1[i]).length;
  similarityScore += list1[i] * count;
}

console.log("Part 1: ", totalLength);
console.log("Part 2: ", similarityScore);
