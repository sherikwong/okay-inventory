import { LinkUp, LinkDown } from 'grommet-icons';
import styled from 'styled-components';
import React from 'react';
import BlackOverlay from '../../reusable/BlackOverlay';

const BouncingArrowOverlay = props => {
  const { direction } = props;

  const BouncingArrow = styled(direction > 0 ? LinkUp : LinkDown)`
    font-size: 30vh;
    stroke: white;
    height: 30vh;
    width: 30vh;
  `;


  return (
    <BlackOverlay percent=".9" {...props}>

      <BouncingArrow className="animate__animated animate__slideInDown" />

    </BlackOverlay>
  );

};

export default BouncingArrowOverlay;

