import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import TableStat from 'components/TotalStat'
import { NumberFormat } from 'components/NumberFormat'
import { Address } from 'components/Address'
import { Link } from 'components/link'
import { TokenOfCollection, useTokensByCollectionQuery } from 'api/token'
import { Flex } from 'components/container'
import { Mutability } from 'components/Mutability'
import { queryRangeLimitMap } from 'config/api'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('token_name', {
    meta: {
      nowrap: true,
    },
    header: 'Name',
    cell: (info) => {
      const data = info.row.original as TokenOfCollection

      return (
        <Link
          to={`/token/${data.creator_address}/${encodeURIComponent(data.collection_name)}/${encodeURIComponent(
            data.token_name
          )}`}
          maxW="250px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {info.getValue()}
        </Link>
      )
    },
  }),
  helper.accessor('royalty', {
    meta: {
      nowrap: true,
    },
    header: 'Royalty',
    cell: (info) => {
      const data = info.row.original as TokenOfCollection
      const fee =
        !data.token_data.royalty || data.token_data.royalty.royalty_points_denominator === '0'
          ? NaN
          : (parseInt(data.token_data.royalty.royalty_points_numerator) /
              parseInt(data.token_data.royalty.royalty_points_denominator)) *
            100

      return (
        <>
          <Address value={data.token_data.royalty?.payee_address} size="short" fallback="-" />
          <NumberFormat maximumFractionDigits={2} prefix=" (" postfix="%)" value={isNaN(fee) ? undefined : fee} />
        </>
      )
    },
  }),
  helper.accessor('token_data.supply', {
    meta: {
      nowrap: true,
    },
    header: 'Supply',
    cell: (info) => <NumberFormat value={info.getValue()} fallback="-" />,
  }),
  helper.accessor('addresses_count', {
    meta: {
      nowrap: true,
    },
    header: 'Holders',
    cell: (info) => <NumberFormat value={info.getValue()} fallback="-" />,
  }),
  helper.accessor('events_count', {
    meta: {
      nowrap: true,
    },
    header: 'Transfers',
    cell: (info) => <NumberFormat value={info.getValue()} fallback="-" />,
  }),
  helper.accessor('uri', {
    meta: {
      nowrap: true,
    },
    header: 'URI',
    cell: (info) => {
      const data = info.row.original as TokenOfCollection

      return (
        <>
          <Flex alignItems="center">
            <Link
              maxW="250px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              href={data.token_data.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.token_data.uri}
            </Link>
            <Mutability marginLeft="5px" mutable={data.token_data.mutability_config.uri} />
          </Flex>
        </>
      )
    },
  }),
]

export const Tokens = ({ creator, name, count }: { creator: string; name: string; count: number }) => {
  const maxCount = queryRangeLimitMap['tokens?collection_name&creator_address']
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data = [] } = {}, isLoading } = useTokensByCollectionQuery(
    { creator, name, start: (page - 1) * pageSize, pageSize },
    {
      skip: !creator || !name,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat maxCount={maxCount} count={count} variant="tabletab" object="tokens" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
