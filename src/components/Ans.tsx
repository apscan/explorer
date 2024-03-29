import { memo } from 'react'
import { Link, Text, TextProps } from '@chakra-ui/react'
import { useAns } from 'hooks/useAns'
import AnsAvatar from 'assets/icons/AnsAvatar'

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
      as={Link}
      rel="noopener noreferrer"
      target="_blank"
      href={`https://www.aptosnames.com/name/${ans}`}
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
          textDecoration: 'none',

          '& > svg path': {
            fill: 'white',
            stroke: 'white',
          },
        },
        '& > svg': {
          marginRight: '0.25rem',
          width: '16px',
          height: '16px',
        },
      }}
      {...props}
    >
      <AnsAvatar />
      {ans}.apt
    </Text>
  )
})

Ans.displayName = 'Ans'
