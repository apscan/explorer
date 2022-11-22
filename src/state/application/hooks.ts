import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { pageSizeSelector } from './selectors'
import * as queryString from 'query-string'

import { ApplicationModal, setOpenModal, setPageSize } from './slice'
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

export const usePageSize = () => {
  const pageSize = useAppSelector(pageSizeSelector)
  const dispatch = useAppDispatch()

  const set = useCallback((pageSize: number) => dispatch(setPageSize(pageSize)), [dispatch])

  return useMemo(() => {
    return [pageSize, set] as const
  }, [pageSize, set])
}

export const usePageParams = () => {
  const [pageSize, setPageSize] = useState<number>(25)
  const [page, setPage] = useState<number>(1)
  const location = useLocation()

  useEffect(() => {
    const pageSizeString = (queryString.parse(location.search)?.pageSize as string) || '25'
    const pageString = (queryString.parse(location.search)?.page as string) || '1'
    setPageSize(parseInt(pageSizeString))
    setPage(parseInt(pageString))
  }, [location.search])

  return useMemo(
    () =>
      [pageSize, setPageSize, page, setPage] as [
        number,
        Dispatch<SetStateAction<number>>,
        number,
        Dispatch<SetStateAction<number>>
      ],
    [page, pageSize]
  )
}

export const usePageNumberFromUrl = (): number => {
  const location = useLocation()
  const [page] = useState(parseInt((queryString.parse(location.search)?.start as string) ?? '1'))
  return page
}
