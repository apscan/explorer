import ReactGA from 'react-ga'

export const initAnalytics = () => {
  const API_KEY = process.env.REACT_APP_ANALYTICS_KEY

  if (typeof API_KEY === 'undefined') {
    console.error(`REACT_APP_ANALYTICS_KEY is undefined, Amplitude analytics will not run.`)
    return
  }

  ReactGA.initialize(API_KEY)
}
