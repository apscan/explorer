import styled from '@emotion/styled'
import { createColumnHelper } from '@tanstack/react-table'
import { useTransactionChangesQuery } from 'api'
import { Address } from 'components/Address'
import { CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { Hash } from 'components/Hash'
import { JsonView } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
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
  helper.accessor('type', {
    header: 'Type',
    cell: (info) => <Badge>{info.getValue()}</Badge>,
  }),

  helper.accessor('data.address', {
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
    cell: (info) => <Hash value={info.getValue()} size="short" />,
  }),

  helper.accessor('data.move_resource_data', {
    header: 'Data',
    cell: (info) => {
      if (info.getValue()) {
        return <JsonView collapsed={0} src={info.getValue()} />
      }
      return '-'
    },
  }),
]

export const Changes = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {} } = useTransactionChangesQuery(
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
    <Box padding="12px">
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> changes
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </Box>
  )
}
