import { Button } from 'grommet';
import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { Next } from 'grommet-icons';

const SpinnerButton = ({ onClick, onFinished }) => {
  const [loading, setLoading] = useState(false);

  const _onClick = () => {
    setLoading(true);
    onClick();
  }

  useEffect(() => {
    setLoading(false);
  }, [onFinished])

  const innerButton = (<>
    {loading && <Spinner />}
    {!loading && <Next />}
  </>);

  return (
    <Button secondary onClick={_onClick} children={innerButton} />
  );
};

export default SpinnerButton;
