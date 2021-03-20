/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grommet } from 'grommet';
import { createBrowserHistory } from 'history';
import React, { ComponentClass, createFactory, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import { routes } from './App.routes';
import './App.scss';
import Authentication, {
  IS_AUTHENTICATED,
} from './components/authentication/authentication';
import Logo from './components/reusable/logo/logo';
import { cookies } from './index';

const theme = {
  calendar: {
    medium: {
      daySize: 'calc(100vw/8)',
    },
    background: {
      color: {
        dark: 'black',
      },
    },
  },
  radioButton: {
    border: {
      color: {
        dark: 'white',
      },
    },
  },
  background: {
    color: {
      dark: 'black',
    },
  },
};

export interface INavButton {
  icon: any;
  click?: () => {};
}
export interface IRoute {
  component: ComponentClass;
  buttons?: { [key: string]: INavButton[] };
}

const history = createBrowserHistory();

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const hasAuthenticatedCookie = cookies.get(IS_AUTHENTICATED);
  const [logoHasPlayed, setLogoHasPlayed] = useState(false);

  setTimeout(() => {
    setLogoHasPlayed(true);
  }, 3000);

  return (
    <Grommet theme={theme} themeMode="dark">
      {/* {!logoHasPlayed ? ( */}
      {false ? (
        <Box fill={true} alignContent="center" justify="center">
          <Logo animated={true} width="100%" />
        </Box>
      ) : (
        <Box pad="large">
          <Router history={history}>
            {true ? (
              // hasAuthenticatedCookie || isAuthenticated
              Object.entries(routes).map(([path, info]) => (
                <Route
                  path={path}
                  key={path}
                  component={createFactory(info.component as any)}
                  exact
                />
              ))
            ) : (
              <Authentication setAuthenticated={setAuthenticated} />
            )}
          </Router>
        </Box>
      )}
    </Grommet>
  );
};

export default App;
