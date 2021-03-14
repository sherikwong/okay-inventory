import { Box } from 'grommet';
import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

const NavBox = ({ history, justify = 'between', children }: any) => {
  return (
    <Box direction="row" justify={justify}>
      <BackButton />
      {children}
    </Box>
  );
};

export default withRouter(NavBox);
