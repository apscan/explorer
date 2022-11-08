import { css } from '@emotion/react'
import { Types } from 'aptos'
import { Box } from './container'
import { Address } from './Address'

const BLOCK_MODULE_NAME = 'candy_machine_v2'

export const TransactionFunction = ({
  value,
  fallback,
  maxWidth,
}: {
  maxWidth?: string
  value?: Types.Transaction
  fallback?: React.ReactNode
}) => {
  if (!value) return <>{fallback}</>

  if (!('payload' in value) || !('function' in value.payload)) {
    return null
  }

  const functionFullStr = value.payload.function

  const functionStrStartIdx = functionFullStr.indexOf('::') + 2
  const address = functionFullStr.substring(0, functionStrStartIdx - 2)
  let functionStr = functionFullStr.substring(functionStrStartIdx)

  if (functionStr.startsWith(BLOCK_MODULE_NAME)) {
    functionStr = functionStr.substring(BLOCK_MODULE_NAME.length + 2)
  }

  return (
    <Box
      css={css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: ${maxWidth || '200px'};
      `}
    >
      <Address value={address} size="short" />
      ::s{functionStr}({value?.payload?.arguments.join(', ')})
    </Box>
  )
}
