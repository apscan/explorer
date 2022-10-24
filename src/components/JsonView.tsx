import { css } from '@emotion/react'
import { useMemo } from 'react'
import ReactJson, { ReactJsonViewProps } from 'react-json-view'
import { Box, BoxProps } from './container'
import { CopyButton } from './CopyButton'

const JsonViewContainer = ({
  children,
  isDisabled,
  data,
  ...props
}: BoxProps & {
  data: object
  isDisabled?: boolean
}) => {
  const text = useMemo(() => (!isDisabled && data ? JSON.stringify(data, null, 2) : undefined), [isDisabled, data])

  if (isDisabled) return <>{children}</>

  return (
    <Box
      css={css`
        position: relative;
      `}
    >
      <Box
        css={css`
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e7eaf3;
          background-color: #f8f9fa;
          max-height: 416px;
          overflow: auto;
        `}
        {...props}
      >
        {text && (
          <Box
            css={css`
              position: absolute;
              right: 12px;
              top: 8px;
              font-size: 16px;
              z-index: 1;
            `}
          >
            <CopyButton text={text} />
          </Box>
        )}
        {children}
      </Box>
    </Box>
  )
}

type JsonViewProps = ReactJsonViewProps & {
  fallback?: React.ReactNode
  withContainer?: boolean
  ellipsis?: boolean
}

export const JsonViewEllipsis = ({ src, maxWidth, ...props }: { src: object } & BoxProps) => {
  const text = useMemo(() => {
    if (src) {
      return JSON.stringify(src)
    }
  }, [src])

  return (
    <Box
      css={css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: ${maxWidth || '200px'};
      `}
      {...props}
    >
      {text}
    </Box>
  )
}

export const JsonView = ({ src, fallback, ellipsis, withContainer, ...props }: JsonViewProps) => {
  if (src == null) return <>{fallback}</>

  return (
    <JsonViewContainer data={src} isDisabled={!withContainer}>
      <Box
        css={css`
          word-break: break-all;
          font-size: 12px;
          line-height: 1.25;
          font-weight: 400;
          .expanded-icon,
          .collapsed-icon {
            display: inline-flex;
            align-items: center;
            position: relative;
            top: 1.8px;
          }
        `}
      >
        <ReactJson
          collapsed={false}
          name={false}
          enableClipboard={false}
          displayDataTypes={false}
          src={src}
          {...props}
        />
      </Box>
    </JsonViewContainer>
  )
}
