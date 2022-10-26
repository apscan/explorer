import React from 'react'
import { Box } from './container'
import { Tooltip } from './Tooltip'

export const TypeParam = ({ fallback, value }: { fallback?: React.ReactNode; value?: string }) => {
  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={value} isDisabled>
      <Box as="span">{value}</Box>
    </Tooltip>
  )
}
