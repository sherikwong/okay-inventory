/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Stack } from 'grommet';
import { Edit, Menu } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { itemsDB } from '../../database/items';
import BlackOverlay from '../reusable/BlackOverlay';
import EditDate from './EditItem/Date';
import EditTags from './EditItem/EditTags';
import Name from './EditItem/Name';
import './index.scss';
import Item from './Item';
import { ContrastingButton, SizedUnsplash } from './Item.styles';

const ItemRouter = ({ match, history }) => {
  const id = match.params.id;
  const [qty, setQty] = useState(0);

  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: [],
  });

  const navToEdit = () => {
    history.push(`/item/${id}/edit/name`);
  }

  const keywords = details && details.name.split(' ').join(',') + ',food';
  // console.log(keywords);


  useEffect(() => {
    if (id) {
      itemsDB.get(id).then(res => {
        setDetails({ ...details, ...res });

        setQty(res && res.quantity ? res.quantity : 0);
      });
    }
  }, [id, details]);

  return (
    <Stack fill={true} className="item-stack" id="item">

      <SizedUnsplash
        keywords={keywords}
        width={window.screen.width} height={window.screen.height} style={{ backgroundPosition: 'center center' }} />

      <BlackOverlay></BlackOverlay>

      <Box align="center" fill={true} justify="between">

        <Box direction="row" justify="between" pad="medium" fill="horizontal">
          <ContrastingButton secondary icon={<Menu />} onClick={() => history.push('/')} />
          <ContrastingButton secondary icon={<Edit />} onClick={navToEdit} />
        </Box>

        <Box className="item-router-wrapper" pad="large">

          <Route path={`/item/:id/edit/tags`}>
            <EditTags details={details} />
          </Route>

          <Route path={`/item/:id/edit/date`}>
            <EditDate details={details} />
          </Route>

          <Route path={`/item/:id/edit/name`}>
            <Name details={details} />
          </Route>

          <Route path={`/item/:id`} exact>
            <Item details={details} />
          </Route>

        </Box>


      </Box>
    </Stack>

  );
}

export default withRouter(ItemRouter);
