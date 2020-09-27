import React, { createContext } from "react";
import styled from 'styled-components';
import { routes, IRoute } from '../../App';

export const NavContext = createContext({} as IRoute);

const Container = styled.div`
  display: flex;
  justify-content: between;
`

const Navigation = props => {
  return (
    <Container id="navigation-container" />
  );
};

export default Navigation;
