import { Theme } from '@chakra-ui/react'
import { usePrice } from 'providers/PriceContext'
import { RefAttributes } from 'react'
import { NumberFormat, NumberFormatProps } from './NumberFormat'

const CoinPrice: React.FC<
  { type?: string; price?: number } & NumberFormatProps &
    RefAttributes<HTMLDivElement> & {
      theme?: Theme | undefined
    }
> = ({ type, price, ...props }) => {
  const price_ = usePrice(type || '')

  price = price ?? price_

  if (typeof price === 'undefined') {
    return <>-</>
  }

  if (price < 0.0001) {
    return <>&lt; $0.0001</>
  }
  return (
    <NumberFormat
      minimumFractionDigits={4}
      maximumFractionDigits={4}
      prefix="$"
      value={price}
      fallback="-"
      {...props}
    />
  )
}

export default CoinPrice
