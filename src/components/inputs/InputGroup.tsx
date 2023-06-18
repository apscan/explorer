import {
  InputGroup as ChaInputGroup,
  InputRightElement as ChaInputRightElement,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { forwardRef } from 'react'
import { BaseInput, BaseInputProps } from './BaseInput'

export const InputGroup = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ onChange, className, style, children, ...rest }, ref) => {
    return (
      <ChaInputGroup className={className} style={style}>
        <BaseInput className="input-group__input" onChange={onChange} ref={ref} {...rest} />
        {children && (
          <ChaInputRightElement
            className="input-group__right-element"
            css={css`
              width: auto;
              height: 100%;
            `}
          >
            {children}
          </ChaInputRightElement>
        )}
      </ChaInputGroup>
    )
  }
)

InputGroup.displayName = 'InputGroup'
