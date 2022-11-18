import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { BigNumber } from '@ethersproject/bignumber'
import { useAccountTransferQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Version } from 'components/transaction/Version'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageParams } from 'state/application/hooks'
import { parseUserTransfer } from 'utils/parseUserTransfer'

const AptosCoin = '0x1::aptos_coin::AptosCoin'

const helper = createColumnHelper<any>()

const isIn = (type: string) => type.indexOf('DepositEvent') > -1
const isOut = (type: string) => type.indexOf('WithdrawEvent') > -1

type Transfer = {
  address: string
  amount: string
}

const parseSenderReceiver = (
  events: {
    address: string
    counter: number
    creation_number: number
    data: { amount: string }
    sequence_number: number
    transaction_index: number
    transaction_version: number
    type: string
  }[]
): [senders: Transfer[], receivers: Transfer[], amount: string] => {
  const senders: Transfer[] = []
  const receivers: Transfer[] = []
  let amountIn = BigNumber.from(0)
  let amountOut = BigNumber.from(0)

  events.forEach((event) => {
    if (isIn(event.type)) {
      receivers.push({
        address: event.address,
        amount: event.data.amount,
      })

      amountIn = amountIn.add(event.data.amount)
    } else if (isOut(event.type)) {
      senders.push({
        address: event.address,
        amount: event.data.amount,
      })
      amountOut = amountOut.add(event.data.amount)
    }
  })

  console.log('in', amountIn.toString(), 'out', amountOut.toString())

  return [
    [
      ...senders,
      // ...senders.map(s => ({ address: s.address + 'a', amount: s.amount + '0' }))
    ],
    [
      ...receivers,
      // ...receivers.map(s => ({ address: s.address + 'a', amount: s.amount + '0' }))
    ],
    amountIn.toString(),
  ]
}

const parseTransfers = (
  self: string,
  senders: Transfer[],
  receivers: Transfer[],
  allAmount: string
): {
  senders: Transfer[]
  receivers: Transfer[]
  amounts: string[]
} => {
  const selfType: 'sender' | 'receiver' = !!senders.find((sender) => sender.address === self) ? 'sender' : 'receiver'
  const selfTransfer = (senders.find((sender) => sender.address === self) ||
    receivers.find((receivers) => receivers.address === self)) as Transfer

  // m => n
  if (senders.length > 1 && receivers.length > 1) {
    return {
      senders,
      receivers,
      amounts: [allAmount],
    }
  }
  // 1 => n
  else if (senders.length === 1 && receivers.length > 1) {
    return {
      senders,
      receivers: selfType === 'sender' ? receivers : [selfTransfer],
      amounts: selfType === 'sender' ? receivers.map((receiver) => receiver.amount) : [selfTransfer.amount],
    }
  }
  // n => 1
  else if (senders.length > 1 && receivers.length === 1) {
    return {
      senders: selfType === 'sender' ? [selfTransfer] : senders,
      receivers,
      amounts: selfType === 'sender' ? [selfTransfer.amount] : senders.map((sender) => sender.amount),
    }
  }
  // 1 => 1
  else if (senders.length === 1 && receivers.length === 1) {
    return {
      senders,
      receivers,
      amounts: [selfTransfer.amount],
    }
  }

  return {
    senders: [],
    receivers: [],
    amounts: [],
  }
}

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
    cell: (info) => {
      const [senders, receivers, allAmount] = parseSenderReceiver(info.row.original?.events || [])
      const self: string = info.row.original?.address

      if (!self) {
        return
      }

      return parseTransfers(self, senders, receivers, allAmount).senders.map((sender) => (
        <Box
          sx={{
            height: '45.5px',
            display: 'flex',
            alignItems: 'center',
          }}
          key={sender.address}
        >
          <Address
            sx={{ marginRight: '0px' }}
            as={sender.address === self ? 'span' : undefined}
            value={sender.address}
          />
        </Box>
      ))
    },
  }),
  helper.accessor('in_out', {
    meta: {
      nowrap: true,
    },
    header: '',
    cell: (info) => {
      const self = info.row.original?.address
      const event = info.row.original?.events.find((event: any) => event.address === self)
      const type =
        event?.type.indexOf('DepositEvent') > -1 ? 'IN' : event.type.indexOf('WithdrawEvent') > -1 ? 'OUT' : ''

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
      cell: (info) => {
        const [senders, receivers, allAmount] = parseSenderReceiver(info.row.original?.events || [])
        const self: string = info.row.original?.address

        if (!self) {
          return '-'
        }

        return parseTransfers(self, senders, receivers, allAmount).receivers.map((receiver) => (
          <Box
            sx={{
              height: '45.5px',
              display: 'flex',
              alignItems: 'center',
            }}
            key={receiver.address}
          >
            <Address
              key={receiver.address}
              as={receiver.address === self ? 'span' : undefined}
              value={receiver.address}
            />
          </Box>
        ))
      },
    }
  ),
  helper.accessor('asset', {
    meta: {
      nowrap: true,
    },
    header: 'Asset',
    cell: (info) => {
      const params = info.row.original?.move_resource_generic_type_params || []
      if (params[0] === AptosCoin) {
        return 'Aptos Coin'
      }
      return params[0] || '-'
    },
  }),
  helper.accessor('data.amount', {
    meta: {
      nowrap: true,
    },
    header: 'Amount',
    cell: (info) => {
      const [senders, receivers, allAmount] = parseSenderReceiver(info.row.original?.events || [])
      const self: string = info.row.original?.address

      return parseTransfers(self, senders, receivers, allAmount).amounts.map((amount) => (
        <Box
          sx={{
            height: '45.5px',
            display: 'flex',
            alignItems: 'center',
          }}
          display="flex"
        >
          <AmountFormat
            minimumFractionDigits={0}
            decimals={info.row.original?.coin_info.decimals}
            postfix={info.row.original?.coin_info.symbol}
            value={amount}
          />
        </Box>
      ))
    },
  }),
]

export const Transfers = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize, page, setPage] = usePageParams()
  const { data: { data } = {}, isLoading } = useAccountTransferQuery(
    {
      id: id!,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> transfers
        </CardHeadStats>
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        sx={{
          '& > table td:nth-child(3)': {
            padding: '0px 10px',
          },
          '& > table td:nth-child(5)': {
            padding: '0px 10px',
          },
          '& > table td:nth-child(7)': {
            padding: '0px 10px',
          },
        }}
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
