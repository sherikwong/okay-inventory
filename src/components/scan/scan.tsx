import React from 'react';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import { itemsDB } from '../../database/items';
import './scan.scss';
import { List, Menu } from 'grommet-icons';
import { Button } from 'grommet';
import styled from 'styled-components';

const MenuButton = styled(Button)`
position: absolute;
top: 0;
left: 0;
`;

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

  const goToMenu = () => {
    history.push('/list');
  }


  return (
    <>
    <QrReader style={{ height: '100%' }} className="container" onScan={onScan} onError={() => undefined} onImageLoad={() => undefined} onLoad={() => undefined} />
    {/* <MenuButton icon={<Menu/>} onClick={goToMenu}/> */}
    </>
  );
}

export default withRouter(Scan);
