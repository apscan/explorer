import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useAccountTransferQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Version } from 'components/transaction/Version'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'
import { parseUserTransfer } from 'utils/parseUserTransfer'

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
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('asset', {
    meta: {
      nowrap: true,
    },
    header: 'Asset',
    cell: (info) => 'Aptos Coin',
  }),
  // helper.accessor('type', {
  //   header: 'Type',
  //   cell: (info) => (
  //     <Box
  //       css={css`
  //         word-break: break-all;
  //       `}
  //     >
  //       {info.getValue()}
  //     </Box>
  //   ),
  // }),
  helper.accessor('sender', {
    meta: {
      nowrap: true,
    },
    header: 'Sender',
    cell: (info) =>
      info.getValue() ? (
        <Address as={info.getValue() === info.row.original?.address ? 'span' : undefined} value={info.getValue()} />
      ) : (
        '-'
      ),
  }),
  helper.accessor('in_out', {
    meta: {
      nowrap: true,
    },
    header: '',
    cell: (info) => {
      const type =
        info.row.original?.type === '0x1::coin::WithdrawEvent'
          ? 'OUT'
          : info.row.original?.type === '0x1::coin::DepositEvent'
          ? 'IN'
          : ''

      return (
        type && (
          <InlineBox
            css={css`
              font-size: 12px;
              font-weight: 700;
              border-radius: 6px;
              user-select: none;
              width: 42px;
              justify-content: center;
              align-items: center;
              ${type === 'IN' &&
              css`
                background: rgba(0, 201, 167, 0.2);
                color: #02977e;
              `}
              ${type === 'OUT' &&
              css`
                background: rgba(219, 154, 4, 0.2);
                color: #b47d00;
              `}
              padding: 2px 8px;
            `}
          >
            {type}
          </InlineBox>
        )
      )
    },
  }),
  helper.accessor(
    (data: any) => {
      return parseUserTransfer(data?.payload)?.receiver
    },
    {
      meta: {
        nowrap: true,
      },
      header: 'Receiver',
      cell: (info) =>
        info.getValue() ? (
          <Address as={info.getValue() === info.row.original?.address ? 'span' : undefined} value={info.getValue()} />
        ) : (
          '-'
        ),
    }
  ),
  helper.accessor('data.amount', {
    meta: {
      nowrap: true,
    },
    header: 'Amount (APT)',
    cell: (info) => <AmountFormat minimumFractionDigits={0} postfix={false} value={info.getValue()} />,
  }),
]

export const Transfers = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {}, isLoading } = useAccountTransferQuery(
    {
      id: id!,
      start,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )

  const pageProps = useRangePagination(start, setStart, pageSize, {
    min: page?.min,
    max: page?.max,
    count: count,
  })

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> transfers
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
