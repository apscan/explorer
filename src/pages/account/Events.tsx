import { Divider } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useAccountEventsQuery } from 'api'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { Version } from 'components/transaction/Version'
import { TypeParam } from 'components/TypeParam'
import { queryRangeLimitMap } from 'config/api'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_version', {
    meta: {
      nowrap: true,
    },
    header: 'Tx Version',
    cell: (info) => <Version value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('creation_number', {
    meta: {
      nowrap: true,
    },
    header: 'Creation',
    cell: (info) => <NumberFormat prefix="#" value={info.getValue()} />,
  }),
  helper.accessor('sequence_number', {
    meta: {
      nowrap: true,
    },
    header: 'Sequence',
    cell: (info) => <NumberFormat prefix="#" value={info.getValue()} />,
  }),
  helper.accessor('type', {
    header: 'Type',
    cell: (info) => {
      return (
        <Box
          sx={{
            display: 'inline-flex',
            '> div': {
              maxWidth: '300px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        >
          <TypeParam fallback="-" value={info.getValue()} />
        </Box>
      )
    },
  }),

  helper.accessor('data', {
    meta: {
      nowrap: true,
    },
    header: 'Data',
    cell: (info) => <JsonViewEllipsis src={info.getValue()} />,
  }),

  helper.accessor('expand', {
    meta: {
      isExpandButton: true,
      nowrap: true,
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
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

const renderSubComponent = ({ row }: { row: any }) => {
  return (
    <Box>
      <TypeParam fallback="-" copyable={false} size="full" value={row.original?.type} />
      <Divider color="#e7eaf3" />
      <JsonView fallback="-" src={row.original?.data} withContainer />
    </Box>
  )
}

const getRowCanExpand = (row: any) => {
  return Boolean(row?.original?.data)
}

export const Events = ({ id, count }: { id: any; count: number }) => {
  const maxCount = queryRangeLimitMap['events?address']
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useAccountEventsQuery(
    {
      id: id!,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )

  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat variant="tabletab" maxCount={maxCount} object="events" count={count} />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        sx={{
          '& > table td:nth-of-type(5)': {
            width: '320px',
          },
        }}
        page={pageProps.page}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
        dataSource={data}
        columns={columns}
      />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
