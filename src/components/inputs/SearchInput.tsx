import {
  InputGroup as ChaInputGroup,
  InputRightElement as ChaInputRightElement,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { forwardRef, useCallback, useState } from 'react'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { BaseInput, BaseInputProps } from './BaseInput'

export const SearchInput = forwardRef<
  HTMLInputElement,
  BaseInputProps & {
    onSearch?: (searchText: string) => void
  }
>(({ onChange, onSearch, onKeyUp, size = 'sm', className, children, ...rest }, ref) => {
  const [value, setValue] = useState('')

  const handleSearch = useCallback(() => {
    onSearch && onSearch(value)
  }, [onSearch, value])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value)
      onChange && onChange(event)
      event.preventDefault()
    },
    [onChange]
  )

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.code === 'Enter') {
        handleSearch()
      }
      onKeyUp && onKeyUp(event)
      event.preventDefault()
    },
    [onKeyUp, handleSearch]
  )

  return (
    <ChaInputGroup
      className={className}
      css={css`
        width: 220px;
      `}
    >
      <BaseInput
        value={value}
        size="lg"
        css={css`
          width: 100%;
          padding-right: 40px;
        `}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        ref={ref}
        {...rest}
      />
      <ChaInputRightElement
        onClick={handleSearch}
        css={css`
          width: auto;
          cursor: pointer;
          padding-left: 8px;
          padding-right: 8px;
          ${size === 'sm' &&
          `
            top: -4px;
          `}
        `}
      >
        <SearchIcon />
      </ChaInputRightElement>
    </ChaInputGroup>
  )
})

SearchInput.displayName = 'SearchInput'
