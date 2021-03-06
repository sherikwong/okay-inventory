import { Box } from 'grommet';
import React from 'react';

interface IContainerProps {
  children: any;
  style?: any;
}

export const Container = ({ children, style }: IContainerProps) => {
  return (
    <Box border={{ color: 'brand', size: 'small' }} pad="medium" style={style}>
      {children}
    </Box>
  );
};

export default {};
