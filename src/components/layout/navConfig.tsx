export interface INavItem {
  name: string
  path?: string
  isDisabled?: boolean
  activePaths?: string[]
  sub?: INavItem[]
}

export const findPath = (nav: INavItem, path: string) => {
  return nav.activePaths ? nav.activePaths.some((item) => item === path) : nav.path === path
}

export const navConfig: INavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Accounts', path: '/accounts', activePaths: ['/accounts', '/account'] },
  {
    name: 'Blockchain',
    activePaths: ['/blocks', '/txs', '/block', '/tx'],
    sub: [
      {
        name: 'Blocks',
        path: '/blocks',
      },
      {
        name: 'Transactions',
        path: '/txs',
      },
    ],
  },
  {
    name: 'Consensus',
    activePaths: ['/epochs', '/validators'],
    sub: [
      {
        name: 'Epochs',
        isDisabled: true,
        path: '/epochs',
      },
      {
        name: 'Validators',
        path: '/validators',
      },
    ],
  },
  {
    name: 'Governance',
    activePaths: ['/proposals'],
    sub: [
      {
        name: 'Proposals',
        isDisabled: true,
        path: '/proposals',
      },
    ],
  },
  {
    name: 'Assets',
    activePaths: ['/apt', '/coins'],
    sub: [
      {
        name: 'APT',
        isDisabled: true,
        path: '/apt',
      },
      {
        name: 'Coins',
        isDisabled: process.env.NODE_ENV === 'production',
        path: '/coins',
      },
    ],
  },
]
