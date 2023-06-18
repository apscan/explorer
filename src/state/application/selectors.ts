import { createSelector } from '@reduxjs/toolkit'
import { AppState } from 'state'

export const languageSelector = (state: AppState) => state.application.language

export const currentNetworkIdSelector = (state: AppState) => state.application.currentNetworkId

export const networksSelector = (state: AppState) => state.application.networks

export const pageSizeSelector = (state: AppState) => state.application.pageSize

export const allGeoSelector = (state: AppState) => state.application.geo

export const currentNetworkSelector = createSelector(
  currentNetworkIdSelector,
  networksSelector,
  (id, networks) => {
    return networks.find((network) => network.id === id) || undefined
  }
)

export const selectGeoSelector = createSelector(
  [allGeoSelector, (state, address) => address],
  (geos, address) => {
    return geos.find((item) => item.address === address) || undefined
  }
)
