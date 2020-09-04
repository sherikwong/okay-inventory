import React, { Component } from "react";
import { Box, Text, Stack, Paragraph, Heading } from "grommet";
import Spinner from "./Spinner";
import styled from 'styled-components';

const WhiteOverlayBox = styled(Box)`
background-color: rgba(255, 255, 255, .6);
`;

export default (props) => (
  <Stack anchor="center">
    {props.children}
    {props.show && <WhiteOverlayBox pad="medium" round="medium">
      <Spinner />
    </WhiteOverlayBox>
    }
  </Stack>
);
