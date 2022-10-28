import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { createColumnHelper } from '@tanstack/react-table'
import { useTransactionChangesQuery } from 'api'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { Hash } from 'components/Hash'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'
import { vars } from 'theme/theme.css'

const Badge = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${vars.colors.badgeBg};
  padding: 4px 8px;
  color: ${vars.text.body};
  font-size: 10px;
  height: 20px;
  font-weight: 500;
  white-space: nowrap;
`

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_index', {
    meta: {
      nowrap: true,
    },
    header: 'Index',
    cell: (info) => <NumberFormat prefix="#" value={info.getValue()} />,
  }),

  helper.accessor('tx_type', {
    meta: {
      nowrap: true,
    },
    header: 'Type',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),

  helper.accessor('data.address', {
    meta: {
      nowrap: true,
    },
    header: 'Address',
    cell: (info) => {
      if (info.row.original.type === 'WriteTableItem' || info.row.original.type === 'DeleteTableItem') {
        return <Badge>Table</Badge>
      }
      return <Address size="short" value={info.getValue()} />
    },
  }),

  helper.accessor('data.state_key_hash', {
    header: 'Stake Key Hash',
    cell: (info) => <Hash ellipsis value={info.getValue()} copyable />,
  }),

  helper.accessor('data.move_module_name', {
    header: 'Module',
    cell: (info) => info.getValue() || '-',
  }),

  helper.accessor('data.move_resource_name', {
    header: 'Resource',
    cell: (info) => info.getValue() || '-',
  }),

  helper.accessor('data.move_resource_data', {
    meta: {
      nowrap: true,
    },
    header: 'Data',
    cell: (info) => {
      const data = info.getValue()
      if (!data) return '-'
      return <JsonViewEllipsis maxWidth="320px" src={info.getValue()} />
    },
  }),

  helper.accessor('expand', {
    meta: {
      nowrap: true,
      isExpandButton: true,
    },
    header: (header) => {
      return (
        <ExpandButton
          expandAll
          expanded={header.table.getIsSomeRowsExpanded()}
          onClick={() => header.table.toggleAllRowsExpanded()}
        />
      )
    },
    cell: (info) => {
      const data = info.row.original?.data?.move_resource_data
      if (!data) return ''
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

const renderSubComponent = ({ row }: { row: any }) => {
  return <JsonView src={row.original?.data?.move_resource_data} withContainer />
}

const getRowCanExpand = (row: any) => {
  return Boolean(row?.original?.data?.move_resource_data)
}

export const Changes = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {}, isLoading } = useTransactionChangesQuery(
    {
      id: id!,
      start,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )

  const pageProps = useRangePagination(start, setStart, pageSize, {
    min: page?.min,
    max: page?.max,
    count: count,
  })

  return (
    <CardBody isLoading={isLoading || id == null || !count}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> changes
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        page={pageProps.page}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
        dataSource={data}
        columns={columns}
      />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
