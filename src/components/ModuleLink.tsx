import { memo } from 'react'
import { Box } from './container'
import { Link } from 'components/link'
import { css } from '@emotion/react'
import { truncated } from 'utils/truncated'

type ModuleLinkProps = {
  address: string
  module: string
}

export const ModuleLink = memo(({ address, module, ...props }: ModuleLinkProps) => {
  if (!address || !module) return null

  return (
    <Link
      to={`/module/${address}?module=${module}`}
      css={css`
        display: inline-flex;
        align-items: center;
      `}
      {...props}
    >
      {`${truncated(address, 8)}::${module}`}
    </Link>
  )
})
