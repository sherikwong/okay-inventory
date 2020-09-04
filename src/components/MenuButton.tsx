import { Button, Nav, Sidebar } from 'grommet';
import React from 'react';
import { Menu } from 'grommet-icons'


const MenuButton = () => (
  <>
    <Button primary icon={<Menu />} size="large" margin="medium" />
  </>
);

export default MenuButton;
