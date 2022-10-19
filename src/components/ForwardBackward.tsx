import { BoxProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactComponent as ChevronLeft } from 'assets/icons/chevron-left.svg'
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg'
import { memo } from 'react'
import { To } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { Box } from './container'
import { Link } from './link'
import { Tooltip } from './Tooltip'

const Button = styled(Link)`
  display: inline-block;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  color: ${vars.colors.link};
  background: ${vars.colors.badgeBg};
  border-color: transparent;
  cursor: pointer;
  line-height: 0;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  margin-right: 4px;
  padding: 1px;
  user-select: none;

  :last-child {
    margin-right: 0;
  }
  :hover {
    ${(props) =>
      !props.disabled &&
      css`
        color: #fff;
        background: ${vars.colors.link};
        box-shadow: ${vars.shadows.shadow4};
      `}

    ${(props) =>
      props.disabled &&
      css`
        color: ${vars.text.body};
        text-decoration: none;
      `}
  }
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.65;
    `}
`

export const ForwardBackward = memo(
  ({
    toNext,
    nextDisabled,
    prevDisabled,
    toPrev,
    nextTooltip,
    prevTooltip,
    ...props
  }: BoxProps & {
    toNext?: To
    nextDisabled?: boolean
    nextTooltip?: string
    prevTooltip?: string
    prevDisabled?: boolean
    toPrev?: To
  }) => {
    return (
      <Box
        css={css`
          display: inline-flex;
          align-items: flex-end;
          vertical-align: middle;
        `}
        {...props}
      >
        <Tooltip openDelay={20} label={prevTooltip} placement="top">
          <Button to={toPrev} disabled={prevDisabled}>
            <ChevronLeft />
          </Button>
        </Tooltip>
        <Tooltip openDelay={20} label={nextTooltip} placement="top">
          <Button to={toNext} disabled={nextDisabled}>
            <ChevronRight />
          </Button>
        </Tooltip>
      </Box>
    )
  }
)
