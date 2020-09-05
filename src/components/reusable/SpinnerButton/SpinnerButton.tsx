import { Button } from 'grommet';
import Spinner from '../Spinner';
import React from 'react';
import { useState, useEffect } from 'react';

const SpinnerButton = (onClick, suceeds, fails, icon) => {
  const [loading, setLoading] = useState(false);

  const _onClick = () => {
    setLoading(true);
    onClick();
  }

  useEffect(() => {
    setLoading(false);
  }, [suceeds, fails])

  return (
    <Button secondary onClick={_onClick}>
      {loading && <Spinner />}

      {icon}
    </Button>
  );
};

export default SpinnerButton;
