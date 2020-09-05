import { Button } from 'grommet';
import React, { useState } from 'react';
import Spinner from '../Spinner';
import { Next } from 'grommet-icons';

const SpinnerButton = ({ onClick, suceeds, fails }) => {
  const [loading, setLoading] = useState(false);

  const _onClick = () => {
    setLoading(true);
    onClick();
  }

  // useEffect(() => {
  //   setLoading(false);
  // }, [suceeds, fails])

  const innerButton = (<>
    {loading && <Spinner />}
    <Next />
  </>);

  return (
    <Button secondary onClick={_onClick} children={innerButton} />
  );
};

export default SpinnerButton;
