import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FixedNumber } from '@ethersproject/bignumber'
import { useMarketInfoQuery } from 'api'
import AccountsIcon from 'assets/home/Accounts.svg'
import TotalSupplyIcon from 'assets/home/TotalSupply.svg'
import StakedIcon from 'assets/home/Staked.svg'
import TransactionsIcon from 'assets/home/Transactions.svg'
import { AmountFormat } from 'components/AmountFormat'
import { Card } from 'components/Card'
import { Box, InlineBox } from 'components/container'
import { Divider } from 'components/Divider'
import { Link } from 'components/link'
import { NumberFormat } from 'components/NumberFormat'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useCountUp } from 'react-countup'
import { useAppStatsPolling } from 'state/api/hooks'
import { fontZero } from 'theme/style'
import { vars } from 'theme/theme.css'
import { HistoryChart } from './HistoryChart'
import { toFixedNumber } from 'utils/number'

const StatsIcon = styled.img`
  width: 30px;
  margin-right: 8px;
`

const ItemSection = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  height: 100%;
  flex: 1;
  border-right: 1px solid ${vars.colors.border1};
`

const StatisticItem = styled(Box)`
  justify-content: space-between;
  display: flex;
`

const Title = styled(Box)`
  color: ${vars.text.secondary};
  font-weight: 500;
  margin-bottom: 1px;
  font-size: 12px;
  text-transform: uppercase;
`

const Content = styled(Box)`
  ${fontZero}
  font-size: 15px;
  color: ${vars.text.body};
  font-weight: 500;

  a {
    color: ${vars.text.body};
    &:hover {
      color: ${vars.colors.link};
    }
  }
`

const HelpText = styled(InlineBox)`
  font-size: 14px;
  margin-left: 4px;
  color: ${vars.text.secondary};
