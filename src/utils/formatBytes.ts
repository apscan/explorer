import numbro from 'numbro'

export const formatBytes = (num: number) => {
  return numbro(num)
    .format({
      output: 'byte',
      base: 'decimal',
      spaceSeparated: true,
    })
    .replace('i', '')
}
