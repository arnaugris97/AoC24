const fs = require("fs");

const parseInput = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim().split("").map(Number));
};

const getNeighbors = (x, y, numRows, numCols) => {
  const neighbors = [];
  if (x > 0) neighbors.push([x - 1, y]); // Up
  if (x < numRows - 1) neighbors.push([x + 1, y]); // Down
  if (y > 0) neighbors.push([x, y - 1]); // Left
  if (y < numCols - 1) neighbors.push([x, y + 1]); // Right
  return neighbors;
};

const bfsTrailhead = (startX, startY, grid, numRows, numCols) => {
  let currentPositions = new Set();
  currentPositions.add(`${startX},${startY}`);

  for (let h = 0; h < 9; h++) {
    const nextPositions = new Set();
    for (const pos of currentPositions) {
      const [x, y] = pos.split(",").map(Number);
      const neighbors = getNeighbors(x, y, numRows, numCols);
      for (const [nx, ny] of neighbors) {
        if (grid[nx][ny] === h + 1) {
          nextPositions.add(`${nx},${ny}`);
        }
      }
    }
    if (nextPositions.size === 0) {
      // Not a valid path
      break;
    }
    currentPositions = nextPositions;
  }
  return currentPositions.size;
};

const sumOfTrailheadScores = (grid, numRows, numCols) => {
  // Find all 0
  const trailheads = [];
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      if (grid[x][y] === 0) {
        trailheads.push([x, y]);
      }
    }
  }

  // Find all paths and sum their scores
  let totalScore = 0;
  for (const [x, y] of trailheads) {
    totalScore += bfsTrailhead(x, y, grid, numRows, numCols);
  }

  return totalScore;
};

// Perform a DFS with memory to count how many paths from (x, y) to any 9
const countPaths = (x, y, memo, grid, numRows, numCols) => {
  // One path found
  if (grid[x][y] === 9) return 1;

  let total = 0;
  const currentHeight = grid[x][y];

  // Explore valid neighbors with height currentHeight + 1 and run DFS
  for (const [nx, ny] of getNeighbors(x, y, numRows, numCols)) {
    if (grid[nx][ny] === currentHeight + 1) {
      total += countPaths(nx, ny, memo, grid, numRows, numCols);
    }
  }

  // Store the computed value in memoization table
  memo[x][y] = total;
  return total;
};

const sumOfTrailheadRatings = (grid, numRows, numCols) => {
  // Find all 0
  const trailheads = [];
  for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
      if (grid[x][y] === 0) {
        trailheads.push([x, y]);
      }
    }
  }

  // Memory grid to store the number of paths from each cell
  const memo = Array.from({ length: numRows }, () => Array(numCols).fill(null));

  // Sum all ratings
  let totalRating = 0;
  for (const [x, y] of trailheads) {
    totalRating += countPaths(x, y, memo, grid, numRows, numCols);
  }

  return totalRating;
};

const input = fs.readFileSync("input.txt", "utf-8").trim();
const grid = parseInput(input);
const numRows = grid.length;
const numCols = grid[0].length;

console.log("Part 1: ", sumOfTrailheadScores(grid, numRows, numCols));
console.log("Part 2: ", sumOfTrailheadRatings(grid, numRows, numCols));
