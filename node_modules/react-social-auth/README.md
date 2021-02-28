# react-social-auth

[![npm version](https://badge.fury.io/js/react-social-auth.svg)](https://badge.fury.io/js/react-social-auth)

Simple client side social authentication for [React](https://reactjs.org/) applications.

# Version History/Changelog

See our [changelog](https://github.com/smartprocure/react-social-auth/blob/master/CHANGELOG.md)

# Installing

`npm install react-social-auth`

This package requires `lodash/fp`, so make sure that's available in your app.

# Usage

Client Side Code:

```js
import React from 'react'
import { Button } from 'reactstrap'
import Flex from './Flex'
import { GoogleAuth, LinkedInAuth } from 'react-social-auth'

let GoogleButton = ({ onClick }) => (
  <Button
    style={{ width: 175 }}
    className="cursor-pointer"
    color="primary"
    onClick={onClick}
  >
    <Flex>
      <i className="fa fa-google-plus" />
      Log in with Google
    </Flex>
  </Button>
)

let LinkedInButton = ({ onClick }) => (
  <Button
    style={{ width: 175 }}
    className="cursor-pointer"
    color="primary"
    onClick={onClick}
  >
    <Flex>
      <i className="fa fa-linkedin-square" />
      Log in with LinkedIn
    </Flex>
  </Button>
)

let onSignIn = authPayload => {
  // Use the authentication payload to verify
  // the identity of the request using server
  // side authentication procedures.
  console.log(authPayload)
}

export default () => (
  <Flex>
    <GoogleAuth
      appId="[YOUR_GOOGLE_APP_ID]"
      onSuccess={onSignIn}
      component={GoogleButton}
    />
    <LinkedInAuth
      appId="[YOUR_LINKEDIN_APP_ID]"
      onSuccess={onSignIn}
      component={LinkedInButton}
    />
    <SalesForceAuth
      appId="[YOUR_SALESFORCE_APP_ID]"
      onSuccess={onSignIn}
      component={SalesForceButton}
    />
  </Flex>
)
```

# Server side authentication procedures:

- [Google](https://developers.google.com/identity/sign-in/web/backend-auth)
- [LinkedIn](https://developer.linkedin.com/docs/oauth2) (Step 2)
- [SalesForce](https://help.salesforce.com/articleView?id=remoteaccess_oauth_web_server_flow.htm&type=5)

## SalesForce server side code:

```js
import jsforce from 'jsforce'

export let salesforce = async (app, { code, redirectUri }) => {
  let { appId, clientSecret } = '[Object containing your API key and secret]'
  let oauth2 = new jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: appId,
    clientSecret,
    redirectUri,
  })
  let conn = new jsforce.Connection({ oauth2 })
  await conn.authorize(code)
  let { email } = await conn.chatter.resource('/users/me')
  // More code to lookup user by email and other authentication steps.
}
```
