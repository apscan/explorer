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
