import { Button } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import './CloseButton.scss';
const CloseButton = ({ onClick }) => {
  return (
    <>
      <Button className="close-button" primary icon={<Close />} onClick={() => onClick()} />
    </>
  );
}

export default CloseButton;
