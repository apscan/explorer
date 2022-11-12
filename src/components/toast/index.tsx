import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import ToastItem from './ToastItem'
import { newErrorToast, removeAllToast, toastsSelector } from '../../state/toast/toastSlice'
import { useAppSelector } from '../../state/hooks'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onmessage = ({ data: message }) => {
        if (message === 'toast:error:403') {
          dispatch(newErrorToast('Access Limited, Wait for 30 Seconds', true))
        }
        if (message === 'toast:error:clear') {
          dispatch(removeAllToast())
        }
      }
    }
  }, [dispatch])

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
