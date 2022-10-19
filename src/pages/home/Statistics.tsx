import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FixedNumber } from '@ethersproject/bignumber'
import { AmountFormat } from 'components/AmountFormat'
import { Card } from 'components/Card'
import { Box, InlineBox } from 'components/container'
import { Divider } from 'components/Divider'
import { NumberFormat } from 'components/NumberFormat'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppStats } from 'state/api/hooks'
import { fontZero } from 'theme/style'
import { vars } from 'theme/theme.css'
import { HistoryChart } from './HistoryChart'
import AccountIcon from 'assets/home/Account.svg'
import EpochIcon from 'assets/home/Epoch.svg'
import MarketCapIcon from 'assets/home/MarketCap.svg'
import TransactionsIcon from 'assets/home/Transactions.svg'
import { useMarketInfoQuery } from 'api'
import { useCountUp } from 'react-countup'
import { Link } from 'components/link'

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
    duration: 0.5,
    formattingFn,
  })

  useEffect(() => {
    update(value)
  }, [value])

  return (
    <Link to="/tx">
      <span ref={countUpRef} />
    </Link>
  )
}

export const Statistics = ({ ...rest }) => {
  const stats = useAppStats()
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
          display: flex;
        `}
      >
        <ItemSection>
          <StatisticItem>
            {/* - APT SUPPLY: 1,000,000,000 ($1.00, +0.0%) */}
            {renderStatistic(
              'APT SUPPLY',
              <InlineBox alignItems="center">
                <AmountFormat
                  postfix={false}
                  separate={false}
                  maximumFractionDigits={0}
                  useGrouping
                  value={stats?.total_supply}
                  fallback="--"
                />
                <InlineBox marginLeft="4px" color={vars.text.secondary}>
                  (
                  <NumberFormat minimumFractionDigits={2} prefix="$" value={market?.usd} fallback="--" />)
                </InlineBox>
              </InlineBox>,
              'left',
              <StatsIcon src={MarketCapIcon} alt="marketcap" />
            )}
            {renderStatistic(
              'Market Cap',
              <NumberFormat
                textTransform="uppercase"
                abbr
                forceAverage="million"
                useGrouping
                minimumFractionDigits={2}
                prefix="$"
                value={market?.usd_market_cap}
                fallback="--"
              />,
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
                  fallback="--"
                />
                <HelpText>
                  (
                  <NumberFormat fixed={1} value={stats?.staked_percent} type="percent" />)
                </HelpText>
              </>,
              'left',
              <StatsIcon src={EpochIcon} alt="epoch" />
            )}
            {renderStatistic(
              'Epoch & Round',
              <InlineBox alignItems="center">
                <NumberFormat value={stats?.epoch} fallback="--" />
                <Divider
                  type="vertical"
                  color={vars.text.body}
                  css={css`
                    height: 12px;
                    margin: 0 8px;
                  `}
                />
                <NumberFormat value={stats?.round} fallback="--" />
                <HelpText>
                  (<NumberFormat value={epochPercent} fixed={1} fallback="--" type="percent" />)
                </HelpText>
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
                {/* <NumberFormat useGrouping to="/tx" value={stats?.latest_transaction_version} fallback="--" /> */}
                {stats?.latest_transaction_version ? (
                  <TransactionsCountUp value={stats.latest_transaction_version} />
                ) : (
                  '--'
                )}
                <HelpText>
                  (<NumberFormat marginRight="2px" value={stats?.tps} fallback="--" /> TPS)
                </HelpText>
              </>,
              'left',
              <StatsIcon src={TransactionsIcon} alt="transactions" />
            )}
            {renderStatistic(
              'Gas Price',
              <NumberFormat separate={false} postfix=" Octa" fallback="--" value={stats?.latest_gas_fee} />,
              'right'
            )}
          </StatisticItem>
          <Divider margin="24px 0" />
          <StatisticItem>
            {renderStatistic(
              'Accounts',
              <NumberFormat useGrouping to="/accounts" value={stats?.address_count} fallback="--" />,
              'left',
              <StatsIcon src={AccountIcon} alt="accounts" />
            )}
            {renderStatistic(
              'Validators',
              <>
                <NumberFormat to="/validators" useGrouping value={stats?.active_validators_count} fallback="--" />
                {/* <HelpText>
                  (<NumberFormat value={stats?.pending_validators_count} fallback="--" />)
                </HelpText> */}
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
