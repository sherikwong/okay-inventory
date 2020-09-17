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
import EditTags from './EditItem/Tags';


const history = createBrowserHistory();

const ItemRouter = ({ match }) => {
  const id = match.params.id;
  const [qty, setQty] = useState(0);

  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: {},
  });


  useEffect(() => {
    if (id) {
      itemsDB.get(id).then(res => {
        setDetails(res);
        setQty(res.quantity ? res.quantity : 0);
        console.log(res);
      });
    }
  }, []);

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

  // // const imageTags = [...details.name.split(' '), ...details.tags].join(',');
  const imageTags = [...details.name.split(' ')].join(',');

  return (
    <Stack fill={true} className="item-stack" id="item">

      {details.name && <SizedUnsplash keywords={imageTags} width={window.screen.width} height={window.screen.height} style={{ backgroundPosition: 'center center' }} />}

      <BlackOverlay fill={true}></BlackOverlay>

      <Box align="center" fill={true} justify="between">

        <Box direction="row" justify="between" pad="medium" fill="horizontal">
          <ContrastingButton secondary icon={<Menu />} onClick={() => history.push('/')} />
          {/* <ContrastingButton secondary icon={<Edit />} onClick={navToEdit} /> */}
        </Box>



        <Box className="item-router-wrapper" pad="large">
          <Router history={history}>

            <Route path={`/item/:id/edit/tags`}>
              <EditTags details={details} />
            </Route>


            <Route path={`/item/:id`} exact>
              <Item details={details} />
            </Route>



          </Router>
        </Box>



        {/* <Box direction="column" fill={true} align="center" justify="between">
                    <HugeArrowButtons secondary size="large" icon={<Up />} onClick={onUpdateQty(1)} />
                    <Box align="center">
                      <Number> {num}</Number>

                      <Header className="header-wrapper">
                        {details.name.toUpperCase()}
                      </Header>
                      {details.date && details.date.toLocaleDateString && details.date.toLocaleDateString("en-US")}



                      {renderTags([...details.tags])}
                    </Box>

                    <Box direction="row" justify="between" fill="horizontal" pad="medium">
                      <QrCodeWrapper>
                        <QrCode bgColor="transparent" value={id} size={50} />
                      </QrCodeWrapper>
                      <HugeArrowButtons secondary size="large" icon={<Down />} onClick={onUpdateQty(-1)} />
                      <DummyQRCode> </DummyQRCode>
                    </Box>
                  </Box> */}




      </Box>
    </Stack>

  );
}
export default withRouter(ItemRouter);
