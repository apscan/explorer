import { Box } from 'components/container'
import React, { ErrorInfo, PropsWithChildren } from 'react'

type ErrorBoundaryState = {
  error: Error | null
  fallbackRender?: (props: {
    error: Error
  }) => React.ReactElement<unknown, string | React.FunctionComponent | typeof React.Component>
}

async function updateServiceWorker(): Promise<ServiceWorkerRegistration> {
  const ready = await navigator.serviceWorker.ready
  // the return type of update is incorrectly typed as Promise<void>. See
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
  return ready.update() as unknown as Promise<ServiceWorkerRegistration>
}

export class ErrorBoundary extends React.Component<PropsWithChildren<unknown>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    updateServiceWorker()
      .then(async (registration) => {
        // We want to refresh only if we detect a new service worker is waiting to be activated.
        // See details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
        if (registration?.waiting) {
          await registration.unregister()

          // Makes Workbox call skipWaiting(). For more info on skipWaiting see: https://developer.chrome.com/docs/workbox/handling-service-worker-updates/
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })

          // Once the service worker is unregistered, we can reload the page to let
          // the browser download a fresh copy of our app (invalidating the cache)
          window.location.reload()
        }
      })
      .catch((error) => {
        console.error('Failed to update service worker', error)
      })

    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({
      ...error,
      ...errorInfo,
      fatal: true,
    })
  }

  render() {
    const { fallbackRender, error } = this.state

    if (error !== null) {
      if (typeof fallbackRender === 'function') {
        return fallbackRender({ error })
      } else {
        return <Box>ERROR</Box>
      }
    }

    return this.props.children
  }
}
