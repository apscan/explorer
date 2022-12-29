import { Box, Flex } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { DateTime } from 'components/DateTime'
import { DateFormat } from 'state/application/slice'
import { Collection } from 'api/collection'
import { Mutability } from 'components/Mutability'
import { NumberFormat } from 'components/NumberFormat'
import { Link } from 'components/link'
import { Text } from '@chakra-ui/react'

export const Overview = ({ data }: { data: Collection | undefined }) => {
  return (
    <Card>
      <Box padding="0 12px">
        {renderRow(
          'Creation',
          <DateTime format={DateFormat.FULL} value={data?.created_at.time_microseconds.toString()} />
        )}
        {renderRow(
          'Token Supply',
          <NumberFormat
            to={`/collection/${data?.creator_address}/${data?.collection_name}?tab=tokens`}
            useGrouping
            value={data?.collection_data.supply}
          />
        )}
        {renderRow(
          'Token Maximum',
          data ? (
            <Flex alignItems="center">
              <NumberFormat useGrouping value={data?.collection_data.maximum} />
              <Mutability marginLeft="5px" mutable={data?.collection_data.mutability_config.maximum} />
            </Flex>
          ) : (
            '-'
          )
        )}
        {renderRow(
          'URI',
          data?.collection_data.uri ? (
            <Flex alignItems="center">
              <Link
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                href={data.collection_data.uri}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.collection_data.uri}
              </Link>
              <Mutability marginLeft="5px" mutable={data.collection_data.mutability_config.uri} />
            </Flex>
          ) : (
            '-'
          )
        )}
        {renderRow(
          'Description',
          data ? (
            <Flex alignItems="center">
              <Text>{data.collection_data.description}</Text>
              <Mutability marginLeft="5px" mutable={data.collection_data.mutability_config.description} />
            </Flex>
          ) : (
            '-'
          )
        )}
      </Box>
    </Card>
  )
}
