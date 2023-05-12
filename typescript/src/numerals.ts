export function numerals(): Numeral[] {
  return NUMERALS.map((block, numeral) => ({ block, numeral }))
}

export interface Numeral {
  block: string[]
  numeral: number
}

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
        '    ']
];
