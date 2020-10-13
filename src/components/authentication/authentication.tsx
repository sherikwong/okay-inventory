import { Box } from 'grommet';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter } from "react-router-dom";
import { usersDB } from '../../database/users';
import { cookies } from '../../index';
import { CookieOptions } from '../../../node_modules/@types/express-serve-static-core';
import Logo from '../reusable/logo/logo';


export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

const Authentication = (props) => {
  const onSuccess = res => {
    usersDB.get(res.googleId)
      .then(res => {
        if (res) {
          props.setAuthenticated(true);

          const expires = new Date();
          expires.setTime(expires.getTime() + 10 * 86400000);

          cookies.set(
            IS_AUTHENTICATED,
            true,
            {
              expires
            } as CookieOptions
          )
        };
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <Box fill={true} align="center" justify="center" id="authentication">

      <Logo animated={true}/>

      <GoogleLogin
        clientId="486767954182-ts607v7hkaftr7harabtqtvkmcc005g0.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onSuccess}
        cookiePolicy={'single_host_origin'}
      >Sign In</GoogleLogin>






    </Box >
  )
}

export default withRouter(Authentication);
