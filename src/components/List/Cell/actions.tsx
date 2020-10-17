import React from 'react';
import { Box, Button as _Button } from 'grommet';
import { Trash, Checkmark, Next } from 'grommet-icons';
import { itemsDB } from '../../../database/items';
import styled from 'styled-components';

interface IButton {
  isVisible: boolean;
}

const Button = styled(_Button) <IButton>`
${({ isVisible }) => `opacity: ${isVisible ? 1 : 0}`};
padding: 0;
`;

const ActionsCell = props => {
  const { datum, refresh, selectedID, setSelectedID, history } = props;


  const navigateToItem = () => {
    history.push(`/item/${datum.id}`);
  };

  return (
    <Box direction="row">
      {/* <Button icon={<Checkmark />} onClick={() => onSave()} /> */}
      <Button icon={<Next />} onClick={navigateToItem} isVisible={selectedID.has(datum.id)} />
    </Box>
  );
}

export default ActionsCell;
