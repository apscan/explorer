import React, { Context, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { newErrorToast, removeAllToast } from 'state/toast/toastSlice'

interface ApiStateContextProps {
  blocked: boolean
}

export const ApiStateContext: Context<ApiStateContextProps> = React.createContext(
  {} as unknown as ApiStateContextProps
)

export const ApiStateProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [blocked, setBlocked] = useState(false)
    const blockedRef = useRef(false)
    const timerRef = useRef<number>()
    const dispatch = useDispatch()

    useEffect(() => {
      window.addEventListener('message', ({ data: message }) => {
        if (message === 'toast:error:403') {
          if (blockedRef.current) {
            return
          }

          setBlocked(true)
          blockedRef.current = true
          dispatch(newErrorToast('Reached API call limit, retry in 30s!', true))
          timerRef.current = window.setTimeout(() => {
            dispatch(removeAllToast())
            window.location.reload()
          }, 30000)
        } else if (message === 'toast:error:clear') {
          setBlocked(false)
          blockedRef.current = false
          dispatch(removeAllToast())
          timerRef.current && clearTimeout(timerRef.current)
        }
      })
    }, [dispatch])

    return (
      <ApiStateContext.Provider
        value={{
          blocked,
        }}
      >
        {children}
      </ApiStateContext.Provider>
    )
  }
)
