import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { forwardRef, memo, useMemo } from 'react'
import { DateFormat, DateFormat as Format } from 'state/application/slice'
import { useAppSelector } from 'state/hooks'
import { formatDate } from 'utils/date'
import { Box, BoxProps } from './container/Box'
import { PopTip } from './PopTip'

export interface DateTimeProps extends BoxProps {
  value?: string | number | dayjs.Dayjs | Date
  tooltip?: boolean
  variant?: 'badge'
  size?: 'small' | 'medium' | 'large'
  fallback?: React.ReactNode
  countdown?: number | null
  format?: Format
  isTableColumn?: boolean
  withUTCPostfix?: boolean
}

export const DateTime = memo(
  forwardRef<HTMLDivElement, DateTimeProps>(
    (
      {
        value,
        fallback = null,
        variant,
        size,
        tooltip = false,
        countdown = null,
        format: _format,
        isTableColumn,
        withUTCPostfix,
        ...rest
      },
      ref
    ) => {
      const dateFormat = useAppSelector((state) => state.application.dateFormat)

      const format = useMemo(() => {
        return _format || dateFormat
      }, [dateFormat, _format])

      const { age, local, localFull } = useMemo(() => {
        if (!value) {
          return {
            age: null,
            local: null,
            utc: null,
            localFull: null,
          }
        }

        return formatDate(value, {
          withUTCPostfix: withUTCPostfix !== undefined ? withUTCPostfix : format === DateFormat.FULL,
          full: format === DateFormat.FULL,
        })
      }, [value, withUTCPostfix, format])

      const tip = useMemo(() => {
        if (format === DateFormat.AGE) {
          return localFull
        } else if (format === DateFormat.LOCAL || format === DateFormat.UTC) {
          return age
        }
      }, [age, local, format])

      if (value == null || value === '0' || value === 0)
        return (
          <Box ref={ref} {...rest}>
            {fallback}
          </Box>
        )

      return (
        <PopTip isDisabled={!tooltip} label={tip}>
          <Box
            as="span"
            css={css`
              display: inline-flex;
              align-items: center;
              ${size === 'small' &&
              css`
                font-size: 12px;
              `}
            `}
            ref={ref}
            {...rest}
          >
            {format === DateFormat.LOCAL && local}
            {format === DateFormat.AGE && age}
            {format === DateFormat.FULL && (
              <>
                {age} ({local})
              </>
            )}
          </Box>
        </PopTip>
      )
    }
  )
)

DateTime.displayName = 'DateTime'
