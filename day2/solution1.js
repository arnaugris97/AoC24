const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const lines = input.split("\n");

const levels = [];

lines.forEach((line) => {
  levels.push(line.split(" ").map(Number));
});

let saveLevels = 0;

const isSaveLevel = (level) => {
  let isAscending = true;
  let isDescending = true;
  let prev = level[0];
  for (let i = 1; i < level.length; i++) {
    if ((!isAscending && !isDescending) || prev === level[i]) {
      return false;
    }
    if (prev < level[i]) {
      isDescending = false;
    }
    if (prev > level[i]) {
      isAscending = false;
    }

    if (Math.abs(prev - level[i]) > 3) {
      return false;
    }
    prev = level[i];
  }
  return isAscending || isDescending;
};

levels.forEach((level) => {
  if (isSaveLevel(level)) {
    console.log(level);
    saveLevels++;
  }
});

console.log(saveLevels);
