import { createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
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
    cell: (info) => <TypeParam value={info.getValue()} />,
  }),
  helper.accessor('address', {
    meta: {
      nowrap: true,
    },
    header: 'Creator',
    cell: (info) => <Address size="long" value={info.getValue()} />,
  }),
  helper.accessor('move_resource_name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
]

export const CoinsTable = ({ data }: { data?: any }) => {
  return <DataTable dataSource={data} columns={columns} />
}
