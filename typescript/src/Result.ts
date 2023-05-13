export class Result {
  private state: DigitOrInvalid[] = []

  addDigit(digit: DigitOrInvalid) {
    this.state.push(digit)
  }

  stringifyResult() {
    return `${this.joinDigits()} ${this.suffix()}`
  }

  private suffix() {
    return !this.isValid() ? 'ILL' : this.invalidChecksum() ? 'ERR' : '   '
  }

  private invalidChecksum() {
    const checksum = this.state
      .filter(numbersOnly)
      .reverse()
      .reduce((sum, digit, position) => sum + calculateChecksumPosition({ digit, position }), 0)
    return checksum % 11 !== 0
  }

  private isValid() {
    return !this.state.includes('?')
  }

  private joinDigits() {
    return this.state.join('')
  }
}

function numbersOnly(digit: DigitOrInvalid): digit is number {
  return typeof digit === 'number'
}

/**
 * Calculate the checksum of a certain account digit
 *
 * account number:  6  6  4  3  7  1  4  9  5
 * position names:  d9 d8 d7 d6 d5 d4 d3 d2 d1
 * checksum calculation:
 * (1*d1+ 2*d2 + 3*d3 + ... + 9*d9) mod 11 = 0
 */
function calculateChecksumPosition({ digit, position }: { digit: number; position: number }) {
  // console.log(`${position + 1} * ${digit}`)
  return (position + 1) * digit
}

export type DigitOrInvalid = number | '?'
