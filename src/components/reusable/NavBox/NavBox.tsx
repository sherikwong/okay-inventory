import { Box, Button, Nav, Sidebar } from 'grommet';
import { Analytics, Camera, Close, Menu } from 'grommet-icons';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
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
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Box direction="row" justify={justify} margin="medium">
        <Box direction="row">
          <BackButton />
          <Button icon={<Menu />} onClick={() => setShowDrawer(true)} />
        </Box>
        {children}
      </Box>

      {showDrawer && (
        <ContrastingButtonContainer>
          <Sidebar background="brand" round="small" margin="medium">
            <Nav gap="small">
              <Button
                icon={<Close />}
                hoverIndicator
                onClick={() => setShowDrawer(false)}
              />
              {Object.entries(buttons).map(([route, Icon]) => (
                <Button
                  icon={<Icon />}
                  onClick={() => history.push(route)}
                  hoverIndicator
                />
              ))}
            </Nav>
          </Sidebar>
        </ContrastingButtonContainer>
      )}
    </>
  );
};

export default withRouter(NavBox);
