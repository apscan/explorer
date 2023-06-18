import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table'
import { Fragment, memo, useEffect, useRef } from 'react'
import { Box, BoxProps } from '../container/Box'
import { Table, Tbody, Td, Th, Thead, Tr } from './TableComponents'

interface DataTableProps<TData extends object = {}> extends BoxProps {
  dataSource?: TData[]
  columns: ColumnDef<any, any>[]
  columnVisibility?: Record<string, boolean>
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement
  getRowCanExpand?: (row: Row<TData>) => boolean
  page?: number
}

const StyledWrapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow-x: auto;

  ${Table} {
    width: 100%;
  }
`

const rowModel = getCoreRowModel()
const expandedRowModel = getExpandedRowModel()

export const DataTable = memo(
  ({
    dataSource,
    page,
    columns,
    columnVisibility,
    renderSubComponent,
    getRowCanExpand,
    ...props
  }: DataTableProps) => {
    const table = useReactTable({
      data: dataSource || [],
      columns: columns,
      state: {
        columnVisibility,
      },
      autoResetExpanded: true,
      getCoreRowModel: rowModel as any,
      getExpandedRowModel: expandedRowModel as any,
      getRowCanExpand: getRowCanExpand as any,
    })

    const tableRef = useRef(table)

    tableRef.current = table

    useEffect(() => {
      if (tableRef.current && tableRef.current?.getIsSomeRowsExpanded()) {
        tableRef.current.resetExpanded()
      }
    }, [page])

    return (
      <StyledWrapper {...props}>
        <Table>
          {/* <colgroup>
            {table.getAllColumns().map((column) => {
              return (
                <col
                  key={column.id}
                  css={css`
                    
                  `}
                />
              )
            })}
          </colgroup> */}
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      css={css`
                        ${(header.column.columnDef.meta as any)?.nowrap &&
                        css`
                          white-space: nowrap;
                        `}

                        ${(header.column.columnDef.meta as any)?.isExpandButton &&
                        css`
                          width: 48px;
                        `}

                        ${(header.column.columnDef.meta as any)?.width &&
                        css`
                          width: ${(header.column.columnDef.meta as any).width};
                        `}
                      `}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows.map((row) => {
              const tr = (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        css={css`
                          ${(cell.column.columnDef.meta as any)?.nowrap &&
                          css`
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                          `}
                        `}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    )
                  })}
                </Tr>
              )

              const canExpand = row.getCanExpand()

              return renderSubComponent && canExpand ? (
                <Fragment key={row.id}>
                  {tr}
                  {row.getIsExpanded() && (
                    <Tr>
                      <Td colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</Td>
                    </Tr>
                  )}
                </Fragment>
              ) : (
                tr
              )
            })}
          </Tbody>
        </Table>
      </StyledWrapper>
    )
  }
)
