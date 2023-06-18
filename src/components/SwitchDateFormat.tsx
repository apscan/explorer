import { css } from '@emotion/react'
import React, { memo, useCallback, useMemo } from 'react'
import { DateFormat, setDateFormat } from 'state/application/slice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { vars } from 'theme/theme.css'
import { getUTC } from 'utils/date'
import { Box } from './container'
import { Link } from './link'
import { Tooltip } from './Tooltip'

export const SwitchDateFormat = memo(
  ({
    timeLabel = 'Time',
    ageLabel = 'Age',
  }: {
    timeLabel?: React.ReactNode
    ageLabel?: React.ReactNode
  }) => {
    const dateFormat = useAppSelector((state) => state.application.dateFormat)
    const dispatch = useAppDispatch()

    const [label, tooltip] = useMemo(() => {
      if (dateFormat === DateFormat.AGE) {
        return [`${ageLabel}`, `Click to show ${ageLabel}`]
      } else if (dateFormat === DateFormat.LOCAL) {
        return [`${timeLabel} (UTC${getUTC()})`, `Click to show ${timeLabel}`]
      }

      return []
    }, [dateFormat, timeLabel, ageLabel])

    const onClick = useCallback(() => {
      if (dateFormat === DateFormat.AGE) {
        dispatch(setDateFormat(DateFormat.LOCAL))
      } else if (dateFormat === DateFormat.LOCAL) {
        dispatch(setDateFormat(DateFormat.AGE))
      }
    }, [dateFormat, dispatch])

    return (
      <Tooltip closeOnClick={false} label={tooltip} isDisabled={!tooltip}>
        <Box>
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
        </Box>
      </Tooltip>
    )
  }
)
