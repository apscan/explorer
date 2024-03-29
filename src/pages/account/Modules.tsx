import { createColumnHelper } from '@tanstack/react-table'
import { useAccountModulesQuery } from 'api'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Box } from 'components/container'
import { CopyButton } from 'components/CopyButton'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import numbro from 'numbro'
import { usePageSize } from 'hooks/usePageSize'
import TableStat from 'components/TotalStat'
import { ModuleLink } from 'components/ModuleLink'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('move_module_name', {
    meta: {
      nowrap: true,
    },
    header: 'Module',
    // cell: (info) => <Box>{info.getValue()}</Box>,
    cell: (info) => <ModuleLink module={info.getValue()} address={info.row.original.move_module_address} />,
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
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useAccountModulesQuery(
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
        <TableStat count={count} variant="tabletab" object="modules" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
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
