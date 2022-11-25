import { createColumnHelper } from '@tanstack/react-table'
import { useAccountResourcesQuery } from 'api'
import { Address } from 'components/Address'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { TypeParam } from 'components/TypeParam'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('move_resource_address', {
    meta: {
      nowrap: true,
    },
    header: 'Module Address',
    cell: (info) => <Address value={info.getValue()} size="short" />,
  }),
  helper.accessor('move_resource_module', {
    meta: {
      nowrap: true,
    },
    header: 'Module Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_resource_name', {
    meta: {
      nowrap: true,
    },
    header: 'Resource Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_resource_generic_type_params.0', {
    header: 'Resource Type',
    cell: (info) => (info.getValue() ? <TypeParam value={info.getValue()} /> : '-'),
  }),
  helper.accessor('move_resource_data', {
    meta: {
      nowrap: true,
    },
    header: 'Data',
    cell: (info) => <JsonViewEllipsis src={info.getValue()} />,
  }),

  helper.accessor('expand', {
    meta: {
      isExpandButton: true,
      nowrap: true,
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
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

const renderSubComponent = ({ row }: { row: any }) => {
  return <JsonView src={row.original?.move_resource_data} withContainer />
}

const getRowCanExpand = (row: any) => {
  return Boolean(row?.original?.move_resource_data)
}

export const Resources = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useAccountResourcesQuery(
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
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat useGrouping fallback="--" marginLeft="4px" marginRight="4px" value={count} /> resources
        </CardHeadStats>
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        page={pageProps.page}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
        dataSource={data}
        columns={columns}
      />
      {pageProps.total > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
