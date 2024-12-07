const fs = require("fs");

const input = fs.readFileSync("test-input.txt", "utf-8").trim();

const lines = input.split("\n");

const isPart2 = true;

const evaluateSequence = (target, numbers) => {
  // Check all possible combinations of addition and multiplication

  const recursiveChecker = (index, currentValue) => {
    // Base case: all numbers processed then check
    if (index === numbers.length) {
      return currentValue === target;
    }

    const nextNumber = numbers[index];

    // Try addition
    if (recursiveChecker(index + 1, currentValue + nextNumber)) {
      return true;
    }

    // Try multiplication
    if (recursiveChecker(index + 1, currentValue * nextNumber)) {
      return true;
    }

    // Try concatenation
    if (
      isPart2 &&
      recursiveChecker(
        index + 1,
        parseInt(currentValue.toString() + nextNumber.toString(), 10)
      )
    ) {
      return true;
    }

    return false;
  };

  // Start from the first number
  return recursiveChecker(1, numbers[0]);
};

let sum = 0;

for (const line of lines) {
  const [left, right] = line.split(":");
  const target = parseInt(left.trim(), 10);
  const numbers = right.trim().split(" ").map(Number);

  if (evaluateSequence(target, numbers)) {
    sum += target;
  }
}

console.log("Result: ", sum);
