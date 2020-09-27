/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grommet, Stack } from 'grommet';
import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import './App.scss';
import OverlayLoader from './components/reusable/OverlayLoader/OverlayLoader';
import OverlayLoaderContext from './contexts/main-loader';
import ModalContext from './components/modal/ModalContext';
import Modal from './components/modal/Modal';
// import List from './components/List/List';
import { createBrowserHistory } from 'history';
import List from './components/List/List';
import ItemRouter from './components/item/Router';
import Scan from './components/scan/scan';
// import ItemRouter from './components/item/ItemRouter';

// import Item from './components/Item';
// import EditItem from './components/item/EditItem/EditItem';

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

              <Router history={history}>


                {/* <Route path="/" component={Tags} /> */}

                {/* <Route path="/item/:id/edit" component={EditItem} /> */}
                <Route path="/item/:id" component={ItemRouter} />
                {/* <Route exact path="/items/new" component={EditItem} /> */}

                <Route exact path="/list" component={List} />
                <Route exact path="/" component={Scan} />

              </Router>



    </Grommet>
  );
};

export default App;
