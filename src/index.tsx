import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'simplebar-react/dist/simplebar.min.css'
import { AppUpdater } from 'state/application/updater'
import { initAnalytics } from 'utils/initAnalytics'
import { initSentry } from 'utils/sentry'
import './i18n'
import App from './pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './state'
import { ThemeProvider } from './theme'
import reportWebVitals from './utils/reportWebVitals'
import './index.css'

function Updaters() {
  return (
    <>
      <AppUpdater />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Updaters />
        <ThemeProvider>
          <HelmetProvider>
            <Helmet>
              <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Helmet>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (process.env.REACT_APP_SERVICE_WORKER !== 'false') {
  serviceWorkerRegistration.unregister()
}

if (process.env.NODE_ENV === 'production') {
  initSentry()
  initAnalytics()
}

reportWebVitals()
