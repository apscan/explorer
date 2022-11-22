import { createSlice } from '@reduxjs/toolkit'

const MAX_TOASTS = 6
let count = 0

export type Toast = {
  id?: number
  type: string
  message: string
  sticky?: boolean
}

type ToastState = {
  readonly toasts: Toast[]
}

const initialState: ToastState = {
  toasts: [],
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state, { payload }) {
      const toastId = count++
      if (state.toasts.length >= MAX_TOASTS) {
        const i = state.toasts.findIndex((item: any) => !item.sticky)
        state.toasts.splice(i, 1)
      }
      state.toasts.push({ id: toastId, ...payload })
    },
    removeToast(state, { payload }) {
      state.toasts = state.toasts.filter((item: any) => item.id !== payload)
    },
    removeAllToast(state) {
      state.toasts = []
    },
    updateToast(state, { payload }) {
      state.toasts = state.toasts.map((t) => {
        if (t.id === payload.id) {
          return { ...t, ...payload }
        }
        return t
      })
    },
  },
})

export const toastsSelector = (state: any) => {
  return state.toast.toasts
}

export const { addToast, removeToast, updateToast, removeAllToast } = toastSlice.actions

export const newToastId = () => count++

export const newPendingToast = (id: number, message: string) =>
  addToast({
    id,
    type: 'pending',
    message,
    sticky: true,
  })

export const updatePendingToast = (id: number, message: string) =>
  updateToast({
    id,
    message,
  })

export const newSuccessToast = (message: string) =>
  addToast({
    type: 'success',
    message,
  })

export const newErrorToast = (message: string, sticky?: boolean) => {
  return addToast({
    type: 'error',
    message,
    sticky: sticky ?? false,
  })
}

export default toastSlice.reducer
