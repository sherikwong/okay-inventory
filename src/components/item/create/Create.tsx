import { Box } from 'grommet';
import React from 'react';
import QrCode from 'qrcode.react';
import uuid from 'react-uuid';

const Create = () => {
  const randomID = uuid();

  return (<Box>
    <QrCode value={randomID}></QrCode>
  </Box>);
};

export default Create;
