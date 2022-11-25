import { createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
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
import { FixedNumber } from '@ethersproject/bignumber'
import { toFixedNumber } from 'utils/number'
import { Box } from 'components/container'

const helper = createColumnHelper<any>()
const maxCount = 1000

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
  totalSupply: string
  price?: string
}) => {
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

  const total = useMemo(() => new RealBigNumber(totalSupply), [totalSupply])
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
        cell: (info) => <AmountFormat minimumFractionDigits={0} postfix={false} value={info.getValue()} />,
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
          const value = FixedNumber.from(price.toString(), 'fixed128x18').mulUnsafe(
            toFixedNumber(info.row.original?.balance).toFormat('fixed128x18')
          )

          return (
            <NumberFormat
              textTransform="uppercase"
              fixed={0}
              useGrouping
              maximumFractionDigits={3}
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
        cell: (info) => (
          <NumberFormat to={`/account/${info.row.original?.address}?tab=events`} value={info.getValue() || 0} />
        ),
      }),
      helper.accessor('withdraw_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Withdraw Events',
        cell: (info) => (
          <NumberFormat to={`/account/${info.row.original?.address}?tab=events`} value={info.getValue() || 0} />
        ),
      }),
    ],
    [page, pageSize, price, total]
  )

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of&nbsp;
          <NumberFormat useGrouping fallback="-" value={count} />
          &nbsp;holders
          {count && count > maxCount && (
            <>
              &nbsp;(showing the top&nbsp;
              <NumberFormat useGrouping value={maxCount} />
              &nbsp;only)
            </>
          )}
        </CardHeadStats>
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
