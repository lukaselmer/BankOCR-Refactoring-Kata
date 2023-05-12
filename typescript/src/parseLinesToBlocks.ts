export function parseLinesToBlocks(rawLines: string[]) {
  const lines = extractLines(rawLines)
  const allBlocks = extractBlocks(lines)
  return allBlocks
}

function extractBlocks(lines: string[][]) {
  const allBlocks = []
  for (let line of lines) {
    const blocks = []
    for (let pos = 0; pos < 9; ++pos) {
      const block = line.map((l) => l.slice(4 * pos, 4 * pos + 4))
      blocks.push(block)
    }
    allBlocks.push(blocks)
  }
  return allBlocks
}

function extractLines(rawLines: string[]) {
  const lines = []
  for (let i = 0; i < rawLines.length; i += 4) {
    lines.push(rawLines.slice(i, i + 4))
  }
  return lines
}
