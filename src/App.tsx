
import { Box, Stack } from 'grommet';
import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import OverlayLoader from './components/reusable/OverlayLoader/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';
import Routes, { history, IRoute } from './Routes';
import NavButtons from './components/NavButtons';
import './App.scss';

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
        <Stack fill={true} className="overflow-container" id="initial-stack">
          <Router history={history}>
            {recursiveRoute(Routes)}
          </Router>
          <Box fill={true} align="end" justify="end">
            <NavButtons />
          </Box>
        </Stack>
      </OverlayLoader>
    </OverlayLoaderContext.Provider>
  );
};

export default App;
