import { Box } from 'grommet';
import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { itemsDB } from '../../database/items';
import NavBox from '../reusable/NavBox/NavBox';
import './scan.scss';

const Error = styled.div`
  z-index: 1000;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  width: 100%;
`;

const getAnimationClass = (direction) =>
  `animate__animated animate__slide${direction}`;
const IN_UP = 'InUp';
const OUT_DOWN = 'OutDown';

const Scan = (props) => {
  const { history } = props;
  const [hasError, setError] = useState(false);
  const [errorTransitionClass, setTransClass] = useState(getAnimationClass(''));

  const onScan = (qr: string | null) => {
    setError(false);

    if (qr) {
      const domains = [
        window.location.href,
        'https://sherikwong.com/',
        'https://okay-inventory.herokuapp.com/',
      ];
      let currentDomain = domains.find((domain) => qr.includes(domain));

      const withoutHost = qr.replace(`${currentDomain}`, '');
      const id = withoutHost.replace('item/', '');

      itemsDB.get(id).then((item) => {
        if (item) {
          history.push(`/item/${id}`);
        } else {
          setError(true);
        }
      });
    }
  };

  useEffect(() => {
    setTransClass(getAnimationClass(hasError ? IN_UP : OUT_DOWN));
  }, [hasError]);

  return (
    <>
      <QrReader
        style={{ height: '100%' }}
        className="container"
        onScan={onScan}
        onError={() => console.log('Hi')}
        onImageLoad={() => console.log('Hi')}
        onLoad={() => console.log('Hi')}
      />

      <Error className={errorTransitionClass}>
        <Box pad="medium">Try again</Box>
      </Error>
    </>
  );
};

export default withRouter(Scan);
