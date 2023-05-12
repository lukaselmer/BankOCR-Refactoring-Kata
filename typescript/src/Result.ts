export class Result {
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

export type DigitOrInvalid = number | '?'
