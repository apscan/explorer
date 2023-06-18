import { css } from '@emotion/react'
import { Box } from './container'
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'

const Item = ({ color, value, label }: { color: string; value: number; label?: string }) => {
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
      {label} {value}
    </Box>
  )
}

export const ValidatorsOverview = ({
  pendingActive,
  pendingInactive,
  activeValidators,
  allowChange,
  type,
}: {
  pendingActive: number
  pendingInactive: number
  activeValidators: number
  allowChange: boolean
  type?: string
}) => {
  if (!activeValidators) return <>-</>

  return (
    <Tooltip
      label={
        <Box>
          Active {activeValidators}, Pending Inactive {pendingInactive}, Pending Active{' '}
          {pendingActive}
        </Box>
      }
      isDisabled={type === 'detail'}
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
        <Item
          label={type === 'detail' ? 'Active' : undefined}
          color="#4361ee"
          value={activeValidators}
        />
        <Item
          label={type === 'detail' ? 'Pending Inactive' : undefined}
          color="#4895ef"
          value={pendingInactive}
        />
        <Item
          label={type === 'detail' ? 'Pending Active' : undefined}
          color="#4cc9f0"
          value={pendingActive}
        />
      </Box>
    </Tooltip>
  )
}
