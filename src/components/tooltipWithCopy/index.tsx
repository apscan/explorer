import { clearTimer, setPosition, setText, setTimerId, toggleTooltip } from '../../state/tooltip/tooltipSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div<{ pull?: number }>`
  position: relative;
  display: inline-block;
  width: fit-content;
  margin: auto;
  margin-${(p) => p.pull}: 0;
`

export default function TooltipWithCopy({ children, label = '', pullRight = false, ...restProps }: any) {
  const ref = useRef<HTMLDivElement | null>()
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(toggleTooltip(false))
    }
  }, [dispatch])

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.addEventListener('mouseenter', () => {
        const position = ref?.current?.getBoundingClientRect()
        dispatch(clearTimer())
        dispatch(toggleTooltip(true))
        dispatch(setText(label))
        dispatch(
          setPosition({
            left: (position?.left ?? 0) + (position?.width ?? 0) / 2,
            top: (position?.top ?? 0) - (position?.height ?? 0) - 10,
          })
        )
      })
      ref.current.addEventListener('mouseout', () => {
        const timer = setTimeout(() => {
          dispatch(toggleTooltip(false))
        }, 500)
        dispatch(setTimerId(timer))
      })
    }
  }, [dispatch, label])

  if (!label) return children

  return (
    <Wrapper ref={ref} pull={pullRight ? 'right' : 'left'} {...restProps}>
      {children}
    </Wrapper>
  )
}
