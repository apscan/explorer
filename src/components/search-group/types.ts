export enum SearchOption {
  All = 'All',
  Addresses = 'Addresses',
  Tx = 'Tx',
  Block = 'Block',
}

export interface SearchItem {
  id: SearchOption
  name: string
  desc: string
}
