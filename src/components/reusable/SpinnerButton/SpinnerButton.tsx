/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from 'grommet';
import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { Next } from 'grommet-icons';
import styled from 'styled-components';
// import { ContrastingButton } from '../../Item/Item.styles';

const SpinnerButton = ({ onClick, loading, setLoading, icon = Next }) => {
  const innerButton = (<>
    {loading && <Spinner />}
    {!loading && React.createElement(icon)}
  </>);

  const _onClick = () => {
    setLoading(true);
    onClick();
  }

  return (
    <></>
    // <ContrastingButton secondary onClick={_onClick} children={innerButton} />
  );
};

export default SpinnerButton;
