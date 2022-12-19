import memoizeOne from 'memoize-one'
import React from 'react'

export const isSystemTx = memoizeOne((str: any) => {
  if (typeof str !== 'string') return false
  return ['user_transaction', 'genesis_transaction', 'block_metadata_transaction'].includes(str.toLowerCase())
})

export const parseHeaders = (
  headers: any
): {
  min?: number
  max?: number
  count?: number
} => {
  const [range, count] = headers?.get('content-range')?.split('/') || []
  const [min, max] = range?.split('-').map((i: string) => Number(i)) || []

  return {
    min,
    max,
    count: count === undefined || count === '*' ? undefined : Number(count),
  }
}

export const tabNameWithCount = (name: React.ReactNode, count?: number | undefined) => {
  return count != null ? `${name} (${count})` : name
}

export const isLargeObject = (object: any): boolean => {
  let objectList = []
  let stack = [object]
  let bytes = 0

  while (stack.length) {
    let value = stack.pop()

    if (typeof value === 'boolean') {
      bytes += 4
    } else if (typeof value === 'string') {
      bytes += value.length * 2
    } else if (typeof value === 'number') {
      bytes += 8
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
      objectList.push(value)

      for (let i in value) {
        stack.push(value[i])
      }
    }
    if (bytes > 10000) {
      return true
    }
  }
  return false
}

export const AptosCoin = '0x1::aptos_coin::AptosCoin'
