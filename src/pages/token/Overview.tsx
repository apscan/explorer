import { Box, Flex } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { Mutability } from 'components/Mutability'
import { NumberFormat } from 'components/NumberFormat'
import { Link } from 'components/link'
import { Image as CImage, Text } from '@chakra-ui/react'
import { Address } from 'components/Address'
import { TokenDetail } from 'api/token'
import { truncated } from 'utils/truncated'
import { useEffect, useState } from 'react'
import TokenDefault from 'assets/tokens/TokenDefault'

type TokenMeta = {
  animation_url: string
  description: string
  image: string
  name: string
  properties: {
    key: string
    type: string
    value: string
  }[]
}

const fetchTokenMeta = async (url: string): Promise<TokenMeta | Blob> => {
  const res = await fetch(url)
  const contentType = res.headers.get('Content-Type')

  if (contentType?.includes('image')) {
    return await res.blob()
  }

  return (await res.json()) as TokenMeta
}

async function blobToDataURL(blob: Blob): Promise<string> {
  const fr = new FileReader()

  return new Promise((res, rej) => {
    fr.onload = (e) => res(e.target?.result as string)
    fr.readAsDataURL(blob)
  })
}

const TokenImg: React.FC<{ uri?: string }> = ({ uri }) => {
  const [img, setImg] = useState<string>()

  if (uri?.startsWith('ipfs://')) {
    uri = `https://gateway.ipfs.io/ipfs/${uri.slice('ipfs://'.length)}`
  }

  useEffect(() => {
    if (!uri) {
      return
    }

    fetchTokenMeta(uri)
      .then((res) => {
        if (res instanceof Blob) {
          return blobToDataURL(res)
        }

        return res.image
      })
      .then(setImg)
      .catch(() => {})
  }, [uri])

  if (!img) {
    return (
      <TokenDefault
        sx={{
          fill: '#606672',
          maxWidth: '100%',
          maxHeight: '100%',
          width: '500px',
          height: '500px',
        }}
      />
    )
  }

  return (
    <CImage
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      src={img}
    />
  )
}

export const Overview = ({ data }: { data: TokenDetail | undefined }) => {
  return (
    <>
      <Card>
        <Flex alignItems="center" height="100%" justifyContent="center">
          <TokenImg uri={data?.token_data.uri || data?.token_data.image_uri} />
        </Flex>
      </Card>
      <Card>
        <Box padding="0 12px">
          {renderRow('Creator', <Address size="long" value={data?.creator_address} />)}
          {renderRow(
            'Collection',
            !data ? (
              '-'
            ) : (
              <Link to={`/collection/${data.creator_address}/${data.collection_name}`}>
                {truncated(data.creator_address, 8)}::{data.collection_name}
              </Link>
            )
          )}
          {renderRow('Royalty', () => {
            if (!data) {
              return '-'
            }

            const fee =
              !data.token_data.royalty || data.token_data.royalty.royalty_points_denominator === '0'
                ? NaN
                : parseInt(data.token_data.royalty.royalty_points_numerator) /
                  parseInt(data.token_data.royalty.royalty_points_denominator)

            return (
              <Flex alignItems="center">
                <NumberFormat postfix="%" value={isNaN(fee) ? undefined : fee} fallback="-" />
                {data?.token_data.mutability_config && data?.token_data.mutability_config.royalty !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.royalty} />
                )}
              </Flex>
            )
          })}
          {renderRow('Royalty Payee', <Address value={data?.token_data.royalty?.payee_address} size="long" />)}
          {renderRow('Supply', <NumberFormat useGrouping fallback="-" value={data?.token_data.supply} />)}
          {renderRow(
            'Maximum',
            data ? (
              <Flex alignItems="center">
                <NumberFormat useGrouping value={data?.token_data.maximum} />
                {data?.token_data.mutability_config && data?.token_data.mutability_config.maximum !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.maximum} />
                )}
              </Flex>
            ) : (
              '-'
            )
          )}
          {renderRow(
            'Largest Property Version',
            <NumberFormat fallback="-" useGrouping value={data?.token_data.largest_property_version} />
          )}
          {renderRow(
            'URI',
            data?.token_data.uri ? (
              <Flex alignItems="center">
                <Link
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  href={data.token_data.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.token_data.uri}
                </Link>
                {data?.token_data.mutability_config && data?.token_data.mutability_config.uri !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.uri} />
                )}
              </Flex>
            ) : (
              '-'
            )
          )}
          {renderRow(
            'Description',
            data?.token_data.description ? (
              <Flex alignItems="center">
                <Text>{data.token_data.description}</Text>
                {data?.token_data.mutability_config && data?.token_data.mutability_config.description !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.description} />
                )}
              </Flex>
            ) : (
              '-'
            )
          )}
          {renderRow('Properties', JSON.stringify(data?.token_data.default_properties?.map))}
        </Box>
      </Card>
    </>
  )
}
