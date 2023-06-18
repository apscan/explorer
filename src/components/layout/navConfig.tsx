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
    activePaths: ['/blocks', '/txs', '/block', '/tx', '/modules', '/module'],
    sub: [
      {
        name: 'Blocks',
        path: '/blocks',
      },
      {
        name: 'Transactions',
        path: '/txs',
      },
      {
        name: 'Modules',
        path: '/modules',
      },
    ],
  },
  {
    name: 'Consensus',
    activePaths: ['/epochs', '/validators'],
    sub: [
      {
        name: 'Epochs',
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
        path: '/proposals',
      },
    ],
  },
  {
    name: 'Assets',
    activePaths: ['/coins', '/collections'],
    sub: [
      {
        name: 'Coins',
        path: '/coins',
      },
      {
        name: 'Collections',
        path: '/collections',
      },
    ],
  },
]
