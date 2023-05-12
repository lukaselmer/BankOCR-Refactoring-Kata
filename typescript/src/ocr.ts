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
  const allResults: string[] = []
  for (let i = 0; i < lines.length; i += 4) {
    const resultContext = {
      valid: true,
    }
    let result: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    for (let pos = 0; pos < 9; ++pos) {
      handleNumeralPosition(result, pos, lines, i, resultContext)
    }

    if (!resultContext.valid) {
      result[10] = 'I'
      result[11] = result[12] = 'L'
    }
    allResults.push(result.join(''))
  }
  return allResults
}

function handleNumeralPosition(
  result: string[],
  pos: number,
  lines: string[],
  i: number,
  resultContext: { valid: boolean }
) {
  result[pos] = findMatchingNumeral(lines, i, pos)
  if (result[pos] === '?') resultContext.valid = false
}

function findMatchingNumeral(lines: string[], i: number, pos: number) {
  for (let numeral = 0; numeral <= 9; ++numeral) {
    if (digitOk(numeral, lines, i, pos)) {
      return String.fromCharCode(numeral + '0'.charCodeAt(0))
    }
  }
  return '?'
}

function digitOk(numeral: number, lines: string[], i: number, pos: number) {
  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      if (NUMERALS[numeral][row][col] !== lines[i + row][4 * pos + col]) return false
    }
  }
  return true
}
