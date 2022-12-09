import { Text, TextProps } from '@chakra-ui/react'
import { addressTagsMap } from 'config/address-tags'
import { memo } from 'react'

export interface LabelProps extends TextProps {
  address: string
}

export const Label = memo(({ address, ...props }: LabelProps) => {
  return (
    <Text
      color="#77838f"
      backgroundColor="rgba(119,131,143,.1)"
      fontSize=".65625rem"
      lineHeight="1.7"
      padding="0.2rem 0.5rem"
      borderRadius="6.1875rem"
      transition=".2s ease-in-out"
      _hover={{
        color: '#fff',
        backgroundColor: '#77838f',
      }}
      {...props}
    >
      {' '}
      {addressTagsMap[address].label}
    </Text>
  )
})

Label.displayName = 'Label'
