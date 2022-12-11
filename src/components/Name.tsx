import { Image, Text, TextProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { addressTagsMap } from 'config/address-tags'
import { memo } from 'react'
import ANSLogo from 'assets/icons/apscan-name.jpeg'
import { useAns } from 'hooks/useAns'

const container = css`
  line-height: 20px;
  > img {
    display: inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 0.25rem;
  }
  > span {
    vertical-align: baseline;
  }
`

export interface NameProps extends TextProps {
  address: string
}

export const Name = memo(({ address, ...props }: NameProps) => {
  const ans = useAns(address)

  return (
    <Text {...props} css={container}>
      {ans && <Image src={ANSLogo} />}
      <span>{ans || addressTagsMap[address.toLowerCase()]?.label || ''}</span>
    </Text>
  )
})

Name.displayName = 'Name'
