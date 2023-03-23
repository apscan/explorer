import { AmountFormat } from 'components/AmountFormat'
import { Box } from 'components/container'
import { NumberFormat } from 'components/NumberFormat'

import { css } from '@emotion/react'
import { ReactComponent as AgreeIcon } from 'assets/icons/agree.svg'
import { ReactComponent as DisagreeIcon } from 'assets/icons/disagree.svg'
import { Icon } from 'components/Icon'
import { Tooltip } from 'components/Tooltip'

export const Votes = ({ data }: { data: any }) => {
  const yes_votes = data?.proposal_content?.yes_votes
  const no_votes = data?.proposal_content?.no_votes
  const total_voting_power = data?.total_voting_power
  const rate = (Number(yes_votes) + Number(no_votes)) / Number(total_voting_power)

  if (!data || !Object.keys(data).length) return null

  return (
    <Tooltip
      label={
        <Box>
          <Box>
            Voting Rate: <NumberFormat maximumFractionDigits={4} value={rate} type="percent" />
          </Box>
          <Box>
            Yes Votes: <AmountFormat value={yes_votes} />
          </Box>
          <Box>
            No Votes: <AmountFormat value={no_votes} />
          </Box>
        </Box>
      }
    >
      <Box
        css={css`
          display: inline-flex;
          align-items: center;
        `}
      >
        <NumberFormat maximumFractionDigits={4} value={rate} type="percent" />
        <Box
          css={css`
            margin-left: 8px;
          `}
        >
          (
          <Icon
            css={css`
              height: 14px;
              width: 14px;
              margin-right: 4px;
              transform: translateY(1px);
            `}
            as={AgreeIcon}
          />
          <AmountFormat maximumFractionDigits={0} postfix={false} value={yes_votes} />
        </Box>
        <Box>
          <Icon
            css={css`
              height: 14px;
              width: 14px;
              margin-left: 8px;
              margin-right: 4px;
              transform: translateY(2px);
            `}
            as={DisagreeIcon}
          />
          <AmountFormat maximumFractionDigits={0} postfix={false} value={no_votes} />)
        </Box>
      </Box>
    </Tooltip>
  )
}
