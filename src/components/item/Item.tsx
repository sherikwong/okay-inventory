/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { HugeArrowButtons, Header, QrCodeWrapper, DummyQRCode } from './Item.styles';
import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { QrCode } from 'qrcode.react';
import { withRouter } from 'react-router-dom';
import { Number } from './Item.styles';
import { itemsDB } from '../../database/items';
import Tags from '../reusable/Tags/Tags';

const Item = (props) => {
  const { details, onUpdate } = props;
  const [quantity, setQty] = useState(0);

  useEffect(() => {
    setQty(details.quantity || 0)
  }, [details]);

  const alterQty = num => {
    const updatedNum = quantity + num;
    setQty(updatedNum);

    itemsDB.update(details.id, {
      ...details,
      quantity: updatedNum
    });
  }

  return (
    <Box direction="column" fill={true} align="center" justify="between">

      <HugeArrowButtons secondary size="large" icon={<Up />} onClick={() => alterQty(1)} />

      <Box align="center">
        <Number> {quantity}</Number>

        <Header className="header-wrapper">
          {(details && details.name) ? details.name.toUpperCase() : ''}
        </Header>
        {details.date && details.date.toLocaleDateString && details.date.toLocaleDateString("en-US")}

        <Tags tags={details.tags} />
      </Box>

      <HugeArrowButtons secondary size="large" icon={<Down />} onClick={() => alterQty(-1)} />

    </Box>
  );
}

export default withRouter(Item);
{/* <QrCodeWrapper>
                        <QrCode bgColor="transparent" value={id} size={50} />
                      </QrCodeWrapper> */}
