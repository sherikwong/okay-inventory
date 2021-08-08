import { Box, Button, Nav, Sidebar } from 'grommet';
import { Analytics, Camera, Close, Menu } from 'grommet-icons';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../../App.routes';
import BackButton from '../BackButton/BackButton';

const ContrastingButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  svg {
    stroke: white;
    mix-blend-mode: difference;
  }
`;

const buttons = {
  '/models': Analytics,
  '/': Camera,
};

const NavBox = ({ history, justify = 'between', children }: any) => {

  return (
    <>
      <Box direction="row" justify={justify} margin="medium">
        <Box direction="row">
          <BackButton />
          <Button icon={<Menu />} onClick={() => history.push(`/${Routes.LIST}`)} />
          <Button icon={<Camera/>} onClick={() => history.push('/')} />
        </Box>
        {children}
      </Box>

    </>
  );
};

export default withRouter(NavBox);
