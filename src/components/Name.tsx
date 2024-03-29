import { Link, Text, TextProps } from '@chakra-ui/react'
import { memo } from 'react'
import { useAns } from 'hooks/useAns'
import { Tag } from './Tag'
import { addressTagsMap } from 'config/address-tags'
import { Address } from './Address'

export interface NameProps extends TextProps {
  address: string
}

export const Name = memo(({ address, ...props }: NameProps) => {
  const ans = useAns(address)

  if (ans) {
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
          // fontSize: '.65625rem',
          fontSize: '14px',
          position: 'absolute',
          top: '8px',
          lineHeight: '1.7',
          padding: '0rem 0.5rem',
          borderRadius: '6.1875rem',
          transition: '.2s ease-in-out',
          alignItems: 'center',
          '&:hover': {
            color: '#fff',
            backgroundColor: '#3498db',
            textDecoration: 'none',
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
        {ans}.apt
      </Text>
    )
  }

  if (addressTagsMap[address]) {
    return (
      <Tag
        style={{
          fontSize: '14px',
          position: 'absolute',
          top: '8px',
          lineHeight: '1.7',
          padding: '0rem 0.5rem',
        }}
        address={address}
      />
    )
  }

  return <Address size="short" as="span" value={address} />
})

Name.displayName = 'Name'
