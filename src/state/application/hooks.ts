import { useCallback, useState } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import * as queryString from 'query-string'

import { ApplicationModal, setOpenModal } from './slice'
import { useLocation } from 'react-router-dom'

export const useModalOpen = (modal: ApplicationModal): boolean => {
  const openModal = useAppSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export const useToggleModal = (modal: ApplicationModal) => {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()

  return useCallback(
    (close?: boolean) => dispatch(setOpenModal(close !== undefined ? null : open ? null : modal)),
    [dispatch, modal, open]
  )
}

export const usePageNumberFromUrl = (): number => {
  const location = useLocation()
  const [page] = useState(parseInt((queryString.parse(location.search)?.start as string) ?? '1'))
  return page
}
