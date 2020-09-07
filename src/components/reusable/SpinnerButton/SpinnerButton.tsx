import { Button } from 'grommet';
import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { Next } from 'grommet-icons';

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
    <Button secondary onClick={_onClick} children={innerButton} />
  );
};

export default SpinnerButton;
