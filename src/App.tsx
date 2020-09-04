
import { Box, Stack } from 'grommet';
import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import MenuButton from './components/MenuButton';
import OverlayLoader from './components/reusable/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';
import Routes, { history, IRoute } from './Routes';

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
        <Stack fill={true} id="app-stack">
          <Router history={history}>
            {recursiveRoute(Routes)}
          </Router>
          <Box fill={true} align="end" justify="end">
            <MenuButton />
          </Box>
        </Stack>
      </OverlayLoader>
    </OverlayLoaderContext.Provider>
  );
};

export default App;
