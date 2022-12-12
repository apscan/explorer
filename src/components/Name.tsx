import { Link, Text, TextProps } from '@chakra-ui/react'
import { memo } from 'react'
import { useAns } from 'hooks/useAns'
import { Tag } from './Tag'

export interface NameProps extends TextProps {
  address: string
}

export const Name = memo(({ address }: NameProps) => {
  const ans = useAns(address)

  if (ans) {
    return (
      <Text
        color="#3498db"
        _hover={{
          color: '#1d6fa5',
          textDecoration: 'none',
        }}
        as={Link}
        rel="noopener noreferrer"
        target="_blank"
        href={`https://www.aptosnames.com/name/${ans}`}
      >
        {`${ans}.apt`}
      </Text>
    )
  }

  return <Tag address={address} />
})

Name.displayName = 'Name'
