import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FixedNumber } from '@ethersproject/bignumber'
import numbro from 'numbro'
import { forwardRef, memo, useMemo } from 'react'
import { To } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { Box, BoxProps } from './container/Box'
import { Link } from './link'

export interface NumberFormatProps extends Omit<BoxProps, 'prefix'> {
  value?: string | number | bigint | FixedNumber
  to?: To
  forceAverage?: 'trillion' | 'billion' | 'million' | 'thousand'
  tooltip?: React.ReactNode
  fallback?: string
  type?: 'decimal' | 'currency' | 'percent'
  symbol?: string
  useGrouping?: boolean
  hideSymbol?: boolean
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  prefix?: React.ReactNode
  postfix?: React.ReactNode | false
  separate?: boolean
  abbr?: boolean
  fixed?: number
}

export const NumberFormat = memo(
  styled(
    forwardRef<HTMLDivElement, NumberFormatProps>(
      (
        {
          value,
          to,
          hideSymbol,
          fallback,
          type,
          symbol,
          useGrouping = false,
          forceAverage,
          minimumFractionDigits,
          maximumFractionDigits,
          prefix,
          postfix,
          separate,
          abbr,
          fixed,
          ...rest
        },
        ref
      ) => {
        const [showValue, symbolDisplay] = useMemo(() => {
          let _value = value

          if (_value === null || _value === undefined) {
            return []
          }

          if (FixedNumber.isFixedNumber(_value)) {
            _value = _value.toString()
          }

          const currency = symbol ?? undefined
          const currencyDisplay = symbol ? 'name' : undefined

          const _maximumFractionDigits = fixed ?? maximumFractionDigits ?? 18
          const _minimumFractionDigits =
            fixed || (minimumFractionDigits === undefined && symbol) ? 1 : minimumFractionDigits

          const formated = new Intl.NumberFormat('en-gb', {
            style: type === undefined && symbol && !hideSymbol ? 'currency' : type,
            currency,
            currencyDisplay,
            useGrouping,
            maximumFractionDigits: _maximumFractionDigits,
            minimumFractionDigits:
              _minimumFractionDigits !== undefined
                ? Math.min(_maximumFractionDigits, _minimumFractionDigits)
                : undefined,
          }).format(_value as number)

          const [showValue, symbolDisplay] = formated.split(' ')

          if (abbr) {
            try {
              return [
                numbro(showValue).format({
                  average: true,
                  thousandSeparated: useGrouping,
                  forceAverage,
                  mantissa: maximumFractionDigits,
                  spaceSeparated: true,
                }),
                symbolDisplay,
              ]
            } catch {
              console.error('numbro error', showValue)
              return ['-', symbolDisplay]
            }
          }

          return [showValue, symbolDisplay]
        }, [
          value,
          fixed,
          type,
          forceAverage,
          hideSymbol,
          symbol,
          useGrouping,
          minimumFractionDigits,
          maximumFractionDigits,
          abbr,
        ])

        const styledShowValue = useMemo(() => {
          if (typeof showValue !== 'string') return showValue

          if (separate) {
            const [value, abbrSymbol] = showValue.split(' ')

            const [intNum, decimals] = value.split('.')

            if (!decimals) {
              return showValue
            }

            return (
              <>
                <Box as="span">{intNum}.</Box>
                <Box
                  as="span"
                  css={css`
                    color: ${vars.text.secondary};
                  `}
                >
                  {decimals}
                </Box>
                {abbrSymbol && <Box as="span">{abbrSymbol}</Box>}
              </>
            )
          }

          return showValue
        }, [showValue, separate])

        const componentProps = useMemo(() => {
          if (to) {
            return {
              as: Link,
              to,
            } as any
          } else {
            return { as: 'span' }
          }
        }, [to])

        if (showValue == null) {
          return <>{fallback}</>
        }

        return (
          <Box whiteSpace="pre" ref={ref} {...componentProps} {...rest}>
            {prefix}
            {styledShowValue}
            {postfix !== false && !postfix && symbolDisplay && ` ${symbolDisplay}`}
            {postfix}
          </Box>
        )
      }
    )
  )``
)

NumberFormat.displayName = 'NumberFormat'
