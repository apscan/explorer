import { css } from '@emotion/react'
import Logo from 'assets/apscan-logo.png'
import { ReactComponent as GasIcon } from 'assets/icons/gas.svg'
import { Box, Container } from 'components/container'
import { Divider } from 'components/Divider'
import { Icon } from 'components/Icon'
import { Link } from 'components/link'
import { NumberFormat } from 'components/NumberFormat'
import { SearchGroup } from 'components/search-group'
import { memo } from 'react'
import { useAppStats } from 'state/api/hooks'
import { vars } from 'theme/theme.css'
import { container, content, contentWrapper, divider, header, logo, logoImg } from './Header.styles'
import { PageNav } from './Nav'
import { SelectNetwork } from './SelectNetwork'

const GasPrice = () => {
  const stats = useAppStats()

  return (
    <NumberFormat
      postfix=" Octa"
      color={vars.text.secondary}
      separate={false}
      fallback="--"
      value={stats?.latest_gas_fee}
    />
  )
}

export const Header = memo(({ isHome }: { isHome?: boolean }) => {
  return (
    <Box as="header" css={[header, !isHome && `border-bottom: 1px solid ${vars.colors.border1};`]}>
      <Container css={container}>
        <Box>
          <Link to={'/'} css={logo}>
            <img css={logoImg} src={Logo} alt="apscan" />
          </Link>
          {!isHome && (
            <Box
              css={css`
                background-color: ${vars.colors.badgeBg1};
                font-weight: 500;
                font-size: 12px;
                padding: 5px 8px;
                transition: 0.2s ease-in-out;
                border-radius: 6px;
                color: ${vars.text.body};
                display: inline-flex;
                align-items: center;
              `}
            >
              APT: <NumberFormat marginLeft="4px" minimumFractionDigits={2} prefix="$" value={undefined} fallback="-" />
              <Divider
                css={css`
                  height: 12px;
                  margin: 0 8px;
                `}
                color={vars.text.body}
                type="vertical"
              />
              <Icon
                css={css`
                  width: 16px;
                  margin-right: 4px;
                  color: ${vars.text.secondary};
                `}
                as={GasIcon}
              />
              <GasPrice />
            </Box>
          )}
        </Box>
        {isHome ? (
          <Box css={content}>
            <PageNav />
            <Divider type="vertical" css={divider} />
            <SelectNetwork />
          </Box>
        ) : (
          <Box css={contentWrapper}>
            <SearchGroup variant="header" />
            <Box css={content}>
              <PageNav />
              <Divider type="vertical" css={divider} />
              <SelectNetwork />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
})
