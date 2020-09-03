import React, { useState, SetStateAction, Dispatch } from 'react';
import QrReader from 'react-qr-reader'
import { Box } from 'grommet';

const Deduct = () => {
  const [translation, setTranslation]: [string, Dispatch<SetStateAction<string>>] = useState('');

  const onScan = (qrTranslation: string | null) => {
    if (qrTranslation) {
      setTranslation(qrTranslation);
    }
  }

  return (
    <Box>
      <QrReader onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />
    </Box>
  );
}

export default Deduct;
