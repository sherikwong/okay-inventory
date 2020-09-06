import { Box, Stack } from 'grommet';
import { Down, Edit, Menu, Up } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import OverlayLoaderContext from '../../contexts/main-loader';
import { itemsDB } from '../../database/items';
import { renderTags } from '../reusable/Tags/Tags';
import { SizedUnsplash, ContrastingButton, HugeArrowButtons, Header, Number, QrCodeWrapper, BlackOverlay, DummyQRCode } from './Item.styles';
import { IItem } from '../../models/items';
import { useSwipeable, Swipeable } from 'react-swipeable'


const Item = ({ match, history }) => {
  const [id, setId] = useState(match.params.id);
  const [num, setNum] = useState(0);
  const [showEditModal, toggleEditModal] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: new Set(),
  });


  if (!id) {

    history.push('/');
  }


  useEffect(() => {
    if (id) {
      itemsDB.get(id).then(res => {
        setDetails({ ...details, ...res });
        setNum(res.quantity ? res.quantity : 0);
      });
    }
  }, []);


  const onUpdateQty = direction => () => {
    setNum(direction > 0 ? num + 1 : num > 0 ? num - 1 : num);

    itemsDB.update(id, {
      ...details as IItem,
      quantity: num
    })
  }

  const navToEdit = () => {
    history.push(`/item/${id}/edit`);
  }


  const imageTags = [...details.name.split(' '), ...details.tags].join(',');
  return (
    <OverlayLoaderContext.Consumer>
      {
        ({ loadOverlay, setLoadOverlay }) => {
          return (
            <Swipeable onSwipedUp={onUpdateQty(1)} onSwipedDown={onUpdateQty(-1)} onSwipedRight={navToEdit}>
              <Stack fill={true} className="item-stack" id="item">

                {details.name && <SizedUnsplash keywords={imageTags} width={window.screen.width} height={window.screen.height} style={{ backgroundPosition: 'center center' }} />}

                <BlackOverlay fill={true}></BlackOverlay>

                <Box align="center" fill={true} justify="between">
                  <Box direction="row" justify="between" pad="medium" fill="horizontal">
                    <ContrastingButton secondary icon={<Menu />} />
                    <ContrastingButton secondary icon={<Edit />} onClick={navToEdit} />
                  </Box>


                  <Box direction="column" fill={true} align="center" justify="between">
                    <HugeArrowButtons secondary size="large" icon={<Up />} onClick={onUpdateQty(1)} />
                    {/* <FlipNumbers height={100} width={100} color="red" background="transparent" play perspective={100} numbers={String(num)} /> */}
                    <Box>
                      <Number> {num}</Number>
                      {/* https://codepen.io/liborgabrhel/pen/JyJzjb */}

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
                  </Box>




                </Box>

                {/* <EditItem toggleEditModal={toggleEditModal} showEditModal={showEditModal} /> */}


              </Stack>
            </Swipeable>
          )
        }
      }

    </OverlayLoaderContext.Consumer >
  );
}
export default withRouter(Item);
