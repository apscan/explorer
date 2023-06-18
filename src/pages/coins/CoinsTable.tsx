import { Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { AmountFormat } from 'components/AmountFormat'
import CoinPrice from 'components/CoinPrice'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { TypeParamLink } from 'components/TypeParamLink'
import { CoinTagsMap } from 'config/coin-tags'
import React, { useMemo } from 'react'

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
        header: () => <SwitchDateFormat timeLabel="Time" ageLabel="Age" />,
        cell: (info) => <DateTime value={info.row.original?.created_at.timestamp} />,
      }),
      helper.accessor('name', {
        header: 'Name',
        cell: (info) => {
          const type = info.row.original?.['move_resource_generic_type_params']?.[0]

          return (
            <Text display="inline-flex" alignItems="center">
              {info.getValue()}&nbsp;
              {CoinTagsMap[type] && <i>({CoinTagsMap[type]})</i>}
            </Text>
          )
        },
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
              maximumFractionDigits={0}
              value={info.getValue()}
              postfix={` ${info.row.original.symbol}`}
              decimals={info.row.original.decimals}
            />
          ),
      }),
      helper.accessor('price', {
        header: 'Price',
        cell: (info) => (
          <CoinPrice type={info.row.original?.move_resource_generic_type_params[0]} />
        ),
      }),
      helper.accessor('addresses_count', {
        header: 'Holders',
        cell: (info) => <NumberFormat useGrouping fallback="-" value={info.getValue()} />,
      }),
    ],
    []
  )

  return <DataTable dataSource={data} columns={columns} />
}
