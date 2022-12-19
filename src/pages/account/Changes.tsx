import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useAccountChangesQuery } from 'api'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead } from 'components/Card'
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
import { Link } from 'components/link'
import { TypeParam } from 'components/TypeParam'
import { Divider } from '@chakra-ui/react'
import TableStat from 'components/TotalStat'
import { queryRangeLimitMap } from 'config/api'

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
    meta: {
      nowrap: true,
    },
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
    meta: {
      nowrap: true,
    },
    cell: (info) => {
      const resourceType = (info.row.original?.data?.move_resource_generic_type_params || [])[0]
      const value = `${info.row.original?.data?.move_resource_name}${resourceType ? '<' + resourceType + '>' : ''}`

      return <TypeParam fallback="-" value={value} />
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
  const data = row.original?.data?.move_resource_data
  const resourceType = (row.original?.data?.move_resource_generic_type_params || [])[0]
  const value = `${row.original?.data?.move_resource_name}${resourceType ? '<' + resourceType + '>' : ''}`

  if (!resourceType) {
    return <JsonView fallback="-" src={data} withContainer />
  }

  return (
    <Box>
      <TypeParam fallback="-" copyable={false} size="full" value={value} />
      <Divider color="#e7eaf3" />
      <JsonView fallback="-" src={data} withContainer />
    </Box>
  )
}

const getRowCanExpand = (row: any) => {
  return Boolean(row?.original?.data?.move_resource_data)
}

export const Changes = ({ id, count }: { id: any; count: number }) => {
  const maxCount = queryRangeLimitMap['resource_changes?address']
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
  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)

  return (
    <CardBody isLoading={isLoading || id == null || !count}>
      <CardHead variant="tabletab">
        <TableStat maxCount={maxCount} count={count} variant="tabletab" object="changes" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        sx={{
          '& > table td:nth-of-type(6)': {
            width: '300px',
            '> div': {
              display: 'block',
              maxWidth: '280px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
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
