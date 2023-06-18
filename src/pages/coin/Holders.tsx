import { createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { useCoinHoldersQuery } from 'api'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import { AmountFormat } from 'components/AmountFormat'
import { useMemo } from 'react'
import RealBigNumber from 'bignumber.js'
import TableStat from 'components/TotalStat'
import { queryRangeLimitMap } from 'config/api'

const helper = createColumnHelper<any>()

export const Holders = ({
  type: id,
  count = 0,
  decimals,
  symbol,
  totalSupply,
  price,
}: {
  type?: string
  count?: number
  decimals: number
  symbol: string
  totalSupply?: string
  price?: number
}) => {
  const maxCount = queryRangeLimitMap['coin_balances_rank?move_resource_generic_type_params']
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useCoinHoldersQuery(
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

  const total = useMemo(() => new RealBigNumber(totalSupply || '0'), [totalSupply])
  const columns = useMemo(
    () => [
      helper.accessor('rank', {
        header: 'Rank',
        meta: {
          nowrap: true,
        },
        cell: (info: any) => <NumberFormat value={info.row.index + 1 + (page - 1) * pageSize} />,
      }),
      helper.accessor('address', {
        meta: {
          nowrap: true,
        },
        header: 'Address',
        cell: (info) => <Address value={info.getValue()} size="short" />,
      }),
      helper.accessor('balance', {
        meta: {
          nowrap: true,
        },
        header: 'Balance',
        cell: (info) => (
          <AmountFormat minimumFractionDigits={0} postfix={false} decimals={decimals} value={info.getValue()} />
        ),
      }),
      helper.accessor('percentage', {
        meta: {
          nowrap: true,
        },
        header: 'Percentage',
        cell: (info) => {
          const balance = new RealBigNumber(info.row.original?.balance || '0')
          if (total.isZero()) {
            return '-'
          }
          const percent = balance.multipliedBy(new RealBigNumber(100)).div(total).toFixed(8)

          return `${percent}%`
        },
      }),
      helper.accessor('value', {
        meta: {
          nowrap: true,
        },
        header: 'Value',
        cell: (info) => {
          if (!price) {
            return '-'
          }
          const value = new RealBigNumber(price)
            .multipliedBy(info.row.original?.balance)
            .div(Math.pow(10, decimals))
            .toNumber()

          return (
            <NumberFormat
              textTransform="uppercase"
              useGrouping
              maximumFractionDigits={0}
              prefix="$"
              value={value}
              fallback="-"
            />
          )
        },
      }),
      helper.accessor('deposit_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Deposit Events',
        cell: (info) => {
          const deposit_events =
            info.row.original?.events_count?.find((event: any) => event.event_type.includes('DepositEvent'))
              ?.events_count || 0

          return (
            <NumberFormat
              fallback="-"
              to={`/account/${info.row.original?.address}?tab=events`}
              value={deposit_events}
            />
          )
        },
      }),
      helper.accessor('withdraw_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Withdraw Events',
        cell: (info) => {
          const withdraw_events =
            info.row.original?.events_count?.find((event: any) => event.event_type.includes('WithdrawEvent'))
              ?.events_count || 0

          return (
            <NumberFormat
              fallback="-"
              to={`/account/${info.row.original?.address}?tab=events`}
              value={withdraw_events}
            />
          )
        },
      }),
    ],
    [decimals, page, pageSize, price, total]
  )

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat maxCount={maxCount} count={count} variant="tabletab" object="holders" />
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
