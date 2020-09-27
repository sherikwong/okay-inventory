import React, { createContext, createFactory } from "react";
import styled from 'styled-components';
import { INavButton, IRoute } from '../../App';

export interface INavButtons {
  top?: INavButton[];
  bottom?: INavButton[];
}

export interface INavContext {
  setButtons: any;
  buttons: INavButtons;
}

export const NavContext = createContext({} as INavContext);

const Container = styled.div`
  display: flex;
  justify-content: between;
`

const Navigation = ({ direction }) => {
  return (
    <NavContext.Consumer>
      {({ setButtons, buttons }) => {
        console.log(buttons);

        return (
          <Container className="navigation-container">
            {buttons && buttons[direction] && buttons[direction].map(button => createFactory(button.icon))}
          </Container>

        );
      }
      }

    </NavContext.Consumer>
  );
};

export default Navigation;
