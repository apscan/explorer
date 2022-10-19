import { css } from '@emotion/react'
import ReactJson, { ReactJsonViewProps } from 'react-json-view'
import { Box } from './container'

type JsonViewProps = ReactJsonViewProps & {
  fallback?: React.ReactNode
}

export const JsonView = ({ src, fallback, ...props }: JsonViewProps) => {
  if (src == null) return <>{fallback}</>

  return (
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
        }
      `}
    >
      <ReactJson name={false} enableClipboard={false} displayDataTypes={false} src={src} {...props} />
    </Box>
  )
}
