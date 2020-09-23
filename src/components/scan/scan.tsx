import React from 'react';
import { QrCodeWrapper } from '../item/Item.styles';
import { QrCode } from 'qrcode.react';
import { Box } from 'grommet';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import './scan.scss';
import { itemsDB } from '../../database/items';

const Scan = props => {
  const { history } = props;
  const onScan = (qrTranslation: string | null) => {
    if (qrTranslation) {
      itemsDB.get(qrTranslation).then(item => {
        if (item) {
          history.push(`/item`);
        }
      })
    }
  }


  return (
    <QrReader style={{ height: '100%' }} className="container" onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />


  );
}

export default withRouter(Scan);
