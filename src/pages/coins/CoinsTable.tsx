import { createColumnHelper } from '@tanstack/react-table'
import { AmountFormat } from 'components/AmountFormat'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { TypeParamLink } from 'components/TypeParamLink'
import { useMemo } from 'react'
import { AptosCoin } from 'utils'

const helper = createColumnHelper<any>()

export const CoinsTable = ({ data, price }: { data?: any; price?: number }) => {
  const columns = useMemo(
    () => [
      helper.accessor('rank', {
        meta: {
          nowrap: true,
        },
        header: 'Rank',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('move_resource_generic_type_params.0', {
        header: 'Type',
        meta: {
          nowrap: true,
        },
        cell: (info) => (
          <Box
            sx={{
              maxWidth: '250px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            <TypeParamLink to={`/coin/${info.getValue()}`} value={info.getValue()} />
          </Box>
        ),
      }),
      helper.accessor('created_at.timestamp', {
        meta: {
          nowrap: true,
        },
        header: () => <SwitchDateFormat timeLabel="Creation Time" ageLabel="Creation Age" />,
        cell: (info) => <DateTime value={info.row.original?.created_at.timestamp} />,
      }),
      helper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      helper.accessor('total_supply', {
        header: 'Total Supply',
        meta: {
          nowrap: true,
        },
        cell: (info) =>
          !info.getValue() ? (
            '-'
          ) : (
            <AmountFormat
              fixed={0}
              value={info.getValue()}
              postfix={` ${info.row.original.symbol}`}
              decimals={info.row.original.decimals}
            />
          ),
      }),
      helper.accessor('price', {
        header: 'Price',
        cell: (info) => {
          if (info.row.original?.move_resource_generic_type_params[0] !== AptosCoin) {
            return '-'
          }

          return <NumberFormat maximumFractionDigits={2} prefix="$" value={price} fallback="-" />
        },
      }),
      helper.accessor('addresses_count', {
        header: 'Holders',
        cell: (info) => <NumberFormat useGrouping fallback="-" value={info.getValue()} />,
      }),
    ],
    [price]
  )

  return <DataTable dataSource={data} columns={columns} />
}
