import { BoxProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'
import { Box } from './container/Box'
import { Spinner } from './Spinner'

const card = css`
  border-radius: 8px;
  border: 1px solid ${vars.colors.border1};
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: ${vars.colors.backgroundMain};
  box-shadow: ${vars.shadows.shadow3};
  position: relative;
`

const Loading = ({ ...props }: BoxProps) => {
  return (
    <Box
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 500px;
      `}
      {...props}
    >
      <Spinner
        css={css`
          --spinner-size: 40px;
        `}
        speed="0.65s"
        thickness="3px"
        size="lg"
        color={vars.colors.link}
        emptyColor={vars.colors.buttonBg1}
      />
    </Box>
  )
}

export const Card = ({ variant, isLoading, ...props }: BoxProps & { isLoading?: boolean; variant?: string }) => {
  if (isLoading)
    return (
      <Box
        css={[
          card,
          css`
            padding: ${variant === 'table' ? '12px' : 0};
          `,
        ]}
        {...props}
      >
        <Loading />
      </Box>
    )

  return (
    <Box
      css={[
        card,
        css`
          padding: ${variant === 'table' ? '12px' : 0};
        `,
      ]}
      {...props}
    />
  )
}

export const CardBody = ({ variant, isLoading, ...props }: BoxProps & { isLoading?: boolean; variant?: string }) => {
  if (isLoading)
    return (
      <Box padding="12px" {...props}>
        <Loading
          css={css`
            min-height: 200px;
          `}
        />
      </Box>
    )

  return <Box padding="12px" {...props} />
}

export const CardHead = styled(Box)`
  ${(props) =>
    props.variant === 'table' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    `}
  ${(props) =>
    props.variant === 'tabletab' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    `}
`

export const CardHeadStats = styled(Box)`
  ${(props) =>
    props.variant === 'table' &&
    css`
      display: flex;
      align-items: center;
      color: ${vars.text.header};
      font-size: 14px;
      line-height: 1.7;
    `}
  ${(props) =>
    props.variant === 'tabletab' &&
    css`
      display: flex;
      align-items: center;
      color: ${vars.text.header};
      font-size: 14px;
    `}
`

export const CardFooter = styled(Box)`
  ${(props) =>
    props.variant === 'table' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 0;
    `}
  ${(props) =>
    props.variant === 'tabletab' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 0;
    `}
`
