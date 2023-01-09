import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import TableStat from 'components/TotalStat'
import { NumberFormat } from 'components/NumberFormat'
import { Address } from 'components/Address'
import { TokenEvent, useTokenEventsByCollectionQuery } from 'api/collection'
import { Version } from 'components/transaction/Version'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DateTime } from 'components/DateTime'
import { parseType } from 'pages/account/TokenEvents'
import { queryRangeLimitMap } from 'config/api'
import { Link } from 'components/link'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_version', {
    header: 'Tx Version',
    meta: {
      nowrap: true,
    },
    cell: (info) => <Version value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()?.toString()} />,
  }),
  helper.accessor('event_type', {
    meta: {
      nowrap: true,
    },
    header: 'Event',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('sender', {
    meta: {
      nowrap: true,
    },
    header: 'Sender',
    cell: (info) => {
      const event = info.row.original as TokenEvent
      const transferType = parseType({ ...event, type: event.event_type })

      if (transferType === 'OUT' || transferType === 'SELF') {
        return <Address size="short" value={info.row.original?.address} />
      }
      if (!info.row.original?.counter_party) {
        return '-'
      }
      return <Address size="short" value={info.row.original?.counter_party.address} />
    },
  }),
  helper.accessor('receiver', {
    meta: {
      nowrap: true,
    },
    header: 'Receiver',
    cell: (info) => {
      const event = info.row.original as TokenEvent
      const transferType = parseType({ ...event, type: event.event_type })

      if (transferType === 'IN' || transferType === 'SELF') {
        return <Address size="short" value={info.row.original?.address} />
      }

      if (!info.row.original?.counter_party) {
        return '-'
      }

      return <Address size="short" value={info.row.original?.counter_party.address} />
    },
  }),
  helper.accessor('token_name', {
    meta: {
      nowrap: true,
    },
    header: 'Name',
    cell: (info) => {
      const data = info.row.original as TokenEvent

      return (
        <Link
          to={`/token/${data.creator_address}/${encodeURIComponent(data.collection_name)}/${encodeURIComponent(
            data.token_name
          )}`}
          maxW="250px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {info.getValue()}
        </Link>
      )
    },
  }),
  helper.accessor('amount', {
    meta: {
      nowrap: true,
    },
    header: 'Amount',
    cell: (info) => {
      return <NumberFormat fallback="-" value={info.row.original?.data?.amount} />
    },
  }),
]

export const TokenEvents = ({ creator, name, count }: { creator: string; name: string; count: number }) => {
  const maxCount = queryRangeLimitMap['token_events?creator_address&collection_name']
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data = [] } = {}, isLoading } = useTokenEventsByCollectionQuery(
    { creator, name, start: (page - 1) * pageSize, pageSize },
    {
      skip: !creator || !name,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat maxCount={maxCount} count={count} variant="tabletab" object="token events" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
