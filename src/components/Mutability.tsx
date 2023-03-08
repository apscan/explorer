import { memo } from 'react'
import { Tooltip } from './Tooltip'
import Unlock from 'assets/icons/Unlock'
import { css } from '@emotion/react'
import { Box } from '@chakra-ui/react'

export type MutabilityProps = {
  mutable?: boolean
} & any

export const Mutability = memo(({ mutable, ...props }: MutabilityProps) => {
  return (
    <Tooltip placement="top" label={mutable ? 'Mutable' : 'Immutable'}>
      <Box
        {...props}
        css={css`
          margin-left: 4px;
        `}
      >
        {mutable ? '' : <Unlock />}
      </Box>
    </Tooltip>
  )
})

Mutability.displayName = 'Mutability'
