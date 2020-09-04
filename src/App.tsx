
import { Card } from 'grommet';
import React, { useState } from 'react';
import { Router, Route } from 'react-router-dom';
import Routes, { IRoute } from './Routes';
import { history } from './Routes';
import OverlayLoader from './components/reusable/OverlayLoader';
import OverlayLoaderContext from '../main-loader';

const App = () => {
  const childRoute = (route: IRoute, i: number) => (
    <Route exact path={route.path} key={i}>
      {React.createElement(route.component)}
    </Route>
  );


  const recursiveRoute = (routes: IRoute[]) => routes.map((route, i) => {
    return childRoute(route, i)
  });

  const [loadOverlay, setLoadOverlay] = useState(false);

  return (
    <Card fill={true}>
      <OverlayLoaderContext.Provider value={loadOverlay}>

        <OverlayLoader>
          <Router history={history}>
            {recursiveRoute(Routes)}
          </Router>
        </OverlayLoader>

      </OverlayLoaderContext.Provider>
    </Card>
  );
};

export default App;
