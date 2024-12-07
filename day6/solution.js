const fs = require("fs");

const input = fs.readFileSync("test-input.txt", "utf-8").trim();

const lines = input.split("\n");
const grid = lines.map((line) => line.split(""));

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const rows = grid.length;
const columns = grid[0].length;
let guardRow = -1;
let guardCol = -1;
let guardStartKey = "";
let guardStartDir = -1;
let directionIndex = 0;

const findGuard = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const cell = grid[r][c];
      if (cell === "^") {
        guardRow = r;
        guardCol = c;
        directionIndex = 0;
      } else if (cell === ">") {
        guardRow = r;
        guardCol = c;
        directionIndex = 1;
      } else if (cell === "v") {
        guardRow = r;
        guardCol = c;
        directionIndex = 2;
      } else if (cell === "<") {
        guardRow = r;
        guardCol = c;
        directionIndex = 3;
      }
    }
  }
};

const isInsideMap = (row, col) => {
  return row >= 0 && row < rows && col >= 0 && col < columns;
};
const turnRight = (dirIndex) => {
  return (dirIndex + 1) % 4;
};

const guardPath = () => {
  const visited = new Set();
  visited.add(`${guardRow},${guardCol}`);

  while (true) {
    const [dR, dC] = directions[directionIndex];
    const nextR = guardRow + dR;
    const nextC = guardCol + dC;

    // Next step out of the map
    if (!isInsideMap(nextR, nextC)) {
      break;
    }

    // Next step is obstacle and guard turn right
    if (grid[nextR][nextC] === "#") {
      directionIndex = turnRight(directionIndex);
    } else {
      guardRow = nextR;
      guardCol = nextC;
      visited.add(`${guardRow},${guardCol}`);
    }
  }
  return visited;
};

const getCoords = (position) => {
  return position.split(",");
};

const isCreatingALoop = (position) => {
  // Set visited position as an obstacle
  const [x, y] = getCoords(position);
  grid[x][y] = "#";

  findGuard();

  const visited = new Set();
  while (true) {
    const [dR, dC] = directions[directionIndex];
    const currentPos = `${guardRow},${guardCol}; ${dR},${dC}`;
    if (visited.has(currentPos)) {
      grid[x][y] = "."; // restore
      // Have a loop
      return true;
    }
    visited.add(currentPos);
    const nextR = guardRow + dR;
    const nextC = guardCol + dC;

    // Next step out of the map
    if (!isInsideMap(nextR, nextC)) {
      break;
    }

    // Next step is obstacle and guard turn right
    if (grid[nextR][nextC] === "#") {
      directionIndex = turnRight(directionIndex);
    } else {
      guardRow = nextR;
      guardCol = nextC;
    }
  }
  grid[x][y] = "."; // restore
  return false;
};
// Get guard initial position and direction
findGuard();
guardStartKey = `${guardRow},${guardCol}`;
guardStartDir = directionIndex;
let guardVisitedPositions = guardPath();
console.log("Part 1: ", guardVisitedPositions.size);

guardVisitedPositions.delete(guardStartKey);
let countObstacles = 0;
for (const position of guardVisitedPositions) {
  if (isCreatingALoop(position)) {
    countObstacles++;
  }
}
console.log("Part 2: ", countObstacles);
