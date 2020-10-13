/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grommet } from 'grommet';
import { createBrowserHistory } from 'history';
import React, { ComponentClass, createFactory, useState, useEffect } from 'react';
import { Route, Router } from 'react-router-dom';
import { FirebaseAuthProvider } from 'use-firebase-auth';
import './App.scss';
import Authentication, { IS_AUTHENTICATED } from './components/authentication/authentication';
import { db } from './database';
// import { List } from '../node_modules/grommet-icons/icons';
import List from './components/List/List';
import { Menu } from 'grommet-icons';
import ItemRouter from './components/item/Router';
import { cookies } from './index';


const theme = {
  calendar: {
    medium: {
      daySize: 'calc(100vw/8)'
    }
  }
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
      bottom: []
    }
  },
  '/list': {
    component: List,
    buttons: {
      top: [],
      bottom: []
    }
  },
  '/': {
    component: List,
    buttons: {
      top: [{
        icon: Menu
      }],
      bottom: []
    },
  }
};

const history = createBrowserHistory();

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const hasAuthenticatedCookie = cookies.get(IS_AUTHENTICATED);

  return (
    <FirebaseAuthProvider firebase={db.app as any}>
      <Grommet theme={theme}>
        {/* <NavContext.Provider value={{ buttons, setButtons: setUpdateButtons }}> */}

        {/* <Navigation direction="top" /> */}

        <Router history={history}>
          {
            hasAuthenticatedCookie || isAuthenticated
              ? (Object.entries(routes).map(([path, info]) => (
                <Route path={path} key={path} component={createFactory(info.component as any)} exact/>
              )))
              : (<Authentication setAuthenticated={setAuthenticated} />)
          }
        </Router>

        {/* <Navigation direction="bottom" /> */}

        {/* </NavContext.Provider> */}

      </Grommet>
    </FirebaseAuthProvider>
  );
};

export default App;
