import styled from '@emotion/styled'
import { AmountFormat } from 'components/AmountFormat'
import { AnnualRewardRate } from 'components/AnnualRewardRate'
import { BlockHeight } from 'components/block/BlockHeight'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { renderRow } from 'components/helpers'
import { ValidatorsOverview } from 'components/ValidatorsOverview'
import { DateFormat } from 'state/application/slice'

const Wrapper = styled(Box)`
  padding: 0 12px;
`

export const Overview = ({ data }: { data: any | undefined }) => {
  return (
    <Wrapper>
      <Box>
        {renderRow('Consensus Scheme', data?.validators?.consensus_scheme)}
        {renderRow(
          'Start Time',
          <DateTime format={DateFormat.FULL} value={data?.epoch_start_time_microseconds / 1000} />
        )}
        {renderRow('Start Block', <BlockHeight value={data?.epoch_start_block_height} />)}
        {renderRow('End Time', <DateTime format={DateFormat.FULL} value={data?.epoch_end_time_microseconds / 1000} />)}
        {renderRow('End Block', <BlockHeight value={data?.epoch_end_block_height} />, { border: true })}
        {renderRow(
          'Validators',
          <ValidatorsOverview
            type="detail"
            allowChange={data?.staking_config_data?.allow_validator_set_change}
            activeValidators={data?.validators?.active_validators}
            pendingInactive={data?.validators?.pending_inactive}
            pendingActive={data?.validators?.pending_active}
          />
        )}
        {renderRow('Annual Reward Rate', <AnnualRewardRate value={data} />, { border: true })}
        {renderRow('Minimum Stake', <AmountFormat value={data?.staking_config_data?.minimum_stake} />)}
        {renderRow('Maximum Stake', <AmountFormat value={data?.staking_config_data?.maximum_stake} />)}
        {renderRow('Total Voting Power', <AmountFormat value={data?.validators?.total_voting_power} />)}
        {renderRow('Total Joining Power', <AmountFormat value={data?.validators?.total_joining_power} />)}
        {renderRow(
          'Voting Power Increase Limit',
          <AmountFormat value={data?.staking_config_data?.voting_power_increase_limit} />,
          { border: true }
        )}
        {renderRow(
          'Recurring Lockup Duration',
          <>{data?.staking_config_data?.recurring_lockup_duration_secs / 3600 / 24} days</>
        )}
      </Box>
    </Wrapper>
  )
}
