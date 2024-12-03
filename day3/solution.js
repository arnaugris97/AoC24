const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const extractMulPatterns =(input) => {
  const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
  const pairs = [];
  let pair;

  while ((pair = regex.exec(input)) !== null) {
      const num1 = parseInt(pair[1], 10);
      const num2 = parseInt(pair[2], 10);
      pairs.push([num1, num2]);
  }

  return pairs;
}

const sumOfProducts = (pairs) => {
  return pairs.reduce((sum, [a, b]) => sum + a * b, 0);
}

const extractMulPatternsWithEnablers = (input) => {
  const regex = /do\(\)|don't\(\)|mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
  const pairs = [];
  let match;
  let enabled = true;

  while ((match = regex.exec(input)) !== null) {
      if (match[0] === 'do()') {
          enabled = true;
      } else if (match[0] === "don't()") {
          enabled = false;
      } else if (match[1] !== undefined) {
          if (enabled) {
              const num1 = parseInt(match[1], 10);
              const num2 = parseInt(match[2], 10);
              pairs.push([num1, num2]);
          }
      }
  }

  return pairs;
}

const pairs = extractMulPatterns(input);
const pairsPart2 = extractMulPatternsWithEnablers(input);
const resultPart1 = sumOfProducts(pairs);
const resultPart2 = sumOfProducts(pairsPart2);


console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);