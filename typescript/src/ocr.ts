// prettier-ignore
const NUMERALS = [
    [' _  ',
     '| | ',
     '|_| ',
     '    '],
    ['    ',
     '  | ',
     '  | ',
     '    '],
    [' _  ',
     ' _| ',
     '|_  ',
     '    '],
    [' _  ',
     ' _| ',
     ' _| ',
     '    '],
    ['    ',
     '|_| ',
     '  | ',
     '    '],
    [' _  ',
     '|_  ',
     ' _| ',
     '    '],
    [' _  ',
     '|_  ',
     '|_| ',
     '    '],
    [' _  ',
     '  | ',
     '  | ',
     '    '],
    [' _  ',
     '|_| ',
     '|_| ',
     '    '],
    [' _  ',
     '|_| ',
     ' _| ',
     '    ']];

export function parse(lines: string[]): string[] {
  const result: string[] = []
  for (let i = 0; i < lines.length; i += 4) {
    let work: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    for (let pos = 0; pos < 9; ++pos) {
      work[pos] = '?'
      if (!findMatchingNumeral(lines, i, pos, work)) {
        work[10] = 'I'
        work[11] = work[12] = 'L'
      }
    }
    result.push(work.join(''))
  }
  return result
}

function findMatchingNumeral(lines: string[], i: number, pos: number, work: string[]) {
  for (let numeral = 0; numeral <= 9; ++numeral) {
    if (digitOk(numeral, lines, i, pos)) {
      work[pos] = String.fromCharCode(numeral + '0'.charCodeAt(0))
      return true
    }
  }
  return false
}

function digitOk(numeral: number, lines: string[], i: number, pos: number) {
  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      if (NUMERALS[numeral][row][col] !== lines[i + row][4 * pos + col]) return false
    }
  }
  return true
}
