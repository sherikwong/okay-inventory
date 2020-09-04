import { Box, Stack } from "grommet";
import React from "react";
import styled from 'styled-components';
import Spinner from "./Spinner";

const WhiteOverlayBox = styled(Box)`
background-color: rgba(255, 255, 255, .6);
`;

export default (props) => (
  <Stack anchor="center" fill={true} id="overlay-stack">
    {props.children}
    {props.show && <WhiteOverlayBox pad="medium" round="medium">
      <Spinner />
    </WhiteOverlayBox>
    }
  </Stack>
);
