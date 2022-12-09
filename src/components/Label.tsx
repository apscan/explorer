import { Text, TextProps } from '@chakra-ui/react'
import { addressTagsMap } from 'config/address-tags'
import { memo } from 'react'

export interface LabelProps extends TextProps {
  address: string
}

export const Label = memo(({ address, ...props }: LabelProps) => {
  if (!addressTagsMap[address]?.label) {
    return null
  }

  return (
    <Text
      display="inline-flex"
      color="#3498db"
      backgroundColor="rgba(52,152,219,.1)"
      fontSize=".65625rem"
      lineHeight="1.7"
      padding="0.2rem 0.5rem"
      borderRadius="6.1875rem"
      transition=".2s ease-in-out"
      _hover={{
        color: '#fff',
        backgroundColor: '#3498db',
      }}
      {...props}
    >
      {' '}
      {addressTagsMap[address]?.label}
    </Text>
  )
})

Label.displayName = 'Label'
