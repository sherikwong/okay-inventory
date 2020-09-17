import React, { useEffect, useState } from 'react';
import { HugeArrowButtons, Header, QrCodeWrapper, DummyQRCode } from './Item.styles';
import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { QrCode } from 'qrcode.react';
import { withRouter } from 'react-router-dom';
import { Number } from './Item.styles';
import { renderTags } from '../reusable/Tags/Tags';

const Item = (props) => {
  const details = props.details;

  return (
    <Box direction="column" fill={true} align="center">

      <HugeArrowButtons secondary size="large" icon={<Up />} onClick={() => { }} />

      <Box fill={true} align="center">
        <Number> {details.quantity}</Number>

        <Header className="header-wrapper">
          {(details && details.name) ? details.name.toUpperCase() : ''}
        </Header>
        {details.date && details.date.toLocaleDateString && details.date.toLocaleDateString("en-US")}

      </Box>

      <HugeArrowButtons secondary size="large" icon={<Down />} onClick={() => { }} />

    </Box>
  );
}

export default withRouter(Item);
