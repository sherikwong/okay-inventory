/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grommet, Box } from 'grommet';
import { createBrowserHistory } from 'history';
import React, {
  ComponentClass,
  createFactory,
  useState,
  useEffect,
} from 'react';
import { Route, Router, withRouter } from 'react-router-dom';
import { FirebaseAuthProvider } from 'use-firebase-auth';
import './App.scss';
import Authentication, {
  IS_AUTHENTICATED,
} from './components/authentication/authentication';
import { db } from './database';
// import { List } from '../node_modules/grommet-icons/icons';
import List from './components/List/List';
import { Menu } from 'grommet-icons';
import ItemRouter from './components/item/Router';
import { cookies } from './index';
import Scan from './components/scan/scan';
import Logo from './components/reusable/logo/logo';
import { NewModel } from './components/features/model/new/new-model';

const theme = {
  calendar: {
    medium: {
      daySize: 'calc(100vw/8)',
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

export const routes = {
  '/item/:id': {
    component: ItemRouter,
    buttons: {
      top: [],
      bottom: [],
    },
  },
  '/list': {
    component: List,
    buttons: {
      top: [],
      bottom: [],
    },
  },
  '/models/new': {
    component: NewModel,
  },
  '/': {
    component: Scan,
    buttons: {
      top: [
        {
          icon: Menu,
        },
      ],
      bottom: [],
    },
  },
};

const history = createBrowserHistory();

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const hasAuthenticatedCookie = cookies.get(IS_AUTHENTICATED);
  const [logoHasPlayed, setLogoHasPlayed] = useState(false);

  setTimeout(() => {
    setLogoHasPlayed(true);
  }, 3000);

  return (
    // <Grommet theme={theme} themeMode="dark">
    <Grommet theme={theme}>
      {!logoHasPlayed ? (
        <Box fill={true} alignContent="center" justify="center">
          <Logo animated={true} width="100%" />
        </Box>
      ) : (
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
      )}
    </Grommet>
  );
};

export default App;
