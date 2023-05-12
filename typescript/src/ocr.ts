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
  return numerals().find((numeral) => matchesNumeral(numeral, lines))?.numeral ?? '?'
}

function matchesNumeral(numeral: Numeral, lines: string[]) {
  return blocksAreEqual(numeral.block, lines)
}

function blocksAreEqual(a: string[], b: string[]) {
  return a.every((row, index) => row === b[index])
}

function numerals() {
  return NUMERALS.map((block, numeral) => {
    return { block, numeral }
  })
}

interface Numeral {
  block: string[]
  numeral: number
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
