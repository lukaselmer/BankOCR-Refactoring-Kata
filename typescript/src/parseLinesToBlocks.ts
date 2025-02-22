export function parseLinesToBlocks(rawLines: string[]) {
  return extractBlocks(extractLines(rawLines))
}

function extractBlocks(lines: string[][]) {
  return lines.map((line) => {
    const blocks = []
    for (let pos = 0; pos < 9; ++pos) {
      blocks.push(extractBlock(line, pos))
    }
    return blocks
  })
}

function extractBlock(line: string[], pos: number) {
  return line.map((l) => l.slice(4 * pos, 4 * pos + 4))
}

function extractLines(rawLines: string[]) {
  const lines = []
  for (let i = 0; i < rawLines.length; i += 4) {
    lines.push(rawLines.slice(i, i + 4))
  }
  return lines
}
