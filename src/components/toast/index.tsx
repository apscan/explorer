import React, { memo } from 'react'
import styled from 'styled-components'
import ToastItem from './toastItem'
import { toastsSelector } from '../../state/toast/toastSlice'
import { useAppSelector } from '../../state/hooks'

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 0;
  left: 0;
  top: 0;
  z-index: 999;
`

const ToastList = styled(Flex)`
  flex-direction: column-reverse;
  margin: 78px -53px auto auto;
  width: fit-content;
  > :not(:last-child) {
    margin-top: 16px;
  }
  @media screen and (max-width: 375px) {
    margin: 78px 16px auto;
  }
`

const Toast = memo(() => {
  const toasts = useAppSelector(toastsSelector)

  return (
    <Wrapper>
      <ToastList>
        {(toasts || []).map(({ type, message, id, sticky }: any) => (
          <ToastItem type={type} message={message} id={id} key={id} sticky={sticky} />
        ))}
      </ToastList>
    </Wrapper>
  )
})

export default Toast
