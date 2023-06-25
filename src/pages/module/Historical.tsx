import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardHead } from 'components/Card'
import { CopyButton } from 'components/CopyButton'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import TableStat from 'components/TotalStat'
import { Box } from 'components/container'
import { DataTable } from 'components/table'
import { ExpandButton } from 'components/table/ExpandButton'
import { Version } from 'components/transaction/Version'
import numbro from 'numbro'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_version', {
    meta: {
      nowrap: true,
    },
    header: 'Version',
    cell: (info) => <Version value={info.getValue()} />,
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

export const Historical = ({ data }: { data: any }) => {
  return (
    <CardBody isLoading={!data}>
      <CardHead variant="tabletab">
        <TableStat count={data?.length} variant="tabletab" object="historical modules" />
      </CardHead>
      <DataTable
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
        dataSource={data}
        columns={columns}
      />
    </CardBody>
  )
}
