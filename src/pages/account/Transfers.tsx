import { css } from '@emotion/react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
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
import { usePageSize } from 'hooks/usePageSize'
import { parseUserTransfer } from 'utils/parseUserTransfer'
import { Link } from 'components/link'
import { useMemo } from 'react'
import { TypeParam } from 'components/TypeParam'

const helper = createColumnHelper<any>()

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

const parseTypeText = (type: string) => {
  const textMap: Record<string, string> = {
    '0x1::coin::DepositEvent': 'Coin Deposit',
    '0x1::coin::WithdrawEvent': 'Coin Withdraw',
    '0x1::stake::AddStakeEvent': 'Stake Add',
    '0x1::stake::WithdrawStakeEvent': 'Stake Withdraw',
    '0x1::stake::DistributeRewardsEvent': 'Stake Reward',
    '0x1::staking_contract::DistributeEvent': 'Staking Reward',
    '0x1::vesting::DistributeEvent': 'Vesting Distribute',
    '0x1::vesting::AdminWithdrawEvent': 'Vesting Withdraw',
  }

  return textMap[type] || '-'
}

const renderSubComponent = ({ row }: { row: any }) => {
  const self = row.original?.address || ''
  const { json } = parseSenderAndReceiver(row.original?.events || [], self)

  return json ? <JsonView forcePretty={true} src={json} withContainer /> : <></>
}

const getRowCanExpand = (row: any) => {
  return true
}

export const Transfers = ({ id, count, type }: { id?: string; count: number; type?: string }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useAccountTransferQuery(
    {
      id,
      type,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: (!id && !type) || !count,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count, setPage)

  const columns = useMemo(
    () =>
      [
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
        helper.accessor('type', {
          header: 'Event',
          meta: {
            nowrap: true,
          },
          cell: (info) => {
            return <TypeParam value={info.row.original?.type} />
          },
        }),
        helper.accessor('sender', {
          meta: {
            nowrap: true,
          },
          header: 'Sender',
          cell: (info) => {
            if (type !== undefined) {
              let address = ''

              if (isIn(info.row.original.type)) {
                address = info.row.original?.counter_party?.address
              } else {
                address = info.row.original?.address
              }
              if (!address) {
                return '-'
              }
              return <Address size="short" value={address} />
            }

            const transferType = parseType(info.row.original)
            if (transferType === 'OUT' || transferType === 'SELF') {
              return <Address size="short" as="span" value={info.row.original?.address} />
            }
            if (!info.row.original?.counter_party) {
              return '-'
            }
            return <Address size="short" value={info.row.original?.counter_party.address} />
          },
        }),
        !type &&
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
              if (type !== undefined) {
                let address = ''

                if (isOut(info.row.original.type)) {
                  address = info.row.original?.counter_party?.address
                } else {
                  address = info.row.original?.address
                }
                if (!address) {
                  return '-'
                }
                return <Address size="short" value={address} />
              }

              const transferType = parseType(info.row.original)
              if (transferType === 'IN' || transferType === 'SELF') {
                return <Address size="short" as="span" value={info.row.original?.address} />
              }

              if (!info.row.original?.counter_party) {
                return '-'
              }

              return <Address size="short" value={info.row.original?.counter_party.address} />
            },
          }
        ),
        !type &&
          helper.accessor('coin', {
            meta: {
              nowrap: true,
            },
            header: 'Coin',
            cell: (info) => {
              const params = info.row.original?.move_resource_generic_type_params || []

              return (
                <Link tooltip={params[0]} to={`/coin/${params[0]}`}>
                  {info.row.original?.coin_info?.name ?? 'Aptos Coin'}
                </Link>
              )
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
      ].filter(Boolean) as ColumnDef<any, any>[],
    [type]
  )
  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          <Box>
            Total of <NumberFormat useGrouping fallback="-" value={count} /> {type ? 'events' : 'coin events'}
          </Box>
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
