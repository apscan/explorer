import { css } from '@emotion/react'
import { Box } from './container'
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'

const Item = ({ color, value }: { color: string; value: number }) => {
  return (
    <Box
      css={css`
        display: inline-flex;
        align-items: center;
        margin-right: 8px;
        font-weight: 500;
      `}
    >
      <Box
        css={css`
          background-color: ${color};
          border-radius: 50%;
          height: 12px;
          width: 12px;
          margin-right: 4px;
        `}
      />
      {value}
    </Box>
  )
}

export const ValidatorsOverview = ({
  pendingActive,
  pendingInactive,
  activeValidators,
  allowChange,
}: {
  pendingActive: number
  pendingInactive: number
  activeValidators: number
  allowChange: boolean
}) => {
  if (!activeValidators) return <>-</>

  return (
    <Tooltip
      label={
        <Box>
          Active {activeValidators}, Pending Inactive {pendingInactive}, Pending Active {pendingActive}
        </Box>
      }
    >
      <Box
        css={css`
          display: inline-flex;
          align-items: center;
        `}
      >
        {!allowChange && (
          <Icon
            as={LockIcon}
            css={css`
              height: 12px;
              width: 12px;
              transform: translateY(-1px);
              margin-right: 12px;
            `}
          />
        )}
        <Item color="#4361ee" value={activeValidators} />
        <Item color="#4895ef" value={pendingInactive} />
        <Item color="#4cc9f0" value={pendingActive} />
      </Box>
    </Tooltip>
  )
}
