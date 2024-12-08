function solvePuzzle(input) {
  const rows = input.length;
  const cols = input[0].length;

  // Find all antennas and group them by frequency
  const antennasByFreq = {};
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = input[r][c];
      if (ch !== ".") {
        if (!antennasByFreq[ch]) antennasByFreq[ch] = [];
        antennasByFreq[ch].push({ r, c });
      }
    }
  }

  const antinodes = new Set(); // store "r,c" strings for uniqueness

  // For each frequency group
  for (const freq in antennasByFreq) {
    const antennas = antennasByFreq[freq];
    if (antennas.length < 2) {
      // If there's only one antenna of this frequency, it doesn't form a line with any other
      continue;
    }

    // Consider all pairs of antennas to form lines
    for (let i = 0; i < antennas.length; i++) {
      for (let j = i + 1; j < antennas.length; j++) {
        const { r: r1, c: c1 } = antennas[i];
        const { r: r2, c: c2 } = antennas[j];

        const dr = r2 - r1;
        const dc = c2 - c1;
        const stepR = dr;
        const stepC = dc;

        function addLineAntinodes(baseR, baseC, dR, dC) {
          let r = baseR;
          let c = baseC;
          while (r >= 0 && r < rows && c >= 0 && c < cols) {
            antinodes.add(`${r},${c}`);
            r -= dR;
            c -= dC;
          }
        }

        function addLineAntinodesForward(baseR, baseC, dR, dC) {
          let r = baseR;
          let c = baseC;
          while (r >= 0 && r < rows && c >= 0 && c < cols) {
            antinodes.add(`${r},${c}`);
            r += dR;
            c += dC;
          }
        }

        // Start from one of the known antennas, say (r1,c1).
        // Go backward in the opposite direction
        addLineAntinodes(r1, c1, stepR, stepC);
        // Go forward in the direction
        addLineAntinodesForward(r1, c1, stepR, stepC);
      }
    }
  }

  return antinodes.size;
}

const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const mapData = input.split("\n");

// Example usage:
// Suppose `puzzleInput` is an array of strings, each string is one row of the map.
const puzzleInput = mapData;

// Run the solver
const result = solvePuzzle(puzzleInput);
console.log("Number of unique antinode locations:", result);
