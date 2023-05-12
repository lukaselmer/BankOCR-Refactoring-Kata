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
    let result = new Result()
    for (let pos = 0; pos < 9; ++pos) {
      handleNumeralPosition(result, pos, lines, i, resultContext)
    }

    if (!resultContext.valid) {
      result.result[10] = 'I'
      result.result[11] = result.result[12] = 'L'
    }
    allResults.push(result.result.join(''))
  }
  return allResults
}

function handleNumeralPosition(
  result: Result,
  pos: number,
  lines: string[],
  i: number,
  resultContext: { valid: boolean }
) {
  result.result[pos] = findMatchingNumeral(lines, i, pos)
  if (result.result[pos] === '?') resultContext.valid = false
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

class Result {
  private valid: boolean = true
  public result: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

  markInvalid() {
    this.valid = false
  }

  get isValid() {
    return this.valid
  }
}
