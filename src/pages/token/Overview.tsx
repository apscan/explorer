import { Box, Flex } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { Mutability } from 'components/Mutability'
import { NumberFormat } from 'components/NumberFormat'
import { Link } from 'components/link'
import { Text } from '@chakra-ui/react'
import { Address } from 'components/Address'
import { TokenDetail } from 'api/token'
import { truncated } from 'utils/truncated'

export const Overview = ({ data }: { data: TokenDetail | undefined }) => {
  return (
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
        {renderRow(
          'Description',
          data?.token_data.description ? (
            <Flex alignItems="center">
              <Text>{data.token_data.description}</Text>
              <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.description} />
            </Flex>
          ) : (
            '-'
          )
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
              <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.uri} />
            </Flex>
          ) : (
            '-'
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
              <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.royalty} />
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
              <Mutability marginLeft="5px" mutable={data?.token_data.mutability_config.maximum} />
            </Flex>
          ) : (
            '-'
          )
        )}
        {renderRow(
          'Largest Property Version',
          <NumberFormat fallback="-" useGrouping value={data?.token_data.largest_property_version} />
        )}
      </Box>
    </Card>
  )
}
