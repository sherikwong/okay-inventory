import { Box, Button } from 'grommet';
import React from 'react';
import { Up, Down } from 'grommet-icons';
import styled from 'styled-components';

const DirectionArrows = styled(Button)`
padding: 0;
transform: scale(0.5);
padding-left: 5px;
`;

const QuantityCell = ({ datum, updateDatum, toggleEditMode, selectedID }) => {
  const alterQty = (num, quan = datum.quantity) => () => {
    const sanitizedQuantity = isNaN(+quan) ? 0 : +quan;

    const updatedNum = sanitizedQuantity + +num;

    updateDatum({
      ...datum,
      quantity: updatedNum
    });
  };

  return (
    <Box direction="row" align="center">
      <span>{datum.quantity || 0}</span>
      {selectedID === datum.id && <Box>
        <DirectionArrows icon={<Up />} onClick={alterQty(1)} />
        <DirectionArrows icon={<Down />} onClick={alterQty(-1)} />
      </Box>}
    </Box>
  );
}
export default QuantityCell;
