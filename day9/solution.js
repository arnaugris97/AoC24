const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();

const parseDiskMap = (map) => {
  const blocks = [];
  let isFileLength = true; // Start with a file and not a free space
  let currentFileID = 0;

  for (let i = 0; i < map.length; i++) {
    const length = parseInt(map[i], 10);

    // Assign file ID to represent file blocks
    if (isFileLength) {
      for (let j = 0; j < length; j++) {
        blocks.push(currentFileID);
      }
      currentFileID += 1;
    } else {
      // Assign null to represent free space
      for (let j = 0; j < length; j++) {
        blocks.push(null);
      }
    }

    isFileLength = !isFileLength;
  }

  return blocks;
};

const compactBlocks = (blocks) => {
  while (true) {
    const freeIndex = blocks.indexOf(null);
    // No free space left
    if (freeIndex === -1) {
      break;
    }

    // Find the index of the last file block after the free space
    let fileIndex = -1;
    for (let i = blocks.length - 1; i > freeIndex; i--) {
      if (blocks[i] !== null) {
        fileIndex = i;
        break;
      }
    }

    // No file blocks to move after the free space
    if (fileIndex === -1) {
      break;
    }

    // Compact the block
    blocks[freeIndex] = blocks[fileIndex];
    blocks[fileIndex] = null;
  }

  return blocks;
};

const compactBlocksPartTwo = (blocks) => {
  let files = [];
  let currentFileID = null;
  let start = null;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== null) {
      // Same file
      if (currentFileID === blocks[i]) {
        continue;
      } else {
        // New file detected
        if (currentFileID !== null) {
          // Save the previous file
          files.push({
            fileID: currentFileID,
            start: start,
            length: i - start,
          });
        }
        currentFileID = blocks[i];
        start = i;
      }
    } else {
      if (currentFileID !== null) {
        // Push the previous file
        files.push({
          fileID: currentFileID,
          start: start,
          length: i - start,
        });
        currentFileID = null;
      }
    }
  }
  // Save last file
  if (currentFileID !== null) {
    files.push({
      fileID: currentFileID,
      start: start,
      length: blocks.length - start,
    });
  }

  // Sort in descending order
  files.sort((a, b) => b.fileID - a.fileID);

  // Move files to the leftmost free space
  for (const file of files) {
    const { fileID, start, length } = file;

    let targetStart = null;

    // Find a place
    for (let i = 0; i <= blocks.length - length; i++) {
      let fits = true;
      for (let j = 0; j < length; j++) {
        if (blocks[i + j] !== null) {
          fits = false;
          break;
        }
      }
      if (fits) {
        targetStart = i;
        break;
      }
    }

    //Move the file
    if (targetStart !== null && targetStart < start) {
      for (let j = 0; j < length; j++) {
        blocks[targetStart + j] = fileID;
        blocks[start + j] = null;
      }
    }
  }

  return blocks;
};

const computeChecksum = (blocks) => {
  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block !== null) {
      checksum += i * block;
    }
  }
  return checksum;
};

const calculateFilesystemChecksum = (diskMap, isPart2) => {
  const blocks = parseDiskMap(diskMap);
  let compatedBlocks = null;
  if (isPart2) {
    compactedBlocks = compactBlocksPartTwo(blocks);
  } else {
    compactedBlocks = compactBlocks(blocks);
  }

  const checksum = computeChecksum(compactedBlocks);

  return checksum;
};

console.log("Part 1: ", calculateFilesystemChecksum(input, false));
console.log("Part 2: ", calculateFilesystemChecksum(input, true));
