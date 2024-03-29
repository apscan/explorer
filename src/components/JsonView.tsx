import { css } from '@emotion/react'
import { useMemo } from 'react'
import ReactJson, { ReactJsonViewProps } from 'react-json-view'
import { Box, BoxProps } from './container'
import { CopyButton } from './CopyButton'
import { isLargeObject } from '../utils'

const JsonViewContainer = ({
  children,
  isDisabled,
  data,
  maxWidth,
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
        max-width: ${maxWidth || 'none'};
      `}
    >
      <Box
        css={css`
          padding: 16px 40px 16px 16px;
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
              right: 22px;
              top: 16px;
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
  maxWidth?: string
  forcePretty?: boolean
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
      {text || '-'}
    </Box>
  )
}

export const JsonView = ({
  src,
  fallback,
  ellipsis,
  withContainer,
  maxWidth,
  forcePretty = false,
  ...props
}: JsonViewProps) => {
  if (src == null) return <>{fallback}</>

  return (
    <JsonViewContainer data={src} isDisabled={!withContainer} maxWidth={maxWidth}>
      <Box
        css={css`
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
          & > pre {
            word-wrap: break-word;
            white-space: pre-wrap;
          }
        `}
      >
        {!forcePretty && isLargeObject(src) ? (
          <pre>{JSON.stringify(src, null, 4)}</pre>
        ) : (
          <ReactJson
            collapsed={false}
            name={false}
            enableClipboard={false}
            displayDataTypes={false}
            src={src}
            {...props}
          />
        )}
      </Box>
    </JsonViewContainer>
  )
}
