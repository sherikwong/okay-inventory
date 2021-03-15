import { Box, Button, Nav, Sidebar } from 'grommet';
import { Analytics, Camera, Close, Menu } from 'grommet-icons';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

const buttons = {
  '/models': Analytics,
  '/': Camera,
};

const NavBox = ({ history, justify = 'between', children }: any) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Box direction="row" justify={justify}>
        <Box direction="row">
          <BackButton />
          <Button icon={<Menu />} onClick={() => setShowDrawer(true)} />
        </Box>
        {children}
      </Box>

      {showDrawer && (
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
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
        </div>
      )}
    </>
  );
};

export default withRouter(NavBox);
