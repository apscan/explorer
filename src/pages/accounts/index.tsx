import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useAccountsQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box, Container } from 'components/container'
import { DateTime } from 'components/DateTime'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useCallback, useMemo, useState } from 'react'
import { useAppStats, useTotalSupply } from 'state/api/hooks'
import { usePageSize } from 'state/application/hooks'
import { toFixedNumber } from 'utils/number'

const helper = createColumnHelper<any>()

export const Accounts = () => {
  const { address_count: addressCount } = useAppStats()
  const totalSupply = useTotalSupply(false)
  const [pageSize, setPageSize] = usePageSize()
  const [offset, setOffset] = useState<number | undefined>(0)

  const { data: { data, page } = {}, isLoading } = useAccountsQuery(
    {
      pageSize,
      offset,
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
        header: () => <SwitchDateFormat timeLabel="Creation Time" ageLabel="Creation Age" />,
        cell: (info) => <DateTime value={info.getValue()} />,
      }),
      // helper.accessor('authentication_key', {
      //   header: 'Authentication Key',
      //   cell: (info) => <Hash value={info.getValue()} size="short" />,
      // }),
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
          if (!totalSupply || info.row.original?.aptos_coin_total_balance === undefined) return '--'

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
        header: 'Transactions',
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

  const queryCount = useMemo(() => {
    if (addressCount === undefined) return undefined
    return addressCount > 10000 ? 10000 : addressCount
  }, [addressCount])

  const [showPage, totalPage] = useMemo(() => {
    if (queryCount && pageSize && page?.max) {
      return [Math.floor(page.max / pageSize) + 1, Math.floor(queryCount / pageSize)]
    }

    return []
  }, [queryCount, page?.max, pageSize])

  const onSelectPageSize = useCallback(
    (pageSize: number) => {
      setPageSize(pageSize)
    },
    [setPageSize]
  )

  const onNextPage = useCallback(() => {
    if (page?.max) setOffset(page?.max + 1)
  }, [page?.max])

  const onPrePage = useCallback(() => {
    if (page?.min) setOffset(page.min > pageSize ? page.min - pageSize : 0)
  }, [page?.min, pageSize])

  const onFirstPage = useCallback(() => {
    setOffset(0)
  }, [])

  const onLastPage = useCallback(() => {
    if (queryCount !== undefined) {
      setOffset(queryCount - pageSize)
    }
  }, [queryCount, pageSize])

  return (
    <Container>
      <DocumentTitle value="Aptos Accounts | Apscan" />
      <PageTitle value="Accounts" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            <Box>
              Total of <NumberFormat useGrouping fallback="--" value={addressCount} /> accounts
            </Box>
            {addressCount && addressCount > 10000 && (
              <Box
                css={css`
                  margin-left: 4px;
                `}
              >
                (showing the top 10,000 only)
              </Box>
            )}
          </CardHeadStats>
          <Pagination
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onPrePage={onPrePage}
            onLastPage={onLastPage}
          />
        </CardHead>
        <DataTable dataSource={data} columns={columns} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={onSelectPageSize} />
          <Pagination
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onPrePage={onPrePage}
            onLastPage={onLastPage}
          />
        </CardFooter>
      </Card>
    </Container>
  )
}
