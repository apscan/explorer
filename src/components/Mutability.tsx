import { LockIcon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/icons'
import { memo } from 'react'
import Tooltip from './tooltipWithCopy'
import Unlock from 'assets/icons/Unlock'

export interface MutabilityProps extends IconProps {
  mutable?: boolean
}

export const Mutability = memo(({ mutable, ...props }: MutabilityProps) => {
  return <Tooltip label={mutable ? 'Mutable' : 'Immutable'}>{mutable ? '' : <Unlock {...props} />}</Tooltip>
})

Mutability.displayName = 'Mutability'
