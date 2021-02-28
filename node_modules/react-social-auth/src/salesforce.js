import { getQueryParameter } from './common'
import generateState from 'simple-random/browser'

export let init = ({ onSuccess }) => {
  if (localStorage.salesforceLoginState) {
    let redirectUri = localStorage.salesforceReactLoginRedirectUri
    let code = getQueryParameter('code')
    let state = getQueryParameter('state')
    window.history.replaceState(null, null, redirectUri)
    if (code && state === localStorage.salesforceLoginState) {
      delete localStorage.salesforceLoginState
      onSuccess({
        type: 'salesforce',
        authResponse: {
          code,
          redirectUri,
        },
      })
    }
  }
}

export let onClick = ({ appId, redirectUri = window.location.href }) => {
  localStorage.salesforceReactLoginRedirectUri = redirectUri
  localStorage.salesforceLoginState = generateState({ length: 8 })
  window.location.href = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=${localStorage.salesforceLoginState}`
}
