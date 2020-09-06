
import { Grommet, Stack } from 'grommet';
import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import './App.scss';
import OverlayLoader from './components/reusable/OverlayLoader/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';
import ModalContext from './components/modal/ModalContext';
import Modal from './components/modal/Modal';
import List from './components/List/List';
import { createBrowserHistory } from 'history';
import Item from './components/Item/Item';
import EditItem from './components/Item/EditItem/EditItem';

const theme = {
  calendar: {
    medium: {
      daySize: 'calc(100vw/8)'
    }
  }
};


const history = createBrowserHistory();

const App = () => {

  const [loadOverlay, setLoadOverlay] = useState(false);
  const [showModal, toggleModal] = useState(false);

  return (
    <Grommet theme={theme}>
      <ModalContext.Provider value={{ showModal, toggleModal }}>

        <OverlayLoaderContext.Provider value={{ loadOverlay, setLoadOverlay }}>
          <OverlayLoader show={loadOverlay}>
            <Stack fill={true} className="overflow-container" id="initial-stack">
              <Router history={history}>




                <Route path="/item/:id/edit" component={EditItem} />
                <Route path="/item/:id" component={Item} />
                <Route exact path="/items/new" component={EditItem} />
                <Route path="/items" component={List} />
                <Route exact path="/" component={List} />

              </Router>
              {/* <Box align="end" justify="end">
            <NavButtons />
          </Box> */}
            </Stack>
          </OverlayLoader>
        </OverlayLoaderContext.Provider>

        <Modal showModal={showModal} toggleModal={toggleModal} />

      </ModalContext.Provider>
    </Grommet>
  );
};

export default App;
