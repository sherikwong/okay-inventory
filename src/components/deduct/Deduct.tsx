import { Box } from 'grommet';
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const Deduct = () => {
  const [translation, setTrans] = useState('');

  const onScan = (qrTranslation: string | null) => {
    if (qrTranslation) {
      setTrans(qrTranslation);
    }
  }

  return (
    <Box>
      <QrReader onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />
    </Box>
  );
}

export default Deduct;
