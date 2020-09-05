import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import OverlayLoaderContext from '../../contexts/main-loader';
import './Deduct.scss';


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
          <QrReader style={{ height: '100%' }} className="container" onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />
        );
      }}
    </OverlayLoaderContext.Consumer>
  );
}

export default withRouter(Deduct);