`

const renderStatistic = (
  title: React.ReactNode,
  value: React.ReactNode,
  align: 'left' | 'right' = 'left',
  icon?: React.ReactNode
) => {
  return (
    <Box
      css={css`
        text-align: ${align};
        display: flex;
      `}
    >
      {icon ? icon : null}
      <Box>
        <Title>{title}</Title>
        <Content>{value}</Content>
      </Box>
    </Box>
  )
}

const TransactionsCountUp = ({ value }: { value: number }) => {
  const countUpRef = React.useRef(null)
  const [start] = useState(value)

  const formattingFn = useCallback((val: number) => {
    return new Intl.NumberFormat('en-gb', { useGrouping: true }).format(val)
  }, [])

  const { update } = useCountUp({
    ref: countUpRef,
    start: start,
    end: start,
    duration: 3,
    formattingFn,
  })

  useEffect(() => {
    update(value)
  }, [value, update])

  return (
    <Link to="/txs">
      <span ref={countUpRef} />
    </Link>
  )
}

export const Statistics = ({ ...rest }) => {
  const stats = useAppStatsPolling()

  const { data: market } = useMarketInfoQuery()

  const epochPercent = useMemo(() => {
    if (stats?.last_reconfiguration_time && stats?.time_microseconds && stats?.epoch_interval) {
      const last_reconfiguration_time = FixedNumber.fromString(stats.last_reconfiguration_time.toString())
      const time_microseconds = FixedNumber.fromString(stats.time_microseconds.toString())
      const epochInterval = FixedNumber.fromString(stats.epoch_interval.toString())

      const number = time_microseconds.subUnsafe(last_reconfiguration_time).divUnsafe(epochInterval)

      return number
    }
  }, [stats])

  const fully = useMemo(() => {
    if (!market?.quotes?.USD?.price || !stats?.total_supply) return undefined

    return FixedNumber.from(market.quotes.USD.price.toString(), 'fixed128x18').mulUnsafe(
      toFixedNumber(stats.total_supply).toFormat('fixed128x18')
    )
  }, [market?.quotes?.USD?.price, stats?.total_supply])

  return (
    <Card
      css={css`
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
      `}
      {...rest}
    >
      <Box
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          @media screen and (max-width: 900px) {
            grid-template-columns: 1fr 1fr;
          }
          @media screen and (max-width: 600px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        <ItemSection>
          <StatisticItem>
            {renderStatistic(
              'APT SUPPLY',
              <InlineBox alignItems="center">
                <AmountFormat
                  postfix={false}
                  separate={false}
                  maximumFractionDigits={0}
                  useGrouping
                  value={stats?.total_supply}
                  fallback="-"
                />
                {market?.quotes?.USD?.price && (
                  <InlineBox marginLeft="4px" color={vars.text.secondary} fontSize="14px">
                    (
                    <NumberFormat
                      maximumFractionDigits={2}
                      prefix="$"
                      value={market?.quotes?.USD?.price}
                      fallback="-"
                    />
                    )
                  </InlineBox>
                )}
              </InlineBox>,
              'left',
              <StatsIcon src={TotalSupplyIcon} alt="totalSupply" />
            )}
            {renderStatistic(
              'Fully Diluted VAL.',
              <InlineBox>
                <NumberFormat
                  textTransform="uppercase"
                  abbr
                  forceAverage="billion"
                  useGrouping
                  maximumFractionDigits={3}
                  prefix="$"
                  value={fully}
                  fallback="-"
                />
                {market?.quotes?.USD?.percent_change_24h && (
                  <InlineBox
                    css={css`
                      color: ${market?.quotes?.USD?.percent_change_24h < 0 ? vars.text.error : vars.text.success};
                    `}
                    fontSize="14px"
                    marginLeft="4px"
                  >
                    (
                    <NumberFormat
                      prefix={market?.quotes?.USD?.percent_change_24h < 0 ? '' : '+'}
                      type="percent"
                      maximumFractionDigits={2}
                      value={market?.quotes?.USD?.percent_change_24h / 100}
                      fallback="-"
                    />
                    )
                  </InlineBox>
                )}
              </InlineBox>,
              'right'
            )}
          </StatisticItem>
          <Divider margin="24px 0" />
          <StatisticItem>
            {renderStatistic(
              'APT STAKED',
              <>
                <AmountFormat
                  postfix={false}
                  separate={false}
                  maximumFractionDigits={0}
                  useGrouping
                  value={stats?.actively_staked}
                  fallback="-"
                />
                {stats?.staked_percent && (
                  <HelpText>
                    (
                    <NumberFormat fixed={1} value={stats?.staked_percent} type="percent" />)
                  </HelpText>
                )}
              </>,
              'left',
              <StatsIcon src={StakedIcon} alt="staked" />
            )}
            {renderStatistic(
              'Epoch & Round',
              <InlineBox alignItems="center">
                {stats?.epoch && stats?.round ? (
                  <>
                    <NumberFormat prefix="#" value={stats?.epoch} fallback="-" />
                    -
                    <NumberFormat value={stats?.round} fallback="-" />
                  </>
                ) : (
                  '-'
                )}
                {epochPercent && (
                  <HelpText>
                    (
                    <NumberFormat value={epochPercent} fixed={1} fallback="-" type="percent" />)
                  </HelpText>
                )}
              </InlineBox>,
              'right'
            )}
          </StatisticItem>
        </ItemSection>

        <ItemSection>
          <StatisticItem>
            {renderStatistic(
              'Transactions',
              <>
                {stats?.latest_transaction_version ? (
                  <TransactionsCountUp value={stats.latest_transaction_version} />
                ) : (
                  '-'
                )}
                {stats?.tps && (
                  <HelpText>
                    (
                    <NumberFormat marginRight="2px" value={stats?.tps} fallback="-" /> TPS)
                  </HelpText>
                )}
              </>,
              'left',
              <StatsIcon src={TransactionsIcon} alt="transactions" />
            )}
            {renderStatistic(
              'Gas Price',
              <NumberFormat separate={false} postfix=" Octa 🔥" fallback="-" value={stats?.latest_gas_fee} />,
              'right'
            )}
          </StatisticItem>
          <Divider margin="24px 0" />
          <StatisticItem>
            {renderStatistic(
              'Accounts',
              <NumberFormat useGrouping to="/accounts" value={stats?.address_count} fallback="-" />,
              'left',
              <StatsIcon src={AccountsIcon} alt="accounts" />
            )}
            {renderStatistic(
              'Validators',
              <>
                <NumberFormat to="/validators" useGrouping value={stats?.active_validators_count} fallback="-" />
              </>,
              'right'
            )}
          </StatisticItem>
        </ItemSection>

        <HistoryChart />
      </Box>
    </Card>
  )
}
