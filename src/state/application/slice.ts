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

export enum DateOrBlock {
  DATE = 'date',
  BLOCK = 'block',
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

export type Geo = {
  address: string
  network: string
  country: string
  city: string
  lat: string
  lon: string
  ip: string
}

type SliceState = {
  readonly language: string
  readonly openModal: ApplicationModal | null
  readonly networks: Network[]
  readonly currentNetworkId: Network['id']
  readonly dateFormat: DateFormat
  readonly pageSize: number
  readonly dateOrBlock: DateOrBlock
  readonly geo: Geo[]
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
  ],
  currentNetworkId: process.env.REACT_APP_NETWORK_ID || '1',
  dateFormat: DateFormat.AGE,
  dateOrBlock: DateOrBlock.DATE,
  pageSize: 25,
  geo: [],
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

    setDateOrBlock(state, { payload }: PayloadAction<DateOrBlock>) {
      state.dateOrBlock = payload
    },

    setPageSize(state, { payload }: PayloadAction<number>) {
      state.pageSize = payload
    },

    setGeo(state, { payload }: PayloadAction<Geo[]>) {
      console.log('payload', payload)
      for (const item of payload) {
        const data = state.geo.find((i) => i.address === item.address)
        if (!data) {
          state.geo.push(item)
        }
      }
    },
  },
})

export const { setLanguage, setOpenModal, setDateFormat, setPageSize, setDateOrBlock, setGeo } =
  applicationSlice.actions

export default applicationSlice.reducer
