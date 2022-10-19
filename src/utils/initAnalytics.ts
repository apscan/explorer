import * as amplitude from '@amplitude/analytics-browser'

export const initAnalytics = () => {
  const API_KEY = process.env.REACT_APP_AMPLITUDE_KEY

  if (typeof API_KEY === 'undefined') {
    console.error(`REACT_APP_AMPLITUDE_KEY is undefined, Amplitude analytics will not run.`)
    return
  }

  amplitude.init(API_KEY)
}
