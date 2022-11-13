import { createSlice } from '@reduxjs/toolkit'
import { AppState } from 'state'

type Tooltip = {
  showTip: boolean
  text: string
  position: {
    left: number
    top: number
  }
  timerId: number
  copied: boolean
}

const initialState: Tooltip = {
  showTip: false,
  text: '',
  position: { left: 0, top: 0 },
  timerId: 0,
  copied: false,
}
const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    toggleTooltip(state, { payload }) {
      state.showTip = payload
    },
    setText(state, { payload }) {
      state.text = payload
    },
    setPosition(state, { payload }) {
      state.position = payload
    },
    clearTimer(state) {
      if (state.timerId) {
        clearTimeout(state.timerId)
        state.copied = false
      }
    },
    setTimerId(state, { payload }) {
      if (state.timerId) {
        // console.log('crear:', state.timerId)
        clearTimeout(state.timerId)
      }
      state.timerId = payload
    },
    setCopied(state, { payload }) {
      if (state.timerId) {
        clearTimeout(state.timerId)
      }
      state.copied = payload
    },
  },
})

export const tooltipShowSelector = (state: AppState) => state.tooltip.showTip
export const tooltipContentSelector = (state: AppState) => state.tooltip.text
export const tooltipPositionSelector = (state: AppState) => state.tooltip.position
export const tooltipCopiedSelector = (state: AppState) => state.tooltip.copied

export const { setText, setPosition, toggleTooltip, clearTimer, setTimerId, setCopied } = tooltipSlice.actions

export default tooltipSlice.reducer
