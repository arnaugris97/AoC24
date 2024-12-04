const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const grid = input.split("\n");


const countXMASWords = () => {
  const word = 'XMAS';

  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1]
  ];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // Check all possible directions
      for (let dir = 0; dir < directions.length; dir++) {
        let dx = directions[dir][0];
        let dy = directions[dir][1];
        let str = '';
        //Create the word in current direction
        for (let k = 0; k < word.length; k++) {
          let x = i + k * dx;
          let y = j + k * dy;
          if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
            str += grid[x][y];
          } else {
            break;
          }
        }
        if (str === word) {
          count++;
        }
      }
    }
  }
  return count;
}

const countMASWordsOnX = () => {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;
  
  for (let i = 0; i <= numRows - 3; i++) {
    for (let j = 0; j <= numCols - 3; j++) {
      // Check for the center 'A'
      if (grid[i + 1][j + 1] !== 'A') continue;
  
      // Get diagonals
      const diag1 = grid[i][j] + grid[i + 1][j + 1] + grid[i + 2][j + 2];
      const diag2 = grid[i + 2][j] + grid[i + 1][j + 1] + grid[i][j + 2];
  
      // Check if both diagonals are 'MAS' or 'SAM'
      const validDiag1 = diag1 === 'MAS' || diag1 === 'SAM';
      const validDiag2 = diag2 === 'MAS' || diag2 === 'SAM';
  
      if (validDiag1 && validDiag2) {
        count++;
      }
    }
  }
  return count;
}


console.log("Part1: ", countXMASWords())
console.log("Part 2: ", countMASWordsOnX())
