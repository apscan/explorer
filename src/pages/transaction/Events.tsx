import { createColumnHelper } from '@tanstack/react-table'
import { useTransactionEventsQuery } from 'api'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { TypeParam } from 'components/TypeParam'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Box } from 'components/container'
import { Divider } from '@chakra-ui/react'
import TableStat from 'components/TotalStat'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_index', {
    meta: {
      nowrap: true,
    },
    header: 'Index',
    cell: (info) => <NumberFormat prefix="#" value={info.getValue()} />,
  }),
  helper.accessor('address', {
    meta: {
      nowrap: true,
    },
    header: 'Address',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  // helper.accessor('time_microseconds', {
  //   header: () => <SwitchDateFormat />,
  //   cell: (info) => <DateTime value={info.getValue()} />,
  // }),
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
              maxWidth: '380px',
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
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useTransactionEventsQuery(
    {
      id: id!,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: id == null,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <CardBody isLoading={isLoading || id == null}>
      <CardHead variant="tabletab">
        <TableStat count={count} variant="tabletab" object="events" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        sx={{
          '& > table td:nth-of-type(5)': {
            width: '400px',
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
