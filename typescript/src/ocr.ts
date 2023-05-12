import { Result, DigitOrInvalid } from './Result'
import { Numeral, numerals } from './numerals'
import { parseLinesToBlocks } from './parseLinesToBlocks'

export function parse(lines: string[]): string[] {
  const allBlocks = parseLinesToBlocks(lines)

  const allResults: string[] = []
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
