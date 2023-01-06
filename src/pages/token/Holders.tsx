import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import { ReactNode, useMemo } from 'react'
import TableStat from 'components/TotalStat'
import { NumberFormat } from 'components/NumberFormat'
import { Address } from 'components/Address'
import { TokenHolder, useTokenHoldersQuery } from 'api/token'
import { queryRangeLimitMap } from 'config/api'
import { ExpandButton } from 'components/table/ExpandButton'
import { Hash } from 'components/Hash'
import { JsonViewEllipsis } from 'components/JsonView'
import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'

const helper = createColumnHelper<any>()

type MiniTableProps<T> = {
  data: T[]
  columns: {
    header: ReactNode
    cell: (data: T, index: number) => ReactNode
  }[]
}

export const MiniTable = ({ data, columns }: MiniTableProps<any>) => {
  return (
    <table
      css={css`
        position: relative;
        left: -10px;
        text-align: left;
        font-size: 12px;
      `}
    >
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              css={css`
                border: 1px solid ${vars.colors.border1};
                padding: 8px 12px;
                font-weight: 400;
                background: #f5f5f5;
              `}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td
                key={index}
                css={css`
                  padding: 6px 12px;
                  border: 1px solid ${vars.colors.border1};
                `}
              >
                {column.cell(item, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const renderSubComponent = ({ row }: { row: any }) => {
  const holder = row.original as TokenHolder

  return (
    <MiniTable
      columns={[
        {
          header: 'Key',
          cell: (info) => info.key,
        },
        {
          header: 'Value (Type)',
          cell: (info) => (
            <>
              <Hash value={info.value.value} size="full" />
              &nbsp;({info.value.type})
            </>
          ),
        },
      ]}
      data={holder.token_id?.token_properties.map.data}
    />
  )
}

const getRowCanExpand = (row: any) => {
  const holder = row.original as TokenHolder

  return !!holder.token_id?.token_properties.map.data.length
}

export const Holders = ({
  creator,
  name,
  count,
  collectionName,
}: {
  creator: string
  name: string
  collectionName: string
  count: number
}) => {
  const maxCount = queryRangeLimitMap['token_holders?collection_name&creator_address&token_name']
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data = [], isLoading } = useTokenHoldersQuery(
    { creator, name, collectionName, start: (page - 1) * pageSize, pageSize },
    {
      skip: !creator || !name || !collectionName,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)
  const columns = useMemo(
    () => [
      helper.accessor('rank', {
        header: 'Rank',
        meta: {
          nowrap: true,
        },
        cell: (info: any) => <NumberFormat value={info.row.index + 1 + (page - 1) * pageSize} />,
      }),
      helper.accessor('address', {
        meta: {
          nowrap: true,
        },
        header: 'Address',
        cell: (info) => <Address value={info.getValue()} size="short" />,
      }),
      helper.accessor('token_id.id.property_version', {
        meta: {
          nowrap: true,
        },
        header: 'Property Version',
        cell: (info) => <NumberFormat fallback="-" value={info.getValue()} />,
      }),
      helper.accessor('amount', {
        meta: {
          nowrap: true,
        },
        header: 'Amount',
        cell: (info) => <NumberFormat fallback="-" useGrouping value={info.getValue()} />,
      }),
      helper.accessor('deposit_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Deposit Events',
        cell: (info) => <NumberFormat fallback="-" useGrouping value={undefined} />,
      }),
      helper.accessor('withdraw_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Withdraw Events',
        cell: (info) => <NumberFormat fallback="-" useGrouping value={undefined} />,
      }),
      helper.accessor('properties', {
        meta: {
          nowrap: true,
        },
        header: 'Properties',
        cell: (info) => {
          const holder = info.row.original as TokenHolder

          if (!holder.token_id?.token_properties.map.data.length) {
            return '-'
          }

          return <JsonViewEllipsis src={holder.token_id?.token_properties.map.data} />
        },
      }),
      helper.accessor('expand', {
        meta: {
          nowrap: true,
          isExpandButton: true,
        },
        header: (header) => {
          return (
            <ExpandButton
              expandAll
              expanded={header.table.getIsSomeRowsExpanded()}
              onClick={() => header.table.toggleAllRowsExpanded()}
            />
          )
        },
        cell: (info) => {
          const holder = info.row.original as TokenHolder

          if (!holder.token_id?.token_properties.map.data.length) {
            return null
          }

          return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
        },
      }),
    ],
    [page, pageSize]
  )

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat maxCount={maxCount} count={count} variant="tabletab" object="holders" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
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
