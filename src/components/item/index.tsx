/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Stack } from 'grommet';
import { Menu } from 'grommet-icons';
import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { Route, Router, withRouter } from 'react-router-dom';
import { itemsDB } from '../../database/items';
import Name from './EditItem/Name';
import { BlackOverlay, ContrastingButton, SizedUnsplash } from './Item.styles';
import Item from './Item';
import './index.scss'
import EditTags from './EditItem/EditTags';


const history = createBrowserHistory();

const ItemRouter = ({ match }) => {
  const id = match.params.id;
  const [qty, setQty] = useState(0);

  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: [],
  });


  useEffect(() => {
    if (id) {
      get();
    }
  }, []);

  const get = () => {
    itemsDB.get(id).then(res => {
      setDetails({ ...details, ...res });

      setQty(res && res.quantity ? res.quantity : 0);
    });
  }

  useEffect(() => {
    console.log(details);
  }, [details]);
  // const onUpdateQty = direction => () => {
  //   setNum(direction > 0 ? num + 1 : num > 0 ? num - 1 : num);

  //   itemsDB.update(id, {
  //     ...details as IItem,
  //     quantity: num
  //   })
  // }

  // const navToEdit = () => {
  //   history.push(`/item/${id}/edit`);
  // }


  return (
    <Stack fill={true} className="item-stack" id="item">

      <SizedUnsplash
        keywords={details && details.name.split(' ').join(',')}
        width={window.screen.width} height={window.screen.height} style={{ backgroundPosition: 'center center' }} />

      <BlackOverlay fill={true}></BlackOverlay>

      <Box align="center" fill={true} justify="between">

        <Box direction="row" justify="between" pad="medium" fill="horizontal">
          <ContrastingButton secondary icon={<Menu />} onClick={() => history.push('/')} />
          {/* <ContrastingButton secondary icon={<Edit />} onClick={navToEdit} /> */}
        </Box>



        <Box className="item-router-wrapper" pad="large">
          <Router history={history}>

            <Route path={`/item/:id/edit/tags`}>
              <EditTags details={details} onUpdate={get} />
            </Route>


            <Route path={`/item/:id`} exact>
              <Item details={details} />
            </Route>



          </Router>
        </Box>


      </Box>
    </Stack>

  );
}

export default withRouter(ItemRouter);