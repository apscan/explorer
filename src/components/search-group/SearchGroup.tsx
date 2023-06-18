import { useMediaQuery } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useSearchQuery } from 'api'
import { Address } from 'components/Address'
import { Link } from 'components/link'
import { Popover, PopoverContent, PopoverTrigger } from 'components/popover'
import { useDebounce } from 'hooks/useDebounce'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { Box } from '../container/Box'
import { InputGroup } from '../inputs'
import { Portal } from '../Portal'
import { Select } from '../Select'
import { useSearchOptions } from './hooks/useSearchOptions'

const Wrapper = styled(Box)`
  display: inline-flex;
`

// const SearchButton = styled(BaseButton)`
//   color: #fff;
//   background: ${vars.colors.primary};

//   border-radius: 8px;
//   font-size: 16px;
//   height: 36px;
//   margin-left: 8px;
//   margin-right: 8px;
//   padding-left: 16px;
//   padding-right: 16px;
// `

const SearchInputGroup = styled(InputGroup)`
  .input-group__input {
    padding-right: 72px;
    font-size: 14px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    ${(props) =>
      props.variant === 'home' &&
      css`
        background: #fff;
      `}
  }
`

const StyledPopoverContent = styled(PopoverContent)`
  border-radius: 0;
  padding: 8px;
  margin-right: 8px;
  border-color: transparent;
  box-shadow: ${vars.shadows.searchShadow1};
`

const StyledSelectWrapper = styled(Box)`
  margin-right: 0px;
  user-select: none;
`

const StyledSelect = styled(Select)`
  width: 128px;
  font-size: 14px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  ${(props) =>
    props.variant === 'home' &&
    css`
      background: #fff;
    `}
`

const StyledSearchItemSmall = styled(Box)`
  display: inline-flex;
  font-size: 12px;
  margin-left: 8px;
  font-weight: 500;

  color: ${vars.text.heading};
`

const StyledSearchSection = styled(Link)`
  font-size: 14px;
  padding: 4px 8px;
  font-weight: 400;
  color: ${vars.text.body};
  border-radius: 6px;
  background: #f8f9fa;
  margin-bottom: 8px;
  cursor: pointer;
  :hover {
    color: ${vars.colors.link};

    ${StyledSearchItemSmall} {
      color: ${vars.colors.link};
    }
  }
`

function contains(parent: HTMLElement | null, child: HTMLElement | null) {
  return parent === child || parent?.contains(child)
}

function getRelatedTarget(event: React.FocusEvent) {
  const activeEl = event.currentTarget.ownerDocument.activeElement
  return (event.relatedTarget ?? activeEl) as HTMLElement | null
}

export const SearchGroup = ({ variant }: { variant?: 'home' | 'header' }) => {
  const { options, selected, onSelected } = useSearchOptions()
  const [searchText, setSearchText] = useState('')
  const [inside, setInside] = useState(false)

  const debouncedSearchText = useDebounce(searchText, 50)
  const triggerRef = useRef<any>()
  const popoverRef = useRef<any>()
  const navigate = useNavigate()

  const { data, isFetching } = useSearchQuery({
    filter: selected.id,
    value: debouncedSearchText,
  })

  const onBlur = useCallback((event: React.FocusEvent) => {
    const relatedTarget = getRelatedTarget(event)
    const targetIsPopover = contains(popoverRef.current, relatedTarget)
    const targetIsTrigger = contains(triggerRef.current, relatedTarget)

    const isValidBlur = !targetIsPopover && !targetIsTrigger

    if (isValidBlur) {
      setInside(false)
      setSearchText('')
    }
  }, [])

  const isOpen = useMemo(() => {
    return inside && debouncedSearchText.length > 0
  }, [debouncedSearchText, inside])

  const noResult = useMemo(() => {
    if (!data) return true
    return Object.values(data).filter((x) => x !== null && x !== undefined).length === 0
  }, [data])

  const onSearch = useCallback(() => {
    setSearchText('')
  }, [])

  const onEnter = useCallback(() => {
    if (data?.account) {
      navigate(`/account/${data?.account}`)
      onSearch()
    } else if (data?.transaction) {
      navigate(`/tx/${data?.transaction}`)
      onSearch()
    } else if (data?.block) {
      navigate(`/block/${data?.block}`)
      onSearch()
    }
  }, [data, navigate, onSearch])

  const size = useMemo(() => (variant === 'home' ? 'lg' : 'md'), [variant])
  const [isSmall] = useMediaQuery('(max-width: 800px)')

  return (
    <Wrapper
      css={css`
        ${variant === 'home' &&
        css`
          margin-bottom: 32px;
          box-shadow: ${vars.shadows.shadow3};
        `};
        ${variant === 'header' &&
        css`
          width: calc(100% - 16px);
          margin-top: 8px;
          margin-left: auto;
        `};
      `}
    >
      <StyledSelectWrapper>
        <StyledSelect
          variant={variant}
          value={selected.id}
          onChange={(e) => onSelected(e.target.value as any)}
          size={size}
        >
          {options.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )
          })}
        </StyledSelect>
      </StyledSelectWrapper>
      <Popover gutter={0} matchWidth autoFocus={false} isOpen={isOpen}>
        <PopoverTrigger>
          <Box
            width={variant === 'header' ? (isSmall ? '95%' : '100%') : isSmall ? '100%' : '642px'}
          >
            <SearchInputGroup
              onFocus={() => setInside(true)}
              onBlur={onBlur}
              ref={triggerRef}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              size={size}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onEnter()
                }
              }}
              placeholder={selected.desc}
              variant={variant}
            ></SearchInputGroup>
          </Box>
        </PopoverTrigger>
        <Portal>
          <StyledPopoverContent ref={popoverRef} onFocus={() => setInside(true)} onBlur={onBlur}>
            {noResult && !isFetching ? (
              <Box>No Results</Box>
            ) : (
              <>
                {data?.ansAddress !== undefined && data?.ansAddress !== null && (
                  <StyledSearchSection
                    onClick={() => onSearch()}
                    to={`/account/${data.ansAddress}`}
                  >
                    Aptos Names
                    <StyledSearchItemSmall>
                      <Address value={data.ansAddress} size="short" />
                    </StyledSearchItemSmall>
                  </StyledSearchSection>
                )}
                {data?.account !== undefined && data?.account !== null && (
                  <StyledSearchSection onClick={() => onSearch()} to={`/account/${data.account}`}>
                    Account
                    <StyledSearchItemSmall>{data.account}</StyledSearchItemSmall>
                  </StyledSearchSection>
                )}
                {data?.transaction !== undefined && data?.transaction !== null && (
                  <StyledSearchSection onClick={() => onSearch()} to={`/tx/${data.transaction}`}>
                    Transaction
                    <StyledSearchItemSmall>{data.transaction}</StyledSearchItemSmall>
                  </StyledSearchSection>
                )}
                {data?.block !== undefined && data?.block !== null && (
                  <StyledSearchSection onClick={() => onSearch()} to={`/block/${data.block}`}>
                    Block
                    <StyledSearchItemSmall>{data.block}</StyledSearchItemSmall>
                  </StyledSearchSection>
                )}
              </>
            )}
          </StyledPopoverContent>
        </Portal>
      </Popover>
    </Wrapper>
  )
}
