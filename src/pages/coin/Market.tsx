import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox as InlineFlex } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { useMemo } from 'react'
import { NumberFormat } from 'components/NumberFormat'
import { DateTime } from 'components/DateTime'
import { DateFormat } from 'state/application/slice'
import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'
import RealBigNumber from 'bignumber.js'
import { Link } from 'components/link'
import { AptosCoin } from 'utils'
import { Image } from '@chakra-ui/react'
import PancakeSvg from 'assets/icons/pancake.svg'
import CoinmarketcapPng from 'assets/brand/coinmarketcap.png'
import CoinGeckoPng from 'assets/brand/coingecko.png'
import Coinpaprikang from 'assets/brand/coinpaprika.png'
import CoinstatsSvg from 'assets/brand/coinstats.jpeg'

const PriceSources: React.FC<{ coin: string }> = ({ coin }) => {
  if (coin !== AptosCoin) {
    return (
      <Link
        display="inline-flex"
        alignItems="center"
        marginLeft="8px"
        target="_blank"
        rel="noopener noreferrer"
        to={`https://aptos.pancakeswap.finance/swap?inputCurrency=${coin}&outputCurrency=${AptosCoin}`}
      >
        <Image height="18px" src={PancakeSvg} borderRadius="50%" />
      </Link>
    )
  }

  return (
    <>
      <Link
        display="inline-flex"
        alignItems="center"
        marginLeft="8px"
        target="_blank"
        rel="noopener noreferrer"
        to="https://coinmarketcap.com/currencies/aptos/"
      >
        <Image height="18px" src={CoinmarketcapPng} borderRadius="50%" />
      </Link>
      <Link
        display="inline-flex"
        alignItems="center"
        marginLeft="8px"
        target="_blank"
        rel="noopener noreferrer"
        to="https://www.coingecko.com/en/coins/aptos"
      >
        <Image height="18px" src={CoinGeckoPng} borderRadius="50%" />
      </Link>
      <Link
        display="inline-flex"
        alignItems="center"
        marginLeft="8px"
        target="_blank"
        rel="noopener noreferrer"
        to="https://coinstats.app/coins/aptos/"
      >
        <Image height="18px" src={CoinstatsSvg} borderRadius="50%" />
      </Link>
      <Link
        display="inline-flex"
        alignItems="center"
        marginLeft="8px"
        target="_blank"
        rel="noopener noreferrer"
        to="https://coinpaprika.com/coin/apt-aptos/"
      >
        <Image height="18px" src={Coinpaprikang} borderRadius="50%" />
      </Link>
    </>
  )
}

export const Market = ({ data, percentChange24h, price }: { price?: number; data?: any; percentChange24h: number }) => {
  data = data || {}
  const fully = useMemo(
    () =>
      !price ? undefined : new RealBigNumber(price).multipliedBy(data.total_supply).div(Math.pow(10, data.decimals)),
    [data.decimals, data.total_supply, price]
  )
  const coin = data.move_resource_generic_type_params?.[0]

  return (
    <Card>
      <Box padding="0 12px">
        {renderRow(
          'Price',
          <InlineFlex alignItems="center">
            <NumberFormat prefix="$" value={price} fallback="-" />
            {percentChange24h && (
              <InlineFlex
                css={css`
                  color: ${percentChange24h < 0 ? vars.text.error : vars.text.success};
                `}
                fontSize="14px"
                marginLeft="4px"
              >
                (
                <NumberFormat
                  prefix={percentChange24h < 0 ? '' : '+'}
                  type="percent"
                  maximumFractionDigits={2}
                  value={percentChange24h / 100}
                  fallback="-"
                />
                )
              </InlineFlex>
            )}
            {price && <PriceSources coin={coin} />}
          </InlineFlex>
        )}
        {renderRow(
          'Total Supply',
          <AmountFormat fallback="-" postfix={` ${data.symbol}`} value={data.total_supply} decimals={data.decimals} />
        )}
        {renderRow(
          'Fully Diluted Val.',
          <NumberFormat
            textTransform="uppercase"
            abbr
            forceAverage="million"
            useGrouping
            maximumFractionDigits={3}
            prefix={fully?.toNumber() ? '$' : ''}
            value={fully?.toNumber()}
            fallback="-"
          />
        )}
        {renderRow(
          'Creation Time',
          data?.created_at ? <DateTime format={DateFormat.FULL} value={data?.created_at.timestamp} /> : '-'
        )}
      </Box>
    </Card>
  )
}
