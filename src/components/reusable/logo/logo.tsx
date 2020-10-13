import React from 'react';
import styled from 'styled-components';

interface ILogo {
  url: string;
  size: number;
}

const _Logo = styled.div`
  background-image: url('${({url}: ILogo) => url}');
  background-size: contain;
  background-repeat: no-repeat;
  height: ${({size}: ILogo) => `${size}px`};
  width: ${({size}: ILogo) => `${size}px`};

`;


const Logo = ({size = '100', animated = false}) => {
  const stillUrl = 'https://i.ibb.co/0QxPtMv/Screen-Shot-2020-10-13-at-12-59-11-AM.png';
  const animatedUrl = 'https://s8.gifyu.com/images/okay-animated.gif';

  return (
    <_Logo className="logo" id="logo" size={animated ? '400' : size} url={animated ? animatedUrl : stillUrl}/>
  );
}

export default Logo;
