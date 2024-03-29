import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import { useMemo } from 'react'
import TableStat from 'components/TotalStat'
import { NumberFormat } from 'components/NumberFormat'
import { Address } from 'components/Address'
import { TokenEvent } from 'api/collection'
import { Version } from 'components/transaction/Version'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DateTime } from 'components/DateTime'
import { parseType } from 'pages/account/TokenEvents'
import { useTokenEventsQuery } from 'api/token'
import { queryRangeLimitMap } from 'config/api'

const helper = createColumnHelper<any>()

export const Events = ({
  creator,
  name,
  collectionName,
  count,
}: {
  creator: string
  name: string
  collectionName: string
  count: number
}) => {
  const maxCount = queryRangeLimitMap['token_events?collection_name&creator_address&token_name']
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data = [], isLoading } = useTokenEventsQuery(
    { creator, name, collectionName, start: (page - 1) * pageSize, pageSize },
    {
      skip: !creator || !name || !collectionName,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)

  const columns = useMemo(
    () => [
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
      helper.accessor('amount', {
        meta: {
          nowrap: true,
        },
        header: 'Amount',
        cell: (info) => {
          return <NumberFormat fallback="-" value={info.row.original?.data?.amount} />
        },
      }),
    ],
    []
  )

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
