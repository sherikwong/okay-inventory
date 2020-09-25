/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { HugeArrowButtons, Header, QrCodeWrapper, DummyQRCode, ContrastingText } from './Item.styles';
import { Box, Layer } from 'grommet';
import { Down, Up, LinkUp } from 'grommet-icons';
import { QrCode } from 'qrcode.react';
import { withRouter } from 'react-router-dom';
import { Number } from './Item.styles';
import { itemsDB } from '../../database/items';
import Tags from '../reusable/Tags/Tags';
import { Swipeable } from 'react-swipeable';
import queryString from 'query-string';
import BlackOverlay from '../reusable/BlackOverlay';
import styled from 'styled-components';
import './Item.scss';
import BouncingArrowOverlay from './Overlay/Overlay';


const Item = (props) => {
  const { details, onUpdate, match, location } = props;;
  const [quantity, setQty] = useState(0);
  const [queryDirection, setQueryDirection] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const alterQty = num => {
    setLoading(true);

    const updatedNum = quantity + num;
    setQty(updatedNum);

    itemsDB.update(details.id, {
      ...details,
      quantity: updatedNum
    }).then(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    const queryObj = queryString.parse(location.search);

    if (queryObj && queryObj.qty) {
      setQueryDirection(+queryObj.qty);

      alterQty(quantity + (+queryObj.qty));
    }
  }, []);

  useEffect(() => {
    setQty(details.quantity || 0);
  }, [details]);



  return (
    <Swipeable onSwipedDown={() => alterQty(-1)} onSwipedUp={() => alterQty(1)}>
      <Box direction="column" fill={true} align="center" justify="between">

        <HugeArrowButtons secondary size="large" icon={<Up />} onClick={() => alterQty(1)} />

        <Box align="center">
          <Number> {quantity}</Number>

          <Header className="header-wrapper">
            {(details && details.name) ? details.name.toUpperCase() : ''}
          </Header>


          <ContrastingText> {details.date && new Date(details.date).toLocaleDateString("en-US")}
          </ContrastingText>
          {/* <CalendarIcon date={details.date} /> */}

          <Tags tags={details.tags} />
        </Box>

        <HugeArrowButtons secondary size="large" icon={<Down />} onClick={() => alterQty(-1)} />

      </Box>

      {/* {showModal &&  */}

      {queryDirection && isLoading && <BouncingArrowOverlay direction={queryDirection} />}

      {/* } */}
    </Swipeable>
  );
}

export default withRouter(Item);

