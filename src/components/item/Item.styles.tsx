import styled from 'styled-components';
import { Button, Box } from 'grommet';
import Unsplash from 'react-unsplash-wrapper';

export const ContrastingText = styled.span`
mix-blend-mode: difference;
font-weight: 700;
color: white;
font-size: 30px;
`;

export const Number = styled.span`
  mix-blend-mode: difference;
  font-weight: 700;
  margin: 0 0 0 10px;
  font-size: 200px;
  line-height: 200px;
  color: white;
  // filter: drop-shadow(.05em .05em black);
  text-align: center;
`;
export const Header = styled.span`
  mix-blend-mode: difference;
  font-weight: 700;
  margin: 0 0 0 10px;
  font-size: 70px;
  line-height: 70px;
  color: white;
  // filter: drop-shadow(.05em .05em black);
  text-align: center;
`;

export const ContrastingButton = styled(Button)`
padding: 10px;
border-radius: 10px;
svg {
  stroke: white;
  mix-blend-mode: difference;
}
`;

export const HugeArrowButtons = styled(Button)`
height: 10vh;
width: 10vh;
display: flex;
align-content: center;

svg {
  stroke: white;
  mix-blend-mode: difference;
    height: 6vh;
    width: 6vh;
  }

`;

export const QrCodeWrapper = styled.div`
  height: 50px;
  width: 50px;
  padding: 4px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, .7);
`;
export const DummyQRCode = styled.div`
  height: 50px;
  width: 50px;
  padding: 4px;
`;



export const SizedUnsplash = styled(Unsplash)`
&, div {
  height : 100vh;
  width: 100vh;
  }
`;

