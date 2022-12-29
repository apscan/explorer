import { createColumnHelper, Row } from '@tanstack/react-table'
import { DateTime } from 'components/DateTime'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { memo } from 'react'
import { ExpandButton } from 'components/table/ExpandButton'
import { Collection } from 'api/collection'
import { truncated } from 'utils/truncated'
import { Link } from 'components/link'
import { Mutability } from 'components/Mutability'
import { Box, Flex } from 'components/container'
import { Text } from '@chakra-ui/react'
import { css } from '@emotion/react'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('name', {
    meta: {
      nowrap: true,
    },
    header: 'Name',
    cell: (info) => {
      const data = info.row.original as Collection

      return (
        <Link sx={{ wordWrap: 'nowrap' }} to={`/collection/${data.creator_address}/${data.collection_name}`}>
          {truncated(data.creator_address, 8)}::{data.collection_name}
        </Link>
      )
    },
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => {
      const data = info.row.original as Collection

      return <DateTime value={data.created_at?.time_microseconds.toString()} />
    },
  }),
  helper.accessor('collection_data.supply', {
    header: 'Token Supply',
    cell: (info) => {
      const data = info.row.original as Collection

      return (
        <NumberFormat
          to={`/collection/${data.creator_address}/${data.collection_name}?tab=tokens`}
          useGrouping
          value={data.collection_data.supply}
        />
      )
    },
  }),
  helper.accessor('addresses_count', {
    header: 'Holders',
    meta: {
      nowrap: true,
    },
    cell: (info) => <NumberFormat useGrouping value={info.getValue()} />,
  }),
  helper.accessor('uri', {
    header: 'URI',
    cell: (info) => {
      const data = info.row.original as Collection

      return (
        <Flex alignItems="center">
          <Link
            maxW="180px"
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
      )
    },
  }),
  helper.accessor('desc', {
    header: 'Description',
    cell: (info) => {
      const data = info.row.original as Collection

      return (
        <Flex alignItems="center">
          <Text maxW="180px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {data.collection_data.description}
          </Text>
          <Mutability marginLeft="5px" mutable={data.collection_data.mutability_config.description} />
        </Flex>
      )
    },
  }),
  helper.accessor('expand', {
    header: (header) => {
      return (
        <ExpandButton
          expandAll
          expanded={header.table.getIsAllRowsExpanded()}
          onClick={() => header.table.toggleAllRowsExpanded()}
        />
      )
    },
    meta: {
      isExpandButton: true,
    },
    cell: (info) => <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />,
  }),
]

type CollectionsTableProps = {
  data?: Collection[]
  page?: number
}

const renderSubComponent = ({ row }: { row: Row<any> }) => {
  return (
    <Box
      css={css`
        padding: 16px 40px 16px 16px;
        border-radius: 8px;
        border: 1px solid #e7eaf3;
        background-color: #f8f9fa;
        max-height: 416px;
        overflow: auto;
      `}
    >
      {row.original?.collection_data.description}
    </Box>
  )
}

export const CollectionsTable = memo(({ data, page }: CollectionsTableProps) => {
  return (
    <DataTable
      page={page}
      renderSubComponent={renderSubComponent}
      dataSource={data}
      columns={columns}
      getRowCanExpand={() => true}
    />
  )
})
