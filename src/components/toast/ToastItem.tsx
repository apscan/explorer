import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { removeToast } from '../../state/toast/toastSlice'
import useIsMounted from '../../utils/hooks'
import { ReactComponent as ToastSuccessIcon } from '../../assets/icons/toast-success.svg'
import { ReactComponent as ToastErrorIcon } from '../../assets/icons/toast-error.svg'
import ToastReject from '../../assets/icons/ToastReject'

export const shadow_200 = css`
  box-shadow: 0 6px 22px rgba(30, 33, 52, 0.11), 0 1.34018px 4.91399px rgba(30, 33, 52, 0.0655718),
    0 0.399006px 1.46302px rgba(30, 33, 52, 0.0444282);
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled(Flex)`
  align-items: flex-start;
  padding: 16px 16px;
  background: white;
  ${shadow_200};
  border-radius: 6px;
  //border: 1px solid ${(props) => props.theme.grey200Border};
  font-size: 14px;
  line-height: 140%;
  width: 320px;
  font-style: normal;
  font-weight: 400;
  // color: ${(props) => props.theme.textPrimary};

  > img:first-child {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    flex: 0 0 auto;
  }
  > svg:last-child {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    cursor: pointer;
    flex: 0 0 auto;
  }
  > div {
    flex-grow: 1;
    width: 224px;
    word-wrap: break-word;
  }
  transform: translateX(200%);
  transition: all 0.25s ease-out;
  &.tran {
    transform: translateX(min(calc((1080px - 100vw) / 2), 0px)) !important;
    @media screen and (max-width: 768px) {
      transform: translateX(32px) !important;
    }
  }
  @media screen and (max-width: 375px) {
    width: 100%;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
  width: 20px;
  height: 20px;
`

const ToastItem = ({ type, message, id, sticky }: any) => {
  const dispatch = useDispatch()
  const isMounted = useIsMounted()
  const [tranClass, setTranClass] = useState('')

  useEffect(() => {
    if (sticky) {
      return
    }
    setTimeout(() => {
      dispatch(removeToast(id))
    }, 5000)
  }, [dispatch, id, sticky])

  useEffect(() => {
    setTimeout(() => {
      if (isMounted.current) {
        setTranClass('tran')
      }
    }, 100)
  })

  if (!message) return null

  return (
    <Wrapper className={tranClass}>
      <IconWrapper>
        {type === 'success' ? <ToastSuccessIcon /> : type === 'error' ? <ToastErrorIcon /> : null}
      </IconWrapper>
      <div>{message}</div>
      <ToastReject
        onClick={() => {
          dispatch(removeToast(id))
        }}
      />
    </Wrapper>
  )
}

export default ToastItem
