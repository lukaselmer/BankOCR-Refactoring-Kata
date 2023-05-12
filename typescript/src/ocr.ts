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
  const logicalLines = []
  for (let i = 0; i < lines.length; i += 4) {
    logicalLines.push(lines.slice(i, i + 4))
  }

  for (let currentLines of logicalLines) {
    let result = new Result()
    for (let pos = 0; pos < 9; ++pos) {
      handleNumeralPosition(result, pos, currentLines)
    }

    allResults.push(result.stringifyResult())
  }
  return allResults
}

function handleNumeralPosition(result: Result, pos: number, lines: string[]) {
  result.addDigit(findMatchingNumeral(lines, 0, pos))
}

function findMatchingNumeral(lines: string[], i: number, pos: number): DigitOrInvalid {
  for (let numeral = 0; numeral <= 9; ++numeral) {
    if (matchesNumeral(numeral, lines, i, pos)) {
      return numeral
    }
  }
  return '?'
}

function matchesNumeral(numeral: number, lines: string[], i: number, pos: number) {
  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      if (NUMERALS[numeral][row][col] !== lines[i + row][4 * pos + col]) return false
    }
  }
  return true
}

class Result {
  private state: DigitOrInvalid[] = []

  addDigit(digit: DigitOrInvalid) {
    this.state.push(digit)
  }

  stringifyResult() {
    return `${this.joinDigits()} ${this.suffix()}`
  }

  private suffix() {
    return this.isValid() ? '   ' : 'ILL'
  }

  private isValid() {
    return !this.state.includes('?')
  }

  private joinDigits() {
    return this.state.join('')
  }
}

type DigitOrInvalid = number | '?'
