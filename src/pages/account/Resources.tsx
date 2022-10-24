import { createColumnHelper } from '@tanstack/react-table'
import { useAccountResourcesQuery } from 'api'
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
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('move_resource_address', {
    header: 'Module Address',
    cell: (info) => <Hash value={info.getValue()} size="short" />,
  }),
  helper.accessor('move_resource_module', {
    header: 'Module Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_resource_name', {
    header: 'Resource Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_resource_data', {
    header: 'Data',
    cell: (info) => <JsonViewEllipsis src={info.getValue()} />,
  }),

  helper.accessor('expand', {
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
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {}, isLoading } = useAccountResourcesQuery(
    {
      id: id!,
      start,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )

  const pageProps = useRangePagination(start, setStart, pageSize, {
    min: page?.min,
    max: page?.max,
    count: count,
  })

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> resources
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
        dataSource={data}
        columns={columns}
      />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
