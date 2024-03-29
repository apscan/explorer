import { createColumnHelper } from '@tanstack/react-table'
import { useAccountsQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Container } from 'components/container'
import { DateTime } from 'components/DateTime'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useMemo } from 'react'
import { useAppStats, useTotalSupply } from 'state/api/hooks'
import { usePageSize } from 'hooks/usePageSize'
import { toFixedNumber } from 'utils/number'
import TableStat from 'components/TotalStat'
import { queryRangeLimitMap } from 'config/api'

const helper = createColumnHelper<any>()

export const Accounts = () => {
  const maxCount = queryRangeLimitMap['accounts_with_rank']
  const { address_count: count } = useAppStats()
  const totalSupply = useTotalSupply(false)
  const [pageSize, setPageSize, page, setPage] = usePageSize()

  const { data: { data } = {}, isLoading } = useAccountsQuery(
    {
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const columns = useMemo(
    () => [
      helper.accessor('balance_rank', {
        meta: {
          nowrap: true,
        },
        header: 'Rank',
        cell: (info) => <NumberFormat value={info.getValue()} />,
      }),
      helper.accessor('address', {
        meta: {
          nowrap: true,
        },
        header: 'Address',
        cell: (info) => <Address value={info.getValue()} size="short" />,
      }),
      helper.accessor('created_at_timestamp', {
        meta: {
          nowrap: true,
        },
        header: () => <SwitchDateFormat timeLabel="Time" ageLabel="Age" />,
        cell: (info) => <DateTime value={info.getValue()} />,
      }),
      helper.accessor('aptos_coin_balance', {
        meta: {
          nowrap: true,
        },
        header: 'Available (APT)',
        cell: (info) => <AmountFormat minimumFractionDigits={0} postfix={false} value={info.getValue()} />,
      }),
      helper.accessor('aptos_coin_staked', {
        meta: {
          nowrap: true,
        },
        header: 'Staked (APT)',
        cell: (info) => <AmountFormat minimumFractionDigits={0} postfix={false} value={info.getValue()} />,
      }),
      helper.accessor('aptos_coin_total_balance', {
        meta: {
          nowrap: true,
        },
        header: 'Balance (APT)',
        cell: (info) => <AmountFormat minimumFractionDigits={0} postfix={false} value={info.getValue()} />,
      }),
      helper.accessor('percentage', {
        meta: {
          nowrap: true,
        },
        header: 'Percentage',
        cell: (info) => {
          if (!totalSupply || info.row.original?.aptos_coin_total_balance === undefined) return '-'

          const aptosCoinBalance = toFixedNumber(info.row.original?.aptos_coin_total_balance || 0, 'fixed128x18')
          const _totalSupply = toFixedNumber(totalSupply || 0, 'fixed128x18')

          return (
            <NumberFormat
              minimumFractionDigits={8}
              maximumFractionDigits={8}
              value={aptosCoinBalance.divUnsafe(_totalSupply)}
              type="percent"
            />
          )
        },
      }),
      helper.accessor('transactions_count', {
        meta: {
          nowrap: true,
        },
        header: 'Txs',
        cell: (info) => <NumberFormat to={`/account/${info.row.original.address}?tab=tx`} value={info.getValue()} />,
      }),
      // helper.accessor('resources_count', {
      //   header: 'Resources',
      //   cell: (info) => (
      //     <NumberFormat to={`/account/${info.row.original.address}?tab=resoures`} value={info.getValue()} />
      //   ),
      // }),
      // helper.accessor('module_count', {
      //   header: 'Modules',
      //   cell: (info) => (
      //     <NumberFormat
      //       to={info.getValue() && `/account/${info.row.original.address}?tab=modules`}
      //       value={info.getValue()}
      //     />
      //   ),
      // }),
    ],
    [totalSupply]
  )

  const pageProps = useRangePagination(page, pageSize, !count ? count : count > maxCount ? maxCount : count, setPage)

  return (
    <Container>
      <DocumentTitle value="Aptos Accounts | Apscan" />
      <PageTitle value="Accounts" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <TableStat variant="table" maxCount={maxCount} object="accounts" count={count} />
          <Pagination {...pageProps} />
        </CardHead>
        <DataTable dataSource={data} columns={columns} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
