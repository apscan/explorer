import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useActiveValidatorsQuery, useLastBlocksQuery, useLastTransactionsQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHeight } from 'components/block/BlockHeight'
import { BaseButton } from 'components/buttons'
import { Card } from 'components/Card'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { Link } from 'components/link'
import { NumberFormat } from 'components/NumberFormat'
import { Version } from 'components/transaction/Version'
import { ValidatorsTable } from 'pages/validators/ValidatorsTable'
import { memo } from 'react'
import SimpleBar from 'simplebar-react'
import { useAppFocused } from 'state/api/hooks'
import { DateFormat } from 'state/application/slice'
import { vars } from 'theme/theme.css'

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const StyledCardHead = styled(Box)`
  padding: 12px 16px;
  border-bottom: ${vars.colors.border1} 1px solid;
`

const StyledCardContent = styled(SimpleBar)`
  padding: 0 16px;
  min-height: 324px;
  max-height: 324px;
`

const StyledCardTitle = styled(Box)`
  font-weight: 500;
  font-size: 16px;
  color: ${vars.text.heading};
`

const StyledItem = styled(Box)`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid ${vars.colors.border2};
  :last-of-type {
    border-bottom: 0;
  }
`

const StyledItemInner = styled(Box)`
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
`

const StyledAmountWrapper = styled(Box)`
  position: relative;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${vars.colors.badgeBg1};
  color: ${vars.text.secondary};
  font-size: 12px;
  font-weight: 500;
`

const StyledItemTitle = styled(Box)`
  font-weight: 500;
`

const StyledItemContent = styled(Box)`
  line-height: 1;
`

const StyledTag = styled(Box)`
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`

const StyledBadge = styled(Box)`
  margin-right: 8px;
  display: inline-flex;
  font-weight: 500;
  color: ${vars.text.body};
  background: ${vars.colors.badgeBg1};
  border-color: transparent;
  position: relative;
  line-height: 0;
  font-size: 14px;
  width: 44px;
  height: 44px;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  user-select: none;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
`

const StyledButton = styled(BaseButton)`
  background: ${vars.colors.buttonBg1};
  color: ${vars.colors.primary};
  margin: 12px;
  font-weight: 400;
  padding: 8px 8px;
  border-radius: 4px;
  font-size: 12px;
  height: auto;
  &:hover {
    color: #fff;
    background: ${vars.colors.primary};
  }
`

const getTimeDeltaMs = (time1: string | number, time2: string | number) => {
  time1 = Number(BigInt(time1) / 1000n)
  time2 = Number(BigInt(time2) / 1000n)

  return time1 - time2
}

