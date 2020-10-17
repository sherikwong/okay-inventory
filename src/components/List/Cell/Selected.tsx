import React from 'react';
import { Button, Box } from 'grommet';
import styled from 'styled-components';
import { Checkmark } from '../../../../node_modules/grommet-icons';

interface ISmallButton {
  isSelected: boolean;
}

export const SmallButton = styled(Button)`
transform: scale(0.6);
`;


const GreenButton = styled(Button)<ISmallButton>`
${({ isSelected }) => `opacity: ${isSelected ? 1 : 0}`};
svg {
  stroke: green;
}
`

const SelectedCell = ({ datum, selectedIDs }) => {
  return (
    <Box>
      <GreenButton icon={<Checkmark />} isSelected={selectedIDs.has(datum.id)} />
    </Box>
  )
}

export default SelectedCell;
