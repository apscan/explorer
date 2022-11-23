import { Icon } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactComponent as AptosLogo } from 'assets/aptos-logo.svg'
import { Box, Flex } from 'components/container'
import { Popover, PopoverTrigger } from 'components/popover'
import { memo } from 'react'
import { currentNetworkSelector, networksSelector } from 'state/application/selectors'
import { useAppSelector } from 'state/hooks'
import { vars } from 'theme/theme.css'
import { PopoverMenu, PopoverMenuItem } from './PopoverMenu'

const Badge = styled(Box)`
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4.8px 9.6px;
  background: ${vars.colors.badgeBg};
  color: ${vars.colors.link};
  border-radius: 4px;
  :hover {
    color: ${vars.text.body};
    text-decoration: none;
  }
`

export const SelectNetwork = memo(() => {
  const networks = useAppSelector(networksSelector)
  const currentNetwork = useAppSelector(currentNetworkSelector)

  return (
    <Popover trigger="hover" placement="bottom-end" offset={[0, 8]}>
      {({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        <>
          <PopoverTrigger>
            <Flex
              tabIndex={0}
              css={css`
                cursor: pointer;
                height: 24px;
                border-radius: 8px;
                user-select: none;
              `}
            >
              <Box
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                {currentNetwork?.mainnet ? (
                  <Icon
                    css={css`
                      width: 24px;
                      height: 24px;
                    `}
                    as={AptosLogo}
                  />
                ) : (
                  <Box>
                    <Badge>{currentNetwork?.chainName}</Badge>
                  </Box>
                )}
              </Box>
            </Flex>
          </PopoverTrigger>

          <PopoverMenu isOpen={isOpen}>
            {networks.map((item, index) => {
              return (
                <PopoverMenuItem
                  key={index}
                  isDisabled={!item.to}
                  isActive={currentNetwork?.chainName === item.chainName}
                  path={item.to}
                  onClose={onClose}
                >
                  {item.chainName}
                  {/* {item.development && ` (ID: ${config?.chain_id ?? '-'})`} */}
                  {!item.to && (
                    <Box as="span" marginLeft="4px">
                      (Coming Soon)
                    </Box>
                  )}
                </PopoverMenuItem>
              )
            })}
          </PopoverMenu>
        </>
      )}
    </Popover>
  )
})
