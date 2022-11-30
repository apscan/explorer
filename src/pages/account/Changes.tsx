import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useAccountChangesQuery } from 'api'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { Hash } from 'components/Hash'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { OneLineText } from 'components/OneLineText'
import { Link } from 'components/link'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_version', {
    meta: {
      nowrap: true,
    },
    header: 'Tx Version',
    cell: (info) => <NumberFormat as={Link} to={`/tx/${info.getValue()}`} value={info.getValue()} />,
  }),
  helper.accessor('transaction_index', {
    meta: {
      nowrap: true,
    },
    header: 'Index',
    cell: (info) => <NumberFormat prefix="#" value={info.getValue()} />,
  }),

  helper.accessor('data.state_key_hash', {
    header: 'Stake Key',
    cell: (info) => (
      <Hash
        css={css`
          max-width: 120px;
        `}
        ellipsis
        value={info.getValue()}
        tooltip
      />
    ),
  }),

  helper.accessor('tx_type', {
    meta: {
      nowrap: true,
    },
    header: 'Type',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),

  helper.accessor('type', {
    header: 'Module',
    cell: (info) => {
      const [address, module] = [
        info.row.original?.data?.move_resource_address,
        info.row.original?.data?.move_resource_module,
      ]

      if (!address || !module) return '-'

      return (
        <>
          <Address size="short" value={address} />
          ::{module}
        </>
      )
    },
  }),

  helper.accessor('data.move_resource_name', {
    header: 'Resource',
    cell: (info) => {
      const resourceType = (info.row.original?.data?.move_resource_generic_type_params || [])[0]
      const value = `${info.row.original?.data?.move_resource_name}<${resourceType}>`

      if (!resourceType) {
        return '-'
      }

      if (info.row.getIsExpanded()) {
        return value
      }

      return <OneLineText tooltip size="long" value={value} />
    },
  }),

  helper.accessor('data.move_resource_data', {
    meta: {
      nowrap: true,
    },
    header: 'Data',
    cell: (info) => {
      if (((info.row.original?.tx_type as string) || undefined)?.includes('TableItem')) {
        const rawData = info.row.original?.data || {}
        const data = {
          table_data_key: rawData.table_data_key,
          table_data_key_type: rawData.table_data_key_type,
          table_data_value: rawData.table_data_value,
          table_data_value_type: rawData.table_data_value_type,
        }

        return <JsonViewEllipsis src={data} />
      }

      const data = info.getValue()
      if (!data) return '-'
      return <JsonViewEllipsis src={info.getValue()} />
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
    cell: (info) => <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />,
  }),
]

const renderSubComponent = ({ row }: { row: any }) => {
  if (((row.original?.tx_type as string) || undefined)?.includes('TableItem')) {
    const rawData = row.original?.data || {}
    const data = {
      table_data_key: rawData.table_data_key,
      table_data_key_type: rawData.table_data_key_type,
      table_data_value: rawData.table_data_value,
      table_data_value_type: rawData.table_data_value_type,
    }

    return <JsonView fallback="-" src={data} />
  }

  return <JsonView fallback="-" src={row.original?.data?.move_resource_data} withContainer />
}

const getRowCanExpand = (row: any) => {
  if (((row.original?.tx_type as string) || undefined)?.includes('TableItem')) {
    return true
  }
  return Boolean(row?.original?.data?.move_resource_data)
}

export const Changes = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useAccountChangesQuery(
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
    <CardBody isLoading={isLoading || id == null || !count}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of&nbsp;
          <NumberFormat useGrouping fallback="-" value={count} />
          &nbsp;changes
        </CardHeadStats>
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        sx={{
          '& > table td:nth-child(6)': {
            maxWidth: '300px',
          },
        }}
        page={pageProps.page}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
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