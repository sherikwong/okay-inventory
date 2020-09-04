import { Button } from 'grommet';
import { Menu, Filter } from 'grommet-icons';
import React from 'react';

const buttons = [
  {
    icon: Menu,
    onClick: () => undefined
  },
  {
    icon: Filter,
    onClick: () => undefined
  }
]

const NavButtons = () => (
  <>
    {buttons.map(button => <Button primary icon={React.createElement(button.icon)} size="large" margin="medium" />)}
  </>
);

export default NavButtons;
