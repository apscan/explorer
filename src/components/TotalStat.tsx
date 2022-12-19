import { CardHeadStats } from './Card'
import { Box } from './container/Box'
import { NumberFormat } from './NumberFormat'

const TableStat: React.FC<{
  count?: number
  object: string
  maxCount?: number
  variant: 'table' | 'tabletab'
  forceMaxCount?: boolean
}> = ({ count, object, maxCount, variant, forceMaxCount = false }) => {
  return (
    <CardHeadStats variant={variant}>
      <Box>
        Total of <NumberFormat useGrouping fallback="-" value={count} /> {object}
      </Box>
      {(forceMaxCount || (maxCount !== undefined && count !== undefined && count > maxCount)) && (
        <Box>
          &nbsp;(showing the top <NumberFormat useGrouping value={maxCount} /> only)
        </Box>
      )}
    </CardHeadStats>
  )
}

export default TableStat
