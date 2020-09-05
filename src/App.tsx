
import { Stack } from 'grommet';
import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import './App.scss';
import OverlayLoader from './components/reusable/OverlayLoader/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';
import Routes, { history, IRoute } from './Routes';
import ModalContext from './components/modal/ModalContext';
import Modal from './components/modal/Modal';

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
  const [showModal, toggleModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>

      <OverlayLoaderContext.Provider value={{ loadOverlay, setLoadOverlay }}>
        <OverlayLoader show={loadOverlay}>
          <Stack fill={true} className="overflow-container" id="initial-stack">
            <Router history={history}>
              {recursiveRoute(Routes)}
            </Router>
            {/* <Box align="end" justify="end">
            <NavButtons />
          </Box> */}
          </Stack>
        </OverlayLoader>
      </OverlayLoaderContext.Provider>

      <Modal showModal={showModal} toggleModal={toggleModal} />


    </ModalContext.Provider>
  );
};

export default App;
