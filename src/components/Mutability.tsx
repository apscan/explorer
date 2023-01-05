import { IconProps } from '@chakra-ui/icons'
import Unlock from 'assets/icons/Unlock'
import { memo } from 'react'

export interface MutabilityProps extends IconProps {
  mutable?: boolean
}

export const Mutability = memo(({ mutable, ...props }: MutabilityProps) => {
  if (!mutable) {
    return <Unlock {...props} />
  }
  return <></>
})

Mutability.displayName = 'Mutability'