export const LatestBlocks = memo(({ ...rest }) => {
  const appFocused = useAppFocused()
  const { data } = useLastBlocksQuery(26, { pollingInterval: appFocused ? 3000 : 0, refetchOnMountOrArgChange: true })

  return (
    <StyledCard {...rest}>
      <StyledCardHead>
        <StyledCardTitle as="h2">Latest Blocks</StyledCardTitle>
      </StyledCardHead>
      <StyledCardContent autoHide={true}>
        {data?.map((item: any, index: number) => {
          if (index === data.length - 1) return null

          const prev = data[index + 1]

          const blockTime = getTimeDeltaMs(item.time_microseconds, prev.time_microseconds)

          return (
            <StyledItem key={item.height}>
              <StyledItemInner
                css={css`
                  flex: 1;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: center;
                `}
              >
                <StyledBadge>Bk</StyledBadge>
                <Box>
                  <StyledItemTitle>
                    <BlockHeight
                      css={css`
                        font-size: 14px;
                      `}
                      value={item.height}
                    />
                  </StyledItemTitle>
                  <StyledItemContent>
                    <DateTime
                      tooltip
                      css={css`
                        color: ${vars.text.header};
                      `}
                      size="small"
                      format={DateFormat.AGE}
                      value={item.time_microseconds}
                    />
                  </StyledItemContent>
                </Box>
              </StyledItemInner>
              <Box
                css={css`
                  flex: 2;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <StyledItemInner>
                  <StyledItemTitle>
                    <StyledTag>Proposer</StyledTag>
                    <Address size="long" value={item.proposer} />
                  </StyledItemTitle>
                  <StyledItemContent>
                    <Box
                      css={css`
                        color: ${vars.text.header};
                        font-size: 12px;
                      `}
                    >
                      <NumberFormat
                        tooltip="Transactions in this block"
                        css={css`
                          display: inline-flex;
                          font-size: 14px;
                          margin-right: 4px;
                        `}
                        to={`/block/${item.height}?tab=tx`}
                        value={item.transactions_count}
                        postfix=" transactions"
                      />
                      in <NumberFormat maximumFractionDigits={4} value={blockTime} /> ms
                    </Box>
                  </StyledItemContent>
                </StyledItemInner>
                <StyledItemInner
                  css={css`
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  <StyledAmountWrapper>
                    <AmountFormat postfix={false} value={item.gas_fees} /> 🔥
                  </StyledAmountWrapper>
                </StyledItemInner>
              </Box>
            </StyledItem>
          )
        })}
      </StyledCardContent>

      <StyledButton as={Link} to="/blocks">
        View all blocks
      </StyledButton>
    </StyledCard>
  )
})

export const LatestTransactions = memo(({ ...rest }) => {
  const appFocused = useAppFocused()

  const { data } = useLastTransactionsQuery(25, {
    pollingInterval: appFocused ? 3000 : 0,
    refetchOnMountOrArgChange: true,
  })

  return (
    <StyledCard {...rest}>
      <StyledCardHead>
        <StyledCardTitle as="h2">Latest User Transactions</StyledCardTitle>
      </StyledCardHead>
      <StyledCardContent autoHide={true}>
        {data?.map((item: any, index: number) => {
          const gasFee =
            item.gas_used !== undefined && item.user_transaction_detail.gas_unit_price !== undefined
              ? BigInt(item.gas_used) * BigInt(item.user_transaction_detail.gas_unit_price)
              : undefined

          return (
            <StyledItem key={item.version}>
              <StyledItemInner
                css={css`
                  flex: 1;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: center;
                `}
              >
                <StyledBadge
                  css={css`
                    border-radius: 50%;
                  `}
                >
                  Tx
                </StyledBadge>
                <Box>
                  <StyledItemTitle>
                    <Version
                      css={css`
                        font-size: 14px;
                      `}
                      vmStatus={item.vm_status}
                      success={item.success}
                      value={item.version}
                    />
                  </StyledItemTitle>
                  <StyledItemContent>
                    <DateTime
                      tooltip
                      css={css`
                        color: ${vars.text.header};
                      `}
                      size="small"
                      format={DateFormat.AGE}
                      value={item.time_microseconds}
                    />
                  </StyledItemContent>
                </Box>
              </StyledItemInner>
              <Box
                css={css`
                  flex: 2;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <StyledItemInner
                  css={css`
                    flex: 2;
                  `}
                >
                  <StyledItemTitle>
                    <StyledTag>Sender</StyledTag>
                    <Address size="long" value={item.sender} />
                  </StyledItemTitle>
                  <StyledItemContent>
                    <Box
                      css={css`
                        color: ${vars.text.header};
                        font-size: 12px;
                      `}
                    >
                      <NumberFormat
                        tooltip="Changes in this version"
                        css={css`
                          font-size: 14px;
                          margin-right: 4px;
                        `}
                        useGrouping
                        to={`/tx/${item.version}?tab=changes`}
                        value={item.changes_count}
                        postfix=" changes"
                      />
                      &
                      <NumberFormat
                        tooltip="Events in this version"
                        css={css`
                          font-size: 14px;
                          margin-left: 4px;
                          margin-right: 4px;
                        `}
                        to={`/tx/${item.version}?tab=events`}
                        value={item.events_count}
                        postfix=" events"
                      />
                    </Box>
                  </StyledItemContent>
                </StyledItemInner>
                <StyledItemInner
                  css={css`
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  <StyledAmountWrapper>
                    <AmountFormat value={gasFee} /> 🔥
                  </StyledAmountWrapper>
                </StyledItemInner>
              </Box>
            </StyledItem>
          )
        })}
      </StyledCardContent>

      <StyledButton as={Link} to="/txs">
        View all transactions
      </StyledButton>
    </StyledCard>
  )
})

export const CurrentValidators = memo(({ ...rest }) => {
  const { data } = useActiveValidatorsQuery(undefined, { refetchOnMountOrArgChange: true })

  return (
    <StyledCard {...rest}>
      <StyledCardHead
        css={css`
          border-bottom: none;
        `}
      >
        <StyledCardTitle>Current Validators (Top 25)</StyledCardTitle>
      </StyledCardHead>
      <Box
        css={css`
          padding: 0;
          min-height: 324px;
          max-height: auto;
        `}
      >
        <ValidatorsTable data={data} />
      </Box>
      <StyledButton as={Link} to="/validators">
        View all validators
      </StyledButton>
    </StyledCard>
  )
})
