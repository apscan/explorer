import { memo } from 'react'
import { Image, Text, TextProps } from '@chakra-ui/react'
import { useAns } from 'hooks/useAns'
import ANSLogo from 'assets/icons/apscan-name.jpeg'
import { css } from '@emotion/react'

export interface LabelProps extends TextProps {
  address: string
}

export const Ans = memo(({ address, ...props }: LabelProps) => {
  const ans = useAns(address)

  if (!ans) {
    return <></>
  }

  return (
    <Text
      sx={{
        display: 'inline-flex',
        color: '#3498db',
        backgroundColor: 'rgba(52,152,219,.1)',
        fontSize: '.65625rem',
        lineHeight: '1.7',
        padding: '0.2rem 0.5rem',
        borderRadius: '6.1875rem',
        transition: '.2s ease-in-out',
        alignItems: 'center',
        '&:hover': {
          color: '#fff',
          backgroundColor: '#3498db',
        },
        '& > img': {
          marginRight: '0.25rem',
          width: '16px',
          height: '16px',
          borderRadius: '100%',
        },
      }}
      {...props}
    >
      <Image src={ANSLogo} />
      {ans}
    </Text>
  )
})

Ans.displayName = 'Ans'
