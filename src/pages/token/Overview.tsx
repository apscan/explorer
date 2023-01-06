import { Box, Flex } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { Mutability } from 'components/Mutability'
import { NumberFormat } from 'components/NumberFormat'
import { Link } from 'components/link'
import { Image as CImage } from '@chakra-ui/react'
import { Address } from 'components/Address'
import { TokenDetail } from 'api/token'
import { useEffect, useState } from 'react'
import TokenDefault from 'assets/tokens/TokenDefault'
import { css } from '@emotion/react'
import { CircularProgress } from '@chakra-ui/react'

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

const fetchImg = async (url: string): Promise<string> => {
  const res = await fetch(url, {})
  const contentType = res.headers.get('Content-Type')

  if (contentType?.includes('image')) {
    const blob = await res.blob()
    return blobToDataURL(blob)
  }

  return ''
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

  return new Promise((res) => {
    fr.onload = (e) => res(e.target?.result as string)
    fr.readAsDataURL(blob)
  })
}

const TokenImg: React.FC<{ uri?: string }> = ({ uri }) => {
  const [img, setImg] = useState<string>()
  const [errorOccured, setErrorOccured] = useState(false)

  if (uri?.startsWith('ipfs://')) {
    uri = `https://gateway.ipfs.io/ipfs/${uri.slice('ipfs://'.length)}`
  }

  useEffect(() => {
    if (!uri) {
      return
    }
    const fetchData = fetchTokenMeta(uri)
      .then((res) => {
        if (res instanceof Blob) {
          return blobToDataURL(res)
        }

        return fetchImg(res.image)
      })
      .then(setImg)

    Promise.race([
      fetchData,
      new Promise((_, rej) => {
        setTimeout(() => rej(), 18000)
      }),
    ]).catch(() => setErrorOccured(true))
  }, [uri])

  console.log('errorOccured', errorOccured)

  if (errorOccured) {
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

  if (!img) {
    return (
      <CircularProgress
        color="white"
        isIndeterminate
        size="100px"
        sx={{
          '.chakra-progress__track': {
            stroke: 'rgb(190, 190, 190)',
            strokeWidth: '8px',
          },
          '.chakra-progress__indicator': {
            strokeWidth: '9px',
          },
        }}
        trackColor="red"
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
      <Card maxH="390px">
        <Box
          padding="0 12px"
          css={css`
            & > div:nth-of-type(1) > div:nth-of-type(2) {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          `}
        >
          {renderRow(
            'Collection',
            !data ? (
              '-'
            ) : (
              <Link to={`/collection/${data.creator_address}/${encodeURIComponent(data.collection_name)}`}>
                {data.creator_address}::{data.collection_name}
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
                : (parseInt(data.token_data.royalty.royalty_points_numerator) /
                    parseInt(data.token_data.royalty.royalty_points_denominator)) *
                  100

            return (
              <Flex alignItems="center" justifyContent="flex-start" overflow="hidden">
                <Address
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'nowrap',
                  }}
                  fallback="-"
                  value={data?.token_data.royalty?.payee_address}
                  size="full"
                />
                <NumberFormat
                  maximumFractionDigits={2}
                  prefix=" ("
                  postfix="%) "
                  value={isNaN(fee) ? undefined : fee}
                  fallback="-"
                />
                {data?.token_data.mutability_config?.royalty !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.royalty} />
                )}
              </Flex>
            )
          })}
          {renderRow('Supply', <NumberFormat useGrouping fallback="-" value={data?.token_data.supply} />)}
          {renderRow(
            'Maximum',
            data?.token_data.maximum ? (
              <Flex alignItems="center">
                <NumberFormat useGrouping value={data?.token_data.maximum} />
                {data?.token_data.mutability_config?.maximum !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.maximum} />
                )}
              </Flex>
            ) : (
              '-'
            )
          )}
          {/* {renderRow(
            'Largest Property Version',
            <NumberFormat fallback="-" useGrouping value={data?.token_data.largest_property_version} />
          )} */}
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
                {data?.token_data.mutability_config?.uri !== undefined && (
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
                <Box
                  css={css`
                    padding: 16px 40px 16px 16px;
                    border-radius: 8px;
                    border: 1px solid #e7eaf3;
                    background-color: #f8f9fa;
                    max-height: 80px;
                    overflow: auto;
                  `}
                >
                  {data.token_data.description}
                </Box>
                {data?.token_data.mutability_config?.description !== undefined && (
                  <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.description} />
                )}
              </Flex>
            ) : (
              '-'
            )
          )}
        </Box>
      </Card>
      <Card maxH="390px">
        <Flex p={4} alignItems="center" height="100%" justifyContent="center">
          <TokenImg uri={data?.token_data.uri || data?.token_data.image_uri} />
        </Flex>
      </Card>
    </>
  )
}
