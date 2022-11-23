import { createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { DataTable } from 'components/table'
import { TypeParam } from 'components/TypeParam'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('rank', {
    meta: {
      nowrap: true,
    },
    header: 'Index',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('move_resource_generic_type_params.0', {
    header: 'Type',
    cell: (info) => <TypeParam raw={true} value={info.getValue()} />,
  }),
  helper.accessor('address', {
    meta: {
      nowrap: true,
    },
    header: 'Creator',
    cell: (info) => <Address size="long" value={info.getValue()} />,
  }),
  helper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('total_supply', {
    header: 'Total Supply',
    cell: (info) => (
      <AmountFormat value={info.getValue()} postfix={info.row.original.symbol} decimals={info.row.original.decimals} />
    ),
  }),
  helper.accessor('price', {
    header: 'Price',
    cell: (info) => '-',
  }),
  helper.accessor('market_cap', {
    header: 'Market Cap',
    cell: (info) => '-',
  }),
  helper.accessor('addresses_count', {
    header: 'Holders',
    cell: (info) => info.getValue(),
  }),
]

export const CoinsTable = ({ data }: { data?: any }) => {
  return <DataTable dataSource={data} columns={columns} />
}
