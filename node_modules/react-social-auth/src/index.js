import React, { useEffect } from 'react'
import { hasRequiredSettings } from './common'
import * as google from './google'
import * as linkedin from './linkedin'
import * as salesforce from './salesforce'

let providers = { google, linkedin, salesforce }

export let SocialAuth = props => {
  let { provider, component: Component } = props
  let { init, onClick } = providers[provider]
  // I don't believe the useEffect hook is necessary here.
  useEffect(() => {
    hasRequiredSettings(props)
    init(props)
  }, [])
  return <Component onClick={() => onClick(props)} />
}

export let GoogleAuth = props => <SocialAuth {...props} provider="google" />
export let LinkedInAuth = props => <SocialAuth {...props} provider="linkedin" />
export let SalesForceAuth = props => (
  <SocialAuth {...props} provider="salesforce" />
)
