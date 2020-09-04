
import { Card, Box, Stack } from 'grommet';
import React, { useState } from 'react';
import { Router, Route } from 'react-router-dom';
import Routes, { IRoute } from './Routes';
import { history } from './Routes';
import OverlayLoader from './components/reusable/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';
import MenuButton from './components/MenuButton';

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
        <Stack fill={true}>
          <Card fill={true} margin="large" background="light-1">
            <Router history={history}>
              {recursiveRoute(Routes)}
            </Router>
          </Card>
          <Box fill={true} align="end" justify="end">
            <MenuButton />
          </Box>
        </Stack>
      </OverlayLoader>
    </OverlayLoaderContext.Provider>
  );
};

export default App;
