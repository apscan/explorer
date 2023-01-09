import { memo } from 'react'
import Tooltip from './tooltipWithCopy'
import Unlock from 'assets/icons/Unlock'

export type MutabilityProps = {
  mutable?: boolean
} & any

export const Mutability = memo(({ mutable, ...props }: MutabilityProps) => {
  return (
    <Tooltip {...props} label={mutable ? 'Mutable' : 'Immutable'}>
      {mutable ? '' : <Unlock />}
    </Tooltip>
  )
})

Mutability.displayName = 'Mutability'
