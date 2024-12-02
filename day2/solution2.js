const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const lines = input.split("\n");

const levels = [];

lines.forEach((line) => {
  levels.push(line.split(" ").map(Number));
});

let saveLevels = 0;

const isValidSequence = (level, indexToRemove, order) => {
  let prev = null;
  for (let i = 0; i < level.length; i++) {
    if (i === indexToRemove) continue;
    if (prev !== null) {
      if (level[i] === prev) return false;
      if (Math.abs(level[i] - prev) > 3) return false;
      if (order === "ascending" && level[i] <= prev) return false;
      if (order === "descending" && level[i] >= prev) return false;
    }
    prev = level[i];
  }
  return true;
};

const isSaveLevel = (level) => {
  const n = level.length;
  // Check without removing any number
  if (
    isValidSequence(level, -1, "ascending") ||
    isValidSequence(level, -1, "descending")
  ) {
    return true;
  }
  // Check by removing each number
  for (let i = 0; i < n; i++) {
    if (
      isValidSequence(level, i, "ascending") ||
      isValidSequence(level, i, "descending")
    ) {
      return true;
    }
  }
  return false;
};

levels.forEach((level) => {
  if (isSaveLevel(level)) {
    console.log(level);
    saveLevels++;
  }
});

console.log(saveLevels);
