import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'

type HashesTableProps = {
  value?: {
    label: React.ReactNode
    content: React.ReactNode
  }[]
}

export const HashesTable = ({ value = [] }: HashesTableProps) => {
  return (
    <table
      css={css`
        font-size: 14px;
      `}
    >
      <tbody>
        {value
          .filter((x) => x)
          .map(({ label, content }, index) => (
            <tr key={index}>
              <td
                css={css`
                  border: 1px solid ${vars.colors.border1};
                  padding: 8px 16px;
                  font-weight: 400;
                  background: #f5f5f5;
                `}
              >
                {label}
              </td>
              <td
                css={css`
                  padding: 6px 12px;
                  border: 1px solid ${vars.colors.border1};
                `}
              >
                {content}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
