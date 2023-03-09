import { css } from '@emotion/react'
import { useMemo } from 'react'
import { vars } from 'theme/theme.css'
import { Box, BoxProps } from './container'
import { Tooltip } from './Tooltip'
import { ReactComponent as AwaitingIcon } from 'assets/icons/proposal-status/awaiting.svg'
import { ReactComponent as ExecutedIcon } from 'assets/icons/proposal-status/executed.svg'
import { ReactComponent as RejectedIcon } from 'assets/icons/proposal-status/rejected.svg'
import { ReactComponent as FailedIcon } from 'assets/icons/proposal-status/failed.svg'
import { ReactComponent as VotingIcon } from 'assets/icons/proposal-status/voting.svg'
import { Icon } from './Icon'

const container = css`
  display: inline-flex;
  font-weight: 400;
  font-size: 10px;
  line-height: 1;
  padding-left: 8px;
  padding-right: 8px;
  height: 20px;
  align-items: center;
  border: 1px solid ${vars.colors.border1};
  border-radius: 6px;
  background: #f8f9fa;
`

export const ProposalsStatus = ({
  value,
  fallback,
  ...props
}: {
  value: string
  fallback?: React.ReactNode
} & BoxProps) => {
  const [tip, icon] = useMemo(() => {
    if (value === 'Voting') return ['Voting is in progress', VotingIcon]
    if (value === 'Failed') return ['Proposal failed because of not enough votes', FailedIcon]
    if (value === 'Rejected') return ['Proposal is rejected by the majority of voters', RejectedIcon]
    if (value === 'Awaiting Execution')
      return ['Proposal is passed by the majority of voters and waiting for execution', AwaitingIcon]
    if (value === 'Executed') return ['Proposal is passed and executed on chain', ExecutedIcon]
    return []
  }, [value])

  if (value == null) return <>{fallback}</>

  return (
    <Tooltip label={tip}>
      <Box css={[container, css``]} {...props}>
        {icon && (
          <Icon
            css={css`
              width: 12px;
              height: 12px;
              margin-right: 2px;
              transform: translateY(-0.5px);
            `}
            as={icon}
          />
        )}
        {value}
      </Box>
    </Tooltip>
  )
}
