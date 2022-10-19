import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ApplicationModal {}

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum DateFormat {
  UTC = 'utc',
  LOCAL = 'local',
  AGE = 'age',
  FULL = 'full',
}

export type Network = {
  id: string
  development?: boolean
  mainnet?: boolean
  chainName: string
  to?: string
}

export type ChainStats = {
  address_count: string
  user_transaction_count: string
  tps: string
  active_validators_count: string
  pending_validators_count: string
  latest_gas_fee: string
  epoch: string
  round: string
  time_microseconds: string
  epoch_interval: string
  last_reconfiguration_time: string
}

type SliceState = {
  readonly language: string
  readonly openModal: ApplicationModal | null
  readonly networks: Network[]
  readonly currentNetworkId: Network['id']
  readonly dateFormat: DateFormat
  readonly pageSize: number
}

const initialState: SliceState = {
  language: 'en',
  openModal: null,
  networks: [
    {
      id: '1',
      mainnet: true,
      chainName: 'Mainnet',
      to: 'https://apscan.io/',
    },
    {
      id: 'dev',
      chainName: 'Devnet',
      development: true,
    },
    {
      id: '2',
      chainName: 'Testnet',
    },
  ],
  currentNetworkId: process.env.REACT_APP_NETWORK_ID || '1',
  dateFormat: DateFormat.AGE,
  pageSize: 25,
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<string>) => {
      state.language = payload
    },

    setOpenModal(state, action) {
      state.openModal = action.payload
    },

    setDateFormat(state, { payload }: PayloadAction<DateFormat>) {
      state.dateFormat = payload
    },

    setPageSize(state, { payload }: PayloadAction<number>) {
      state.pageSize = payload
    },
  },
})

export const { setLanguage, setOpenModal, setDateFormat, setPageSize } = applicationSlice.actions

export default applicationSlice.reducer
