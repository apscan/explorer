import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useBlocksQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHeight } from 'components/block/BlockHeight'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Box, Container } from 'components/container'
import { DateTime } from 'components/DateTime'
import { DocumentTitle } from 'components/DocumentTitle'
import { Link } from 'components/link'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { useCustomSearchParams } from 'hooks/useCustomSearchParams'
import { useMaxValue } from 'hooks/useMaxValue'
import { usePageStartLimit } from 'hooks/usePageStartLimit'
import React from 'react'
import { Fragment, useCallback, useMemo } from 'react'
import { useLatestStats } from 'state/api/hooks'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('height', {
    meta: {
      nowrap: true,
    },
    header: 'Height',
    cell: (info) => <BlockHeight value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('proposer', {
    meta: {
      nowrap: true,
    },
    header: 'Proposer',
    cell: (info) => {
      const failed_proposers_count = info.row.original.failed_proposers_count
      const failed_proposers = failed_proposers_count > 0 ? ` (${failed_proposers_count})` : null
      const failedproposers = info.row.original.failed_proposers

      return (
        <Fragment>
          <Address value={info.getValue()} size="short" />
          {failedproposers && (
            <Popover trigger="hover" placement="right">
              <PopoverTrigger>
                <span style={{ color: '#de4437' }}>{failed_proposers}</span>
              </PopoverTrigger>
              <PopoverContent
                css={css`
                  border: none;
                  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 70%);
                  padding: 0.75em;
                  width: auto;
                `}
              >
                <PopoverArrow />
                <Box>
                  <Text
                    sx={{
                      fontWeight: 700,
                      color: '#4a4f55',
                      marginBottom: '4px',
                    }}
                  >
                    Failed Proposers:
                  </Text>
                  {failedproposers.map((proposer: string) => (
                    <Box
                      sx={{
                        color: '#1e2022',
                        fontSize: '12px',
                      }}
                      key={proposer}
                    >
                      {proposer}
                    </Box>
                  ))}
                </Box>
              </PopoverContent>
            </Popover>
          )}
        </Fragment>
      )
    },
  }),
  helper.accessor('epoch', {
    meta: {
      nowrap: true,
    },
    header: 'Epoch',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
  helper.accessor('round', {
    meta: {
      nowrap: true,
    },
    header: 'Round',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
  helper.accessor('transaction_version', {
    meta: {
      nowrap: true,
    },
    header: 'First Tx',
    cell: (info) => (
      <Link as={NumberFormat} to={`/tx/${info.getValue()}`} value={info.getValue()} />
    ),
  }),
  helper.accessor('', {
    meta: {
      nowrap: true,
    },
    header: 'Last Tx',
    cell: (info) => {
      const lastTxVersion =
        info.row.original.transaction_version + info.row.original.transactions_count - 1
      return <Link as={NumberFormat} to={`/tx/${lastTxVersion}`} value={lastTxVersion} />
    },
  }),
  helper.accessor('transactions_count', {
    meta: {
      nowrap: true,
    },
    header: 'Txs',
    cell: (info) => (
      <Link
        as={NumberFormat}
        to={`/block/${info.row.original.height}?tab=tx`}
        value={info.getValue()}
      />
    ),
  }),
  helper.accessor('gas_fees', {
    meta: {
      nowrap: true,
    },
    header: 'Fees (APT)',
    cell: (info) =>
      info.getValue() ? <AmountFormat postfix=" 🔥" value={info.getValue()} /> : '-',
  }),
]

export const Blocks = () => {
  const { limit: pageSize, setLimit: setPageSize, start, setStart } = usePageStartLimit()
  const [search, setSearch] = useCustomSearchParams()
  const { latest_block_height: lastBlockHeight } = useLatestStats()

  const {
    data: { data, page = {} } = {},
    isLoading,
    isFetching,
  } = useBlocksQuery(
    {
      pageSize,
      start,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const isInitialLoading = useMemo(() => {
    if (start === undefined && isFetching) return true
    return isLoading
  }, [start, isLoading, isFetching])

  const latestBlockHeight = useMaxValue(
    lastBlockHeight > (page?.max ?? 0) ? lastBlockHeight : page?.max
  )

  const [currentMinBlock, currentMaxBlock] = useMemo(() => {
    if (!data) return []

    return [data[data.length - 1].height, data[0].height]
  }, [data])

  const [showPage, totalPage] = useMemo(() => {
    if (latestBlockHeight && pageSize) {
      return [
        Math.floor((latestBlockHeight + 1 - currentMaxBlock) / pageSize) + 1,
        Math.floor(latestBlockHeight / pageSize),
      ]
    }

    return []
  }, [latestBlockHeight, currentMaxBlock, pageSize])

  const onSelectPageSize = useCallback(
    (pageSize: number) => {
      delete search.start
      setSearch({ ...search, limit: `${pageSize}` })
      setStart(undefined)
      setPageSize(pageSize)
    },
    [search, setPageSize, setSearch, setStart]
  )

  const onNextPage = useCallback(() => {
    if (currentMinBlock) {
      const start: number = currentMinBlock - 1
      setSearch({ ...search, start: `${start}` })
      setStart(start)
    }
  }, [currentMinBlock, search, setSearch, setStart])
  const onPrePage = useCallback(() => {
    if (!currentMaxBlock) {
      return
    }
    if (showPage === 2) {
      delete search.start
      setSearch({ ...search })
      setStart(undefined)
    } else {
      const start: number = currentMaxBlock + pageSize
      setSearch({ ...search, start: `${start}` })
      setStart(start)
    }
  }, [currentMaxBlock, showPage, search, setSearch, setStart, pageSize])
  const onFirstPage = useCallback(() => {
    delete search.start
    setSearch({ ...search })
    setStart(undefined)
  }, [search, setSearch, setStart])

  const onLastPage = useCallback(() => {
    if (pageSize) {
      setSearch({ ...search, start: `${pageSize - 1}` })
      setStart(pageSize - 1)
    }
  }, [pageSize, search, setSearch, setStart])

  return (
    <Container>
      <DocumentTitle value="Aptos Blocks | Apscan" />
      <PageTitle value="Blocks" />
      <Card variant="table" isLoading={isInitialLoading}>
        <CardHead variant="table">
          <TableStat variant="table" object="blocks" count={latestBlockHeight} />
          <Pagination
            syncUrl={false}
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onPrePage={onPrePage}
          />
        </CardHead>
        <DataTable dataSource={data} columns={columns} />
        <CardFooter variant="table">
          <ShowRecords syncUrl={false} pageSize={pageSize} onSelect={onSelectPageSize} />
          <Pagination
            syncUrl={false}
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onPrePage={onPrePage}
          />
        </CardFooter>
      </Card>
    </Container>
  )
}
