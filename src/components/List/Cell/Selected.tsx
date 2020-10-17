import React from 'react';
import { Button, Box } from 'grommet';
import styled from 'styled-components';
import { Checkmark } from '../../../../node_modules/grommet-icons';

interface ISmallButton {
  isSelected: boolean;
}

export const SmallButton = styled(Button) <ISmallButton>`
transform: scale(0.7);
${({ isSelected }) => `opacity: ${isSelected ? 1 : 0}`}
`;

const SelectedCell = ({ datum, selectedIDs }) => {
  return (
    <Box>
      <SmallButton icon={<Checkmark />} isSelected={selectedIDs.has(datum.id)} />
    </Box>
  )
}

export default SelectedCell;
