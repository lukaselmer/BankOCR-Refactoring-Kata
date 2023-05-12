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
    let result = new Result()
    for (let pos = 0; pos < 9; ++pos) {
      handleNumeralPosition(result, pos, lines, i)
    }

    allResults.push(result.stringifyResult())
  }
  return allResults
}

function handleNumeralPosition(result: Result, pos: number, lines: string[], i: number) {
  result.addDigit(findMatchingNumeral(lines, i, pos))
}

function findMatchingNumeral(lines: string[], i: number, pos: number) {
  for (let numeral = 0; numeral <= 9; ++numeral) {
    if (digitOk(numeral, lines, i, pos)) {
      return numeral
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
  public result: (number | '?')[] = []

  addDigit(digit: number | '?') {
    this.result.push(digit)
  }

  stringifyResult() {
    return `${this.joinDigits()} ${this.suffix()}`
  }

  private suffix() {
    return this.isValid ? '   ' : 'ILL'
  }

  get isValid() {
    return !this.joinDigits().includes('?')
  }

  private joinDigits() {
    return this.result.join('')
  }
}
