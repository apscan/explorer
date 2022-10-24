import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { createColumnHelper } from '@tanstack/react-table'
import { useBlocksQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHeight } from 'components/block/BlockHeight'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box, Container, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { DocumentTitle } from 'components/DocumentTitle'
import { Link } from 'components/link'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Tooltip } from 'components/Tooltip'
import { useCallback, useMemo, useState } from 'react'
import { useAppStats } from 'state/api/hooks'
import { usePageSize } from 'state/application/hooks'
import { vars } from 'theme/theme.css'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('height', {
    header: 'Block',
    cell: (info) => <BlockHeight value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('proposer', {
    header: 'Proposer',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Tooltip>
          <Box
            css={css`
              cursor: pointer;
              margin-right: 8px;
              background: ${vars.colors.link};
              color: #fff;
              padding: 0 6px;
              font-size: 12px;
              font-weight: 500;
              user-select: none;
              border-radius: 4px;
            `}
          >
            {info.row.original.failed_proposers_count}
          </Box>
        </Tooltip>

        <Address value={info.getValue()} size="short" />
      </InlineBox>
    ),
  }),
  helper.accessor('votes', {
    header: 'Votes',
    cell: (info) => null,
  }),
  helper.accessor('epoch', {
    header: 'Epoch',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
  helper.accessor('round', {
    header: 'Round',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
  helper.accessor('transactions_count', {
    header: 'Txs',
    cell: (info) => <Link as={NumberFormat} to={`/block/${info.row.original.height}?tab=tx`} value={info.getValue()} />,
  }),
  helper.accessor('gas_fees', {
    header: 'Fees (APT)',
    cell: (info) => <AmountFormat postfix={false} value={info.getValue()} />,
  }),
]

export const Blocks = () => {
  const { latest_block_height: latestBlockHeight } = useAppStats()

  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(latestBlockHeight)

  const { data, isLoading } = useBlocksQuery(
    {
      pageSize,
      start,
    },
    {
      refetchOnMountOrArgChange: true,
    }
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
      setPageSize(pageSize)
    },
    [setPageSize]
  )

  const onNextPage = useCallback(() => {
    if (currentMinBlock) setStart(currentMinBlock - 1)
  }, [currentMinBlock])
  const onPrePage = useCallback(() => {
    if (currentMaxBlock) setStart(currentMaxBlock + pageSize)
  }, [currentMaxBlock, pageSize])
  const onFirstPage = useCallback(() => {
    setStart(latestBlockHeight)
  }, [latestBlockHeight])

  const onLastPage = useCallback(() => {
    if (pageSize) setStart(pageSize - 1)
  }, [pageSize])

  return (
    <Container>
      <DocumentTitle value="Aptos Blocks | Apscan" />
      <PageTitle value="Blocks" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            <Box>
              Total of <NumberFormat useGrouping fallback="--" value={latestBlockHeight} /> blocks
            </Box>
          </CardHeadStats>
          <Pagination
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
          <ShowRecords pageSize={pageSize} onSelect={onSelectPageSize} />
          <Pagination
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
