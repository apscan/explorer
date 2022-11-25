import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { emptySplitApi } from 'api'
import applicationReducer, { applicationSlice } from './application/slice'
import { save, load } from 'redux-localstorage-simple'
import toastReducer from './toast/toastSlice'
import tooltipReducer from './tooltip/tooltipSlice'

const STORAGE_NAMEPLACE = 'APSCAN'

const preloadedState = load({
  namespace: STORAGE_NAMEPLACE,
  states: ['application.dateFormat', 'application.pageSize'],
  preloadedState: {
    application: {
      ...applicationSlice.getInitialState(),
    },
    toast: { toasts: [] },
  },
})

export function makeStore() {
  return configureStore({
    reducer: {
      toast: toastReducer,
      tooltip: tooltipReducer,
      application: applicationReducer,
      api: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(emptySplitApi.middleware)
        .concat(
          save({
            namespace: STORAGE_NAMEPLACE,
            states: ['application.dateFormat', 'application.pageSize'],
            debounce: 1000,
          })
        ),
    preloadedState: {
      application: (preloadedState as any).application,
    },
  })
}

const store = makeStore()

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
