import { createColumnHelper, Row } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHeight } from 'components/block/BlockHeight'
import { DataTable } from 'components/table'
import { DateTime } from 'components/DateTime'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { TxType } from 'components/transaction/TxType'
import { Version } from 'components/transaction/Version'
import { memo, useMemo } from 'react'
import { Icon } from 'components/Icon'

import { BaseButton } from 'components/buttons'
import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'
import { ExpandButton } from 'components/table/ExpandButton'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('version', {
    header: 'Version',
    cell: (info) => (
      <Version vmStatus={info.row.original.vm_status} success={info.row.original.success} value={info.getValue()} />
    ),
  }),
  helper.accessor('block_height', {
    id: 'block_height',
    header: 'Block',
    cell: (info) => <BlockHeight value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
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
    header: 'Tx Fee (APT)',
    cell: (info) => {
      if (info.row.original.type !== 'user_transaction') {
        return '-'
      }
      return (
        info.row.original?.user_transaction_detail?.gas_unit_price && (
          <AmountFormat
            postfix={false}
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
        return <JsonViewEllipsis src={info.getValue()} />
      }
    },
  }),
  helper.accessor('expand', {
    header: '',
    cell: (info) => {
      if (info.row.original.type !== 'user_transaction') return ''
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

type TransactionsTableProps = {
  data?: any
  variant?: 'block' | 'account'
}

const renderSubComponent = ({ row }: { row: Row<any> }) => {
  return <JsonView src={row.original?.payload} withContainer />
}

const getRowCanExpand = (row: any) => {
  return row.original.type === 'user_transaction'
}

export const TransactionsTable = memo(({ data, variant }: TransactionsTableProps) => {
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
      renderSubComponent={renderSubComponent}
      columnVisibility={columnVisibility}
      dataSource={data}
      columns={columns}
      getRowCanExpand={getRowCanExpand}
    />
  )
})
