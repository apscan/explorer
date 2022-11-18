import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'

type AddressesTableProps = {
  value?: {
    label?: React.ReactNode
    content: React.ReactNode
    suffix?: React.ReactNode
  }[]
}

export const AddressesTable = ({ value = [] }: AddressesTableProps) => {
  return (
    <table
      css={css`
        font-size: 14px;
      `}
    >
      <tbody>
        {value
          .filter((x) => x)
          .map(({ label, content, suffix }, index) => (
            <tr key={index}>
              {label ? (
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
              ) : null}
              <td
                css={css`
                  padding: 6px 12px;
                  border: 1px solid ${vars.colors.border1};
                `}
              >
                {content}
              </td>
              {suffix ? (
                <td
                  css={css`
                    padding: 6px 12px;
                    border: 1px solid ${vars.colors.border1};
                  `}
                >
                  {suffix}
                </td>
              ) : null}
            </tr>
          ))}
      </tbody>
    </table>
  )
}
