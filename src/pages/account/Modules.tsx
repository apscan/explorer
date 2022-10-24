import { createColumnHelper } from '@tanstack/react-table'
import { useAccountModulesQuery } from 'api'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { CopyButton } from 'components/CopyButton'
import { Hash } from 'components/Hash'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import numbro from 'numbro'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('move_module_name', {
    meta: {
      nowrap: true,
    },
    header: 'Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_module_abi.friends', {
    meta: {
      nowrap: true,
    },
    header: 'Friends',
    cell: (info) => info.getValue().length,
  }),
  helper.accessor('move_module_abi.structs', {
    meta: {
      nowrap: true,
    },
    header: 'Structs',
    cell: (info) => info.getValue().length,
  }),
  helper.accessor('move_module_abi.exposed_functions', {
    meta: {
      nowrap: true,
    },
    header: 'Exposed Functions',
    cell: (info) => info.getValue().length,
  }),

  helper.accessor('move_module_bytecode_length', {
    meta: {
      nowrap: true,
    },
    header: 'Bytecode',
    cell: (info) => {
      const str = numbro(info.getValue() as number)
        .format({
          output: 'byte',
          base: 'decimal',
          spaceSeparated: true,
        })
        .replace('i', '')

      return (
        <Box>
          {str}
          <CopyButton text={info.row.original?.move_module_bytecode} />
        </Box>
      )
    },
  }),
  helper.accessor('Source_Code', {
    meta: {
      nowrap: true,
    },
    header: 'Source Code',
    cell: (info) => <NumberFormat fallback="-" value={info.getValue()} />,
  }),
  helper.accessor('move_module_abi', {
    header: 'ABI',
    cell: (info) => <JsonViewEllipsis src={info.getValue()} />,
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
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

const renderSubComponent = ({ row }: { row: any }) => {
  return <JsonView src={row.original?.move_module_abi} withContainer />
}

const getRowCanExpand = (row: any) => {
  return Boolean(row?.original?.move_module_abi)
}

export const Modules = ({ id, count }: { id: any; count: number }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {}, isLoading } = useAccountModulesQuery(
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
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> modules
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
