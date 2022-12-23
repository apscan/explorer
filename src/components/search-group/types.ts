export enum SearchOption {
  All = 'All',
  Addresses = 'Addresses',
  Tx = 'Tx',
  Block = 'Block',
  Ans = 'Ans',
}

export interface SearchItem {
  id: SearchOption
  name: string
  desc: string
}
