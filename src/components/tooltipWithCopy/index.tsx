import {
  clearTimer,
  setPosition,
  setText,
  setTimerId,
  toggleTooltip,
} from '../../state/tooltip/tooltipSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div<{ pull?: number }>`
  position: relative;
  display: inline-block;
  width: fit-content;
  margin: auto;
  ${({ pull }) => 'margin-' + pull + ': 0;'}
`

export default function TooltipWithCopy({
  children,
  disabled,
  label = '',
  pullRight = false,
  style,
  ...restProps
}: any) {
  const ref = useRef<HTMLDivElement | null>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (disabled) {
      return
    }
    return () => {
      dispatch(toggleTooltip(false))
    }
  }, [disabled, dispatch])

  useEffect(() => {
    if (ref?.current && !disabled) {
      const onMouseEnter = () => {
        const position = ref?.current?.getBoundingClientRect()
        dispatch(clearTimer())
        dispatch(toggleTooltip(true))
        dispatch(setText(label))
        dispatch(
          setPosition({
            left: (position?.left ?? 0) + (position?.width ?? 0) / 2,
            bottom: window.innerHeight - (position?.bottom ?? 0) + (position?.height ?? 0),
          })
        )
      }
      const onMouseOut = () => {
        const timer = setTimeout(() => {
          dispatch(toggleTooltip(false))
        }, 500)
        dispatch(setTimerId(timer))
      }
      ref.current.addEventListener('mouseenter', onMouseEnter)
      ref.current.addEventListener('mouseout', onMouseOut)

      const current = ref.current

      return () => {
        current.removeEventListener('mouseenter', onMouseEnter)
        current.removeEventListener('mouseout', onMouseOut)
      }
    }
  }, [disabled, dispatch, label])

  if (!label) return children

  return (
    <Wrapper style={style} ref={ref} pull={pullRight ? 'right' : 'left'} {...restProps}>
      {children}
    </Wrapper>
  )
}
