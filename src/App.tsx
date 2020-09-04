
import { Card } from 'grommet';
import React, { useState } from 'react';
import { Router, Route } from 'react-router-dom';
import Routes, { IRoute } from './Routes';
import { history } from './Routes';
import OverlayLoader from './components/reusable/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';

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
    <OverlayLoaderContext.Provider value={{ loadOverlay, setLoadOverlay }}>
      <OverlayLoader show={loadOverlay}>
        <Card fill={true} margin="large" background="light-1">

          <Router history={history}>
            {recursiveRoute(Routes)}
          </Router>

        </Card>
      </OverlayLoader>
    </OverlayLoaderContext.Provider>
  );
};

export default App;
