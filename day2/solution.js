const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const lines = input.split("\n");

const levels = [];

lines.forEach((line) => {
  levels.push(line.split(" ").map(Number));
});

const isSaveLevel = (level) => {
  if (level.length <= 1) return true;

  let isAscending = true;
  let isDescending = true;

  for (let i = 1; i < level.length; i++) {
    if (level[i] === level[i - 1]) return false;
    const difference = Math.abs(level[i] - level[i - 1]);
    if (difference > 3) return false;
    if (level[i] < level[i - 1]) isAscending = false;
    if (level[i] > level[i - 1]) isDescending = false;
    if (!isAscending && !isDescending) return false;
  }

  return isAscending || isDescending;
};

const isSaveAllowingOneRemoval = (level) => {
  if (level.length <= 1) return true;
  if (isSaveLevel(level)) return true;

  for (let i = 0; i < level.length; i++) {
    const modifiedLevel = level.slice(0, i).concat(level.slice(i + 1));
    if (isSaveLevel(modifiedLevel)) {
      return true;
    }
  }

  return false;
};

let saveLevels = 0;
let saveLevelsAllowingOneRemoval = 0;

for (let i = 0; i < levels.length; i++) {
  if (isSaveLevel(levels[i])) {
    saveLevels++;
  }
  if (isSaveAllowingOneRemoval(levels[i])) {
    saveLevelsAllowingOneRemoval++;
  }
}

console.log("save levels:", saveLevels);
console.log("save levels allowing removal:", saveLevelsAllowingOneRemoval);
