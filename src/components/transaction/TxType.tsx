import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { memo, useMemo } from 'react'
import { TransactionType } from 'state/types'
import { vars } from 'theme/theme.css'
import { Box } from '../container'

const Wrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${vars.colors.badgeBg};
  padding: 4px 8px;
  color: ${vars.text.body};
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
`

export const TxType = memo(({ value, size, ...props }: { value: TransactionType | string; size?: 'sm' }) => {
  const type = useMemo(() => {
    if (value === TransactionType.BLOCK_METADATA) {
      return 'Block Metadata'
    } else if (value === TransactionType.GENESIS_TRANSACTION) {
      return 'Genesis Transaction'
    } else if (value === TransactionType.STATE_CHECKPOINT) {
      return 'State Checkpoint'
    } else if (value === TransactionType.USER_TRANSACTION) {
      return 'User Transaction'
    }
  }, [value])

  return (
    <Wrapper
      css={css`
        ${size === 'sm' &&
        css`
          height: 20px;
        `}
      `}
      {...props}
    >
      {type}
    </Wrapper>
  )
})
