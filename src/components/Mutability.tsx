import { EditIcon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/icons'
import Unlock from 'assets/icons/Unlock'
import { memo } from 'react'

export interface MutabilityProps extends IconProps {
  mutable?: boolean
  showMutable?: boolean
}

export const Mutability = memo(({ mutable, showMutable = false, ...props }: MutabilityProps) => {
  if (typeof mutable === 'undefined') {
    return <>-</>
  }

  if (mutable && showMutable) {
    return <EditIcon {...props} />
  }
  return <Unlock {...props} />
})

Mutability.displayName = 'Mutability'
