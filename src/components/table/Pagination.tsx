import { BoxProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box } from 'components/container'
import { vars } from 'theme/theme.css'
import { ReactComponent as ChevronLeft } from 'assets/icons/chevron-left.svg'
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg'
import { Icon } from 'components/Icon'
import { memo } from 'react'

const Wrapper = styled(Box)`
  display: inline-flex;
`
const StyledButtonWrapper = styled(Box)`
  margin-right: 6px;
  :last-child {
    margin-right: 0;
  }
`

const StyledButton = styled(Box)`
  height: 30px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: 500;
  padding: 4.8px 9.6px;
  background-color: ${vars.colors.badgeBg};
  color: ${vars.colors.link};
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.7;
  cursor: pointer;

  ${(props) =>
    !props.disabled &&
    css`
      :hover {
        color: #fff;
        background-color: ${vars.colors.link};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      color: ${vars.colors.paginationDisable};
      cursor: auto;
      pointer-events: none;
    `}
`

StyledButton.defaultProps = {
  as: 'span',
}

export const Pagination = memo(
  ({
    page,
    total,
    onNextPage,
    onPrePage,
    onFirstPage,
    onLastPage,
    ...props
  }: BoxProps & {
    page?: number
    total?: number
    onNextPage: () => void
    onPrePage: () => void
    onFirstPage: () => void
    onLastPage?: () => void
  }) => {
    return (
      <Wrapper {...props}>
        <StyledButtonWrapper>
          <StyledButton disabled={page === 1} onClick={() => onFirstPage()}>
            First
          </StyledButton>
        </StyledButtonWrapper>
        <StyledButtonWrapper>
          <StyledButton disabled={page === 1} onClick={() => onPrePage()}>
            <Icon height="16px" as={ChevronLeft} />
          </StyledButton>
        </StyledButtonWrapper>
        <StyledButtonWrapper>
          <StyledButton disabled>
            Page {page || '-'} of {total || '-'}
          </StyledButton>
        </StyledButtonWrapper>
        <StyledButtonWrapper>
          <StyledButton disabled={page === total} onClick={() => onNextPage()}>
            <Icon height="16px" as={ChevronRight} />
          </StyledButton>
        </StyledButtonWrapper>
        {onLastPage && (
          <StyledButtonWrapper>
            <StyledButton disabled={page === total} onClick={() => onLastPage()}>
              Last
            </StyledButton>
          </StyledButtonWrapper>
        )}
      </Wrapper>
    )
  }
)
