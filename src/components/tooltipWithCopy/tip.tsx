import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleTooltip,
  tooltipPositionSelector,
  tooltipShowSelector,
  clearTimer,
  setTimerId,
  tooltipCopiedSelector,
  setCopied,
} from '../../state/tooltip/tooltipSlice'
import { useEffect, useMemo, useRef, useState } from 'react'
import copy from 'copy-to-clipboard'

const Wrapper = styled.div<{
  position: {
    left?: number
    right?: number
    bottom: number
  }
  ref: any
}>`
  position: fixed;
  z-index: 1;
  ${(p) => (p.position.left ? 'left: ' + p.position.left + 'px;' : '')}
  ${(p) => (p.position.right ? 'right: ' + p.position.right + 'px;' : '')}
  bottom: ${(p) => p?.position?.bottom ?? 0}px;
`

const TipWrapper = styled.div<{ showTip: boolean }>`
  padding: 2px 8px;
  display: ${(p) => (p.showTip ? 'grid' : 'none')};
  color: #ffffffeb;
  line-height: 20px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  background: #21325b;
  word-break: break-all;
  -webkit-font-smoothing: antialiased;
  --popper-arrow-size: 8px;
  cursor: pointer;
  align-items: center;
`

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #21325b;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`

export default function Tip({ children }: any) {
  const ref = useRef<HTMLDivElement | null>()
  const show = useSelector(tooltipShowSelector)
  const position = useSelector(tooltipPositionSelector)
  const copied = useSelector(tooltipCopiedSelector)
  const [rect, setRect] = useState({ width: 0 })
  const dispatch = useDispatch()

  useEffect(() => {
    if (ref.current) {
      setRect({ width: ref.current.getBoundingClientRect().width })
    }
  }, [copied])

  useEffect(() => {
    if (ref.current) {
      setRect({ width: ref.current.getBoundingClientRect().width })
      ref.current.addEventListener('mouseenter', () => {
        dispatch(clearTimer())
      })
      ref.current.addEventListener('mouseout', () => {
        const timer = setTimeout(() => {
          dispatch(toggleTooltip(false))
          dispatch(setCopied(false))
        }, 500)
        dispatch(setTimerId(timer))
      })
    }
  }, [position, dispatch])

  const reponsivePosition: {
    bottom: number
    left?: number
    right?: number
  } = useMemo(() => {
    const minLeft = copied ? 27 : rect.width / 2

    if (position.left >= minLeft) {
      return {
        left: position.left - minLeft,
        bottom: position.bottom + 5,
      }
    }

    return {
      right: window.innerWidth - rect.width / 2 - position.left,
      bottom: position.bottom + 5,
    }
  }, [copied, position.bottom, position.left, rect])

  if (!show) {
    return null
  }

  return (
    <Wrapper position={reponsivePosition} ref={ref}>
      <TipWrapper
        showTip={show}
        onClick={() => {
          copy(children)
          dispatch(setCopied(true))
        }}
      >
        {copied ? 'Copied' : children}
        <Triangle />
      </TipWrapper>
    </Wrapper>
  )
}
