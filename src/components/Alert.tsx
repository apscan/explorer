import { Alert as ChakraAlert, AlertIcon, AlertProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { forwardRef } from 'react'

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({ children, ...rest }, ref) => {
  return (
    <ChakraAlert
      css={css`
        border-radius: 8px;
        display: flex;
        align-items: center;
      `}
      ref={ref}
      {...rest}
    >
      <AlertIcon />
      {children}
    </ChakraAlert>
  )
})

Alert.displayName = 'Alert'
