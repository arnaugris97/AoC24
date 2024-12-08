const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const mapData = input.split("\n");

const part1 = true;

const countAntinodes = (map) => {
  const isAntenna = (x, y) => {
    return map[x][y] !== ".";
  };
  const inBounds = (x, y) => {
    return x >= 0 && y >= 0 && x < rows && y < cols;
  };

  const addAntinode = (posx, posy) => {
    antinodePositions.add(`${posx},${posy}`);
  };

  const addLineAntinodes = (baseR, baseC, dR, dC) => {
    let r = baseR;
    let c = baseC;
    while (inBounds(r, c)) {
      antinodePositions.add(`${r},${c}`);
      r -= dR;
      c -= dC;
    }
  };
  const addLineAntinodesForward = (baseR, baseC, dR, dC) => {
    let r = baseR;
    let c = baseC;
    while (inBounds(r, c)) {
      antinodePositions.add(`${r},${c}`);
      r += dR;
      c += dC;
    }
  };

  const rows = map.length;
  const cols = map[0].length;

  // Find all antennas
  const antennas = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isAntenna(r, c)) {
        antennas.push({ type: map[r][c], x: r, y: c });
      }
    }
  }

  const antinodePositions = new Set();

  // Check all pairs of antennas with same type
  for (let i = 0; i < antennas.length; i++) {
    const a = antennas[i];
    for (let j = i + 1; j < antennas.length; j++) {
      const b = antennas[j];
      if (a.type === b.type) {
        // Calculate direction vector
        const dx = b.x - a.x;
        const dy = b.y - a.y;

        if (!part1) {
          addLineAntinodes(a.x, a.y, dx, dy);
          addLineAntinodesForward(a.x, a.y, dx, dy);
        }

        if (part1) {
          // First antinode: beyond b in the direction of a
          const cx = b.x + dx;
          const cy = b.y + dy;
          if (inBounds(cx, cy)) {
            addAntinode(cx, cy);
          }

          // Second antinode: beyond a in the direction of b
          const c2x = a.x - dx;
          const c2y = a.y - dy;
          if (inBounds(c2x, c2y)) {
            addAntinode(c2x, c2y);
          }
        }
      }
    }
  }

  return antinodePositions.size;
};

console.log("Result: ", countAntinodes(mapData));
