import React from 'react';
import { Box as _Box } from 'grommet';
import styled from 'styled-components';

const Box = styled(_Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const BlackOverlay = (props) => {
  return (
    <Box
      {...props}
      id="overlay"
      fill={true}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${
          props.percent ? props.percent : '50%'
        })`,
        ...(props?.style || {}),
      }}
    >
      {props.children}
    </Box>
  );
};

export default BlackOverlay;
