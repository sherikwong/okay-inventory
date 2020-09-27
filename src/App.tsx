/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grommet } from 'grommet';
// import List from './components/List/List';
import { createBrowserHistory } from 'history';
import React, { useState, createFactory, ComponentClass } from 'react';
import { Route, Router } from 'react-router-dom';
import './App.scss';
import ItemRouter from './components/item/Router';
import List from './components/List/List';
import Scan from './components/scan/scan';
import Navigation, { NavContext } from './components/navigation/navigation';

const theme = {
  calendar: {
    medium: {
      daySize: 'calc(100vw/8)'
    }
  }
};

export interface INavButton {
  icon: any;
  click: () => {};
}
export interface IRoute {
  component: ComponentClass;
  buttons: { [key: string]: INavButton[] };
}

export const routes: { [key: string]: IRoute } = {
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
    component: Scan,
    buttons: {
      top: [],
      bottom: []
    },

  },
}

const history = createBrowserHistory();

const App = () => {

  const [loadOverlay, setLoadOverlay] = useState(false);
  const [showModal, toggleModal] = useState(false);

  return (
    <Grommet theme={theme}>
      <NavContext.Provider value={routes['/']}>
        <Navigation />
        <Router history={history}>

          {Object.entries(routes).map(([path, info]) => (
            <Route path={path} key={path} component={createFactory(info.component)} />
          ))}



        </Router>


        <Navigation />
      </NavContext.Provider>

    </Grommet>
  );
};

export default App;
