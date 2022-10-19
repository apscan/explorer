import { FixedFormat, FixedNumber } from '@ethersproject/bignumber'
import { hexlify as _hexlify } from '@ethersproject/bytes'

export const hexlify = (value: string | number | bigint) => {
  if (!value) return '0x00'
  if (typeof value === 'string') {
    if (value.toLowerCase().startsWith('0x')) {
      return _hexlify(value)
    } else {
      if (/\d+/.test(value)) {
        return _hexlify(BigInt(value))
      } else {
        throw new Error(`Invalid hex string = ${value}`)
      }
    }
  }
  if (typeof value === 'number' || typeof value === 'bigint') return _hexlify(BigInt(value))

  throw new Error(`Invalid value = ${value}`)
}

export const toFixedNumber = (
  value: string | number | bigint,
  format: FixedFormat | string | number = 'fixed128x8'
) => {
  return FixedNumber.fromBytes(hexlify(value), format)
}
