import { DocumentTitle } from 'components/DocumentTitle'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Layout } from 'components/layout/Layout'
import { Route, Routes } from 'react-router-dom'
import { Account } from './account'
import { Accounts } from './accounts'
import { Block } from './block'
import { Blocks } from './blocks'
import { Coin } from './coin'
import { Coins } from './coins'
import { Collection } from './collection'
import { Collections } from './collections'
import { Home } from './home'
import { NotFound } from './NotFound'
import { Token } from './token'
import { Transaction } from './transaction'
import { Transactions } from './transactions'
import { Validators } from './validators'
import { Proposals } from './proposals'
import { Proposal } from './proposal'
import { Epochs } from './epochs'
import { Modules } from './modules'
import { Module } from './module'
import { Epoch } from './epoch'

const routes = [
  {
    path: '/',
    element: (
      <Layout isHome>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/blocks',
    element: (
      <Layout>
        <Blocks />
      </Layout>
    ),
  },
  {
    path: '/block/:id',
    element: (
      <Layout>
        <Block />
      </Layout>
    ),
  },
  {
    path: '/txs',
    element: (
      <Layout>
        <Transactions />
      </Layout>
    ),
  },
  {
    path: '/tx/:id',
    element: (
      <Layout>
        <Transaction />
      </Layout>
    ),
  },
  {
    path: '/accounts',
    element: (
      <Layout>
        <Accounts />
      </Layout>
    ),
  },
  {
    path: '/account/:id',
    element: (
      <Layout>
        <Account />
      </Layout>
    ),
  },
  {
    path: '/validators',
    element: (
      <Layout>
        <Validators />
      </Layout>
    ),
  },
  {
    path: '/coins',
    element: (
      <Layout>
        <Coins />
      </Layout>
    ),
  } as any,
  {
    path: '/coin/:type',
    element: (
      <Layout>
        <Coin />
      </Layout>
    ),
  } as any,
  {
    path: '/collections',
    element: (
      <Layout>
        <Collections />
      </Layout>
    ),
  } as any,
  {
    path: '/collection/:creator/:name',
    element: (
      <Layout>
        <Collection />
      </Layout>
    ),
  } as any,
  {
    path: '/token/:creator/:collectionName/:name',
    element: (
      <Layout>
        <Token />
      </Layout>
    ),
  } as any,
  {
    path: '/proposals',
    element: (
      <Layout>
        <Proposals />
      </Layout>
    ),
  } as any,
  {
    path: '/proposal/:id',
    element: (
      <Layout>
        <Proposal />
      </Layout>
    ),
  } as any,
  {
    path: '/epochs',
    element: (
      <Layout>
        <Epochs />
      </Layout>
    ),
  } as any,
  {
    path: '/epoch/:id',
    element: (
      <Layout>
        <Epoch />
      </Layout>
    ),
  } as any,
  {
    path: '/modules',
    element: (
      <Layout>
        <Modules />
      </Layout>
    ),
  } as any,
  {
    path: '/module/:id',
    element: (
      <Layout>
        <Module />
      </Layout>
    ),
  } as any,
].filter(Boolean)

function App() {
  return (
    <ErrorBoundary>
      <DocumentTitle value="Aptos (APT) Blockchain Explorer | Apscan" />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
