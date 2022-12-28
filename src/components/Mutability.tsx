import { EditIcon, LockIcon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/icons'
import { memo } from 'react'
import { Tooltip } from './Tooltip'

export interface MutabilityProps extends IconProps {
  mutable: boolean
  showMutable?: boolean
}

export const Mutability = memo(({ mutable, showMutable = false, ...props }: MutabilityProps) => {
  return (
    <Tooltip label={mutable ? 'Mutable' : 'Immutable'}>
      {mutable ? showMutable ? <EditIcon {...props} /> : '' : <LockIcon {...props} />}
    </Tooltip>
  )
})

Mutability.displayName = 'Mutability'
