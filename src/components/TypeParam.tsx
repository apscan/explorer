import React, { useMemo } from 'react'
import { truncatedWithSize } from 'utils/truncated'
import { Box } from './container'
import { Tooltip } from './Tooltip'

export const TypeParam = ({ fallback, value }: { fallback?: React.ReactNode; value?: string }) => {
  const show = useMemo(() => {
    return value?.replace(/0x[0-9a-f]+/g, (str) => {
      return truncatedWithSize(str, 'short') || ''
    })
  }, [value])
  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={value} isDisabled>
      <Box as="span">{value}</Box>
    </Tooltip>
  )
}
