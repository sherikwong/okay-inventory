import { Box } from 'grommet';
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

const Deduct = ({ history }) => {
  const [translation, setTrans] = useState('');

  const onScan = (qrTranslation: string | null) => {
    // if (qrTranslation) {
    setTrans(qrTranslation as string);
    history.push(`/item`);
    // }
  }

  return (
    <Box>
      <QrReader onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />
    </Box>
  );
}

export default withRouter(Deduct);
