/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { HugeArrowButtons, Header, QrCodeWrapper, DummyQRCode, ContrastingText } from './Item.styles';
import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { QrCode } from 'qrcode.react';
import { withRouter } from 'react-router-dom';
import { Number } from './Item.styles';
import { itemsDB } from '../../database/items';
import Tags from '../reusable/Tags/Tags';
import { Swipeable } from 'react-swipeable';
import queryString from 'query-string';

const Item = (props) => {
  const { details, onUpdate, match, location } = props;;
  const [quantity, setQty] = useState(0);
  const [showModal, setModal] = useState(false);

  const alterQty = num => {
    const updatedNum = quantity + num;
    setQty(updatedNum);

    itemsDB.update(details.id, {
      ...details,
      quantity: updatedNum
    });
  }

  useEffect(() => {
    const queryDirection = queryString.parse(location.search);
    
    if (queryDirection) {
      setModal(true);  
  alterQty(quantity + (+queryDirection));
    } 
  }, []);

  useEffect(() => {
setQty(details.quantity || 0);
  }, [details]);

 
  
  return (<>
    <Swipeable onSwipedDown={() => alterQty(-1)} onSwipedUp={() => alterQty(1)}
  ox direction="column" fill={true} align="center" justify="between">

  owButtons secondary size="large" icon={<Up />} onClick={() => alterQty(1)} />

    ox align="center">
    <Number> {quantity}</Number>

    <Header className="header-wrapper">
            {(details && details.name) ? details.name.toUpperCase() : ''}
          < /Header>

 
          <ContrastingText> {details.date && new Date(details.date).toLocaleDateString("en-US")}
          </ContrastingText>
          {/* <CalendarIcon date={details.date} /> */}

          <Tags tags={details.tags} />
        </Box>

<HugeArrowButtons secondary size="large" icon={<Down />} onClick={() => alterQty(-1)} />
  
    </Box>

Swipeable>
     
  showModal ? (<Layer>

    </Layer>)
      </>
  );
}

export default withRouter(Item);


