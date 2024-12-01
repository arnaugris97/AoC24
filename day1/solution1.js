const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const lines = input.split("\n");

const list1 = [];
const list2 = [];

lines.forEach((line) => {
  const [num1, num2] = line.split("   ").map(Number);
  list1.push(num1);
  list2.push(num2);
});

let totalLength = 0;

while (list1.length > 0) {
  const min1 = Math.min(...list1);
  const min2 = Math.min(...list2);
  totalLength += Math.abs(min1 - min2);
  list1.splice(list1.indexOf(min1), 1);
  list2.splice(list2.indexOf(min2), 1);
}
console.log(totalLength);
