import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://514712b4386c4430b1ba5fbaafda9f4c@o1406097.ingest.sentry.io/4503961392054272',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}
