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
            {price && coin !== AptosCoin && (
              <Link
                height="20px"
                marginLeft="5px"
                target="_blank"
                rel="noopener noreferrer"
                to={`https://aptos.pancakeswap.finance/swap?inputCurrency=${coin}&outputCurrency=${AptosCoin}`}
              >
                <Image height="20px" src={PancakeSvg} borderRadius="50%" />
              </Link>
            )}
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
