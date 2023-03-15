import { css } from '@emotion/react'
import React, { memo, useCallback, useMemo } from 'react'
import { DateOrBlock, setDateOrBlock } from 'state/application/slice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { vars } from 'theme/theme.css'
import { getUTC } from 'utils/date'
import { Link } from './link'
import { Tooltip } from './Tooltip'

export const SwitchDateBlock = memo(
  ({ dateLabel = 'Time', blockLabel = 'Block' }: { dateLabel?: React.ReactNode; blockLabel?: React.ReactNode }) => {
    const format = useAppSelector((state) => state.application.dateOrBlock)
    const dispatch = useAppDispatch()

    const [label, tooltip] = useMemo(() => {
      if (format === DateOrBlock.BLOCK) {
        return [`${blockLabel}`, `Click to show ${blockLabel}`]
      } else if (format === DateOrBlock.DATE) {
        return [`${dateLabel} (UTC${getUTC()})`, `Click to show ${dateLabel}`]
      }

      return []
    }, [format, dateLabel, blockLabel])

    const onClick = useCallback(() => {
      if (format === DateOrBlock.DATE) {
        dispatch(setDateOrBlock(DateOrBlock.BLOCK))
      } else if (format === DateOrBlock.BLOCK) {
        dispatch(setDateOrBlock(DateOrBlock.DATE))
      }
    }, [format, dispatch])

    return (
      <Tooltip closeOnClick={false} label={tooltip} isDisabled={!tooltip}>
        <Link
          to=""
          onClick={onClick}
          css={css`
            color: ${vars.colors.link};
            cursor: pointer;
            user-select: none;
            :hover {
              color: ${vars.colors.linkHover};
            }
          `}
        >
          {label}
        </Link>
      </Tooltip>
    )
  }
)
