import { DocumentTitle } from 'components/DocumentTitle'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Layout } from 'components/layout/Layout'
import { Route, Routes } from 'react-router-dom'
import { Account } from './account'
import { Accounts } from './accounts'
import { Block } from './block'
import { Blocks } from './blocks'
import { Home } from './home'
import { NotFound } from './NotFound'
import { Transaction } from './transaction'
import { Transactions } from './transactions'
import { Validators } from './validators'

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
    path: '/tx',
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
]

function App() {
  return (
    <ErrorBoundary>
      <DocumentTitle value="Aptos (APT) Blockchain Explorer" />
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
