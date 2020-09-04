import { Box } from 'grommet';
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import OverlayLoaderContext from '../../contexts/main-loader';

const Deduct = ({ history }) => {
  const [translation, setTrans] = useState('');





  return (
    <OverlayLoaderContext.Consumer>
      {({ loadOverlay, setLoadOverlay }) => {

        const onScan = (qrTranslation: string | null) => {
          if (qrTranslation) {
            setTrans(qrTranslation as string);
            setLoadOverlay && setLoadOverlay(true);
            // history.push(`/item`);
          }
        }

        return (
          <Box>
            <QrReader onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />
          </Box>
        );
      }}
    </OverlayLoaderContext.Consumer>
  );
}

export default withRouter(Deduct);

