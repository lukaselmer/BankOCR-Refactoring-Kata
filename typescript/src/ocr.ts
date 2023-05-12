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

export function parse(rawLines: string[]): string[] {
  const allResults: string[] = []
  const lines = []
  for (let i = 0; i < rawLines.length; i += 4) {
    lines.push(rawLines.slice(i, i + 4))
  }

  const allBlocks = []
  for (let line of lines) {
    const blocks = []
    for (let pos = 0; pos < 9; ++pos) {
      const block = line.map((l) => l.slice(4 * pos, 4 * pos + 4))
      blocks.push(block)
    }
    allBlocks.push(blocks)
  }

  for (let blocks of allBlocks) {
    let result = new Result()
    for (let block of blocks) {
      handleNumeralPosition(result, block)
    }

    allResults.push(result.stringifyResult())
  }
  return allResults
}

function handleNumeralPosition(result: Result, lines: string[]) {
  result.addDigit(findMatchingNumeral(lines))
}

function findMatchingNumeral(lines: string[]): DigitOrInvalid {
  for (let numeral = 0; numeral <= 9; ++numeral) {
    if (matchesNumeral(numeral, lines)) {
      return numeral
    }
  }
  return '?'
}

function matchesNumeral(numeral: number, lines: string[]) {
  return blocksAreEqual(NUMERALS[numeral], lines)
}

function blocksAreEqual(a: string[], b: string[]) {
  for (let row = 0; row < a.length; ++row) {
    for (let col = 0; col < a[row].length; ++col) {
      if (a[row][col] !== b[row][col]) return false
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
