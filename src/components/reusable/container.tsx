import { Box } from 'grommet';
import React from 'react';

export const Container = ({ children }) => {
  return (
    <Box
      border={{ color: 'brand', size: 'small' }}
      pad="medium"
    >
      {children}
    </Box>
  );
};

export default {};
