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
import { JsonView } from 'components/JsonView'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageParams } from 'state/application/hooks'
import { parseUserTransfer } from 'utils/parseUserTransfer'
import { TypeParam } from 'components/TypeParam'

const AptosCoin = '0x1::aptos_coin::AptosCoin'

const helper = createColumnHelper<any>()

// const isEventsIn = (events: {type: string}[]) => events.find(event => isIn(event.type)) && !events.find(event => isOut(event.type))
// const isEventsOut = (events: {type: string}[]) => !events.find(event => isIn(event.type)) && events.find(event => isOut(event.type))
// const isEventsSelf = (events: {type: string}[]) => events.find(event => isIn(event.type)) && events.find(event => isOut(event.type))
const isIn = (type: string) => type.indexOf('DepositEvent') > -1
const isOut = (type: string) => type.indexOf('WithdrawEvent') > -1

type Transfer = {
  address: string
  amount: string
}

type TransferEvent = {
  address: string
  counter: number
  creation_number: number
  data: { amount: string }
  sequence_number: number
  transaction_index: number
  transaction_version: number
  type: string
}

const parseSenderReceiver = (events: TransferEvent[]): [senders: Transfer[], receivers: Transfer[], amount: string] => {
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

  return [senders, receivers, amountIn.toString()]
}

// const parseTransfers = (
//   self: string,
//   senders: Transfer[],
//   receivers: Transfer[],
//   allAmount: string
// ): {
//   senders: Transfer[]
//   receivers: Transfer[]
//   amounts: string[]
// } => {
//   const selfType: 'sender' | 'receiver' = !!senders.find((sender) => sender.address === self) ? 'sender' : 'receiver'
//   const selfTransfer = (senders.find((sender) => sender.address === self) ||
//     receivers.find((receivers) => receivers.address === self)) as Transfer

//   // m => n
//   if (senders.length > 1 && receivers.length > 1) {
//     return {
//       senders,
//       receivers,
//       amounts: [allAmount],
//     }
//   }
//   // 1 => n
//   else if (senders.length === 1 && receivers.length > 1) {
//     return {
//       senders,
//       receivers: selfType === 'sender' ? receivers : [selfTransfer],
//       amounts: selfType === 'sender' ? receivers.map((receiver) => receiver.amount) : [selfTransfer.amount],
//     }
//   }
//   // n => 1
//   else if (senders.length > 1 && receivers.length === 1) {
//     return {
//       senders: selfType === 'sender' ? [selfTransfer] : senders,
//       receivers,
//       amounts: selfType === 'sender' ? [selfTransfer.amount] : senders.map((sender) => sender.amount),
//     }
//   }
//   // 1 => 1
//   else if (senders.length === 1 && receivers.length === 1) {
//     return {
//       senders,
//       receivers,
//       amounts: [selfTransfer.amount],
//     }
//   }

//   return {
//     senders: [],
//     receivers: [],
//     amounts: [],
//   }
// }

const parseSenderAndReceiver = (
  events: TransferEvent[],
  self: string
): {
  transfers: {
    sender: string | undefined
    receiver: string | undefined
    amount: string
    type: 'IN' | 'OUT' | 'SELF'
  }[]
  json: string[][]
} => {
  const selfSender = events.find((event) => event.address === self && isOut(event.type))
  const selfReceiver = events.find((event) => event.address === self && isIn(event.type))
  const json = events.map((event) => [event.address, event.type, event.data.amount])

  if (selfSender && selfReceiver) {
    // if (selfSender.data.amount === selfReceiver.data.amount) {
    //   return {
    //     transfers: [{
    //       type: 'SELF',
    //       sender: selfSender.address,
    //       receiver: selfSender.address,
    //       amount: selfSender.data.amount,
    //     }],
    //     json
    //   }
    // }
    return {
      transfers: [
        {
          type: 'OUT',
          sender: selfSender.address,
          receiver: undefined,
          amount: selfSender.data.amount,
        },
        {
          type: 'IN',
          sender: undefined,
          receiver: selfReceiver.address,
          amount: selfReceiver.data.amount,
        },
      ],
      json,
    }
  }

  const [senders, receivers] = parseSenderReceiver(events)

  if (selfSender) {
    return {
      transfers: [
        {
          type: 'OUT',
          sender: selfSender.address,
          receiver: receivers.length > 1 ? undefined : receivers[0]?.address || '',
          amount: selfSender.data.amount,
        },
      ],
      json,
    }
  }

  if (selfReceiver) {
    return {
      transfers: [
        {
          type: 'IN',
          sender: senders.length > 1 ? undefined : senders[0]?.address || '',
          receiver: selfReceiver.address,
          amount: selfReceiver.data.amount,
        },
      ],
      json,
    }
  }

  return {
    transfers: [],
    json: [],
  }
}

