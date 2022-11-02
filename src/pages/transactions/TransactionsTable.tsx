import { createColumnHelper, Row } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHeight } from 'components/block/BlockHeight'
import { DateTime } from 'components/DateTime'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { TxType } from 'components/transaction/TxType'
import { Version } from 'components/transaction/Version'
import { memo, useMemo } from 'react'

import { ExpandButton } from 'components/table/ExpandButton'
import { getTransactionCounterparty } from 'utils/getTransactionCounterparty'
import { TransactionFunction } from 'components/TransactionFunction'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('version', {
    header: 'Version',
    meta: {
      nowrap: true,
    },
    cell: (info) => (
      <Version vmStatus={info.row.original.vm_status} success={info.row.original.success} value={info.getValue()} />
    ),
  }),
  helper.accessor('block_height', {
    meta: {
      nowrap: true,
    },
    id: 'block_height',
    header: 'Block',
    cell: (info) => <BlockHeight value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('sender', {
    header: 'Sender',
    cell: (info) => {
      if (!info?.row?.original?.type) return null

      if (info.row.original.type === 'user_transaction') {
        return <Address value={info.getValue()} size="short" />
      } else {
        return <TxType size="sm" value={info.row.original.type} />
      }
    },
  }),
  helper.accessor(
    (data) => {
      return getTransactionCounterparty(data)
    },
    {
      header: 'Sent To',
      cell: (info) => {
        return <Address fallback="-" value={info.getValue()?.address} size="short" />
      },
    }
  ),
  helper.accessor('changes_count', {
    header: 'Changes',
    cell: (info) => (
      <NumberFormat to={info.getValue() && `/tx/${info.row.original.version}?tab=changes`} value={info.getValue()} />
    ),
  }),
  helper.accessor('events_count', {
    header: 'Events',
    cell: (info) => (
      <NumberFormat to={info.getValue() && `/tx/${info.row.original.version}?tab=events`} value={info.getValue()} />
    ),
  }),
  helper.accessor('gas_fees', {
    header: 'Fee (APT)',
    meta: {
      nowrap: true,
    },
    cell: (info) => {
      if (info.row.original.type !== 'user_transaction') {
        return '-'
      }
      return (
        info.row.original?.user_transaction_detail?.gas_unit_price && (
          <AmountFormat
            postfix=" 🔥"
            value={info.row.original.gas_used * info.row.original.user_transaction_detail.gas_unit_price}
          />
        )
      )
    },
  }),
  helper.accessor('payload', {
    header: 'Payload',
    cell: (info) => {
      if (info.row.original.type !== 'user_transaction') {
        return '-'
      } else {
        if (info.row.original?.payload?.type === 'entry_function_payload') {
          return <TransactionFunction value={info.row.original} />
        }

        return <JsonViewEllipsis src={info.getValue()} />
      }
    },
  }),
  helper.accessor('expand', {
    header: (header) => {
      return (
        <ExpandButton
          expandAll
          expanded={header.table.getIsAllRowsExpanded()}
          onClick={() => header.table.toggleAllRowsExpanded()}
        />
      )
    },
    meta: {
      isExpandButton: true,
    },
    cell: (info) => {
      if (info.row.original.type !== 'user_transaction') return ''
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

type TransactionsTableProps = {
  data?: any
  variant?: 'block' | 'account'
  page?: number
}

const renderSubComponent = ({ row }: { row: Row<any> }) => {
  return <JsonView src={row.original?.payload} withContainer />
}

const getRowCanExpand = (row: any) => {
  return row.original.type === 'user_transaction'
}

export const TransactionsTable = memo(({ data, variant, page }: TransactionsTableProps) => {
  const columnVisibility = useMemo(() => {
    if (variant === 'block') {
      return { block_height: false } as Record<string, boolean>
    }

    if (variant === 'account') {
      return { sender: false } as Record<string, boolean>
    }

    return undefined
  }, [variant])

  return (
    <DataTable
      page={page}
      renderSubComponent={renderSubComponent}
      columnVisibility={columnVisibility}
      dataSource={data}
      columns={columns}
      getRowCanExpand={getRowCanExpand}
    />
  )
})