const parseType = (data: {
  address: string
  counter_party: {
    address: string
    data: { amount: string }
  } | null
  type: string
}) => {
  if (data.address === data.counter_party?.address) {
    return 'SELF'
  }

  if (isIn(data.type)) {
    return 'IN'
  }

  return 'OUT'
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
  // helper.accessor('events', {
  //   header: 'Events',
  //   cell: (info) => {
  //     const self = info.row.original?.address || ''
  //     const { json } = parseSenderAndReceiver(info.row.original?.events || [], self)

  //     return json.length
  //   },
  // }),
  helper.accessor('sender', {
    meta: {
      nowrap: true,
    },
    header: 'Sender',
    cell: (info) => {
      if (isOut(info.row.original.type)) {
        return <Address size="short" as="span" value={info.row.original?.address} />
      }
      if (!info.row.original?.counter_party) {
        return '-'
      }
      return <Address size="short" value={info.row.original?.counter_party.address} />
    },
  }),
  helper.accessor('in_out', {
    meta: {
      nowrap: true,
    },
    header: '',
    cell: (info) => {
      const type = parseType(info.row.original)

      return (
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
                ${type === 'SELF' &&
            css`
              color: #77838f;
              background-color: rgba(119, 131, 143, 0.1);
            `}
                padding: 2px 8px;
          `}
        >
          {type}
        </InlineBox>
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
        if (isIn(info.row.original.type)) {
          return <Address size="short" as="span" value={info.row.original?.address} />
        }

        if (!info.row.original?.counter_party) {
          return '-'
        }

        return <Address size="short" value={info.row.original?.counter_party.address} />
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
      return <TypeParam value={params[0]} /> || '-'
    },
  }),
  helper.accessor('data.amount', {
    meta: {
      nowrap: true,
    },
    header: 'Amount',
    cell: (info) => {
      return (
        <AmountFormat
          minimumFractionDigits={0}
          decimals={info.row.original?.coin_info?.decimals}
          postfix={` ${info.row.original?.coin_info?.symbol}`}
          value={info.row.original?.data.amount}
        />
      )
    },
  }),
  // helper.accessor('expand', {
  //   meta: {
  //     nowrap: true,
  //     isExpandButton: true,
  //   },
  //   header: (header) => <ExpandButton
  //       expandAll
  //       expanded={header.table.getIsSomeRowsExpanded()}
  //       onClick={() => header.table.toggleAllRowsExpanded()}
  //     />,
  //   cell: (info) => {
  //     const self = info.row.original?.address || ''
  //     const { json } = parseSenderAndReceiver(info.row.original?.events || [], self)

  //     return json.length ? <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} /> : <></>
  //   },
  // }),
]

const renderSubComponent = ({ row }: { row: any }) => {
  const self = row.original?.address || ''
  const { json } = parseSenderAndReceiver(row.original?.events || [], self)

  return json ? <JsonView forcePretty={true} src={json} withContainer /> : <></>
}

const getRowCanExpand = (row: any) => {
  return true
}

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
          '& > table td:nth-child(4)': {
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
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
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
