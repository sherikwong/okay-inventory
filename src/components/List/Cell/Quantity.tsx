import { Box, Button } from 'grommet';
import React from 'react';
import { Swipeable } from "react-swipeable";
import { useDoubleClick } from '../../../../node_modules/@zattoo/use-double-click/lib';
import { Up, Down } from 'grommet-icons';
import styled from 'styled-components';

const DirectionArrows = styled(Button)`
padding: 0;
transform: scale(0.5);
padding-left: 5px;
`;

const QuantityCell = ({ datum, updateDatum, toggleEditMode }) => {
  const alterQty = (num, quan = datum.quantity) => () => {
    const sanitizedQuantity = isNaN(+quan) ? 0 : +quan;

    const updatedNum = sanitizedQuantity + +num;

    updateDatum({
      ...datum,
      quantity: updatedNum
    });
  };

  return (
    // <Box onClick={useDoubleClick(_toggleEditMode)}>
    //   <Swipeable onSwipedUp={alterQty(1)} onSwipedDown={alterQty(-1)}>
    <Box direction="row" align="center">
      <span>{datum.quantity || 0}</span>
      <Box>
        <DirectionArrows icon={<Up />} onClick={alterQty(1)} />
        <DirectionArrows icon={<Down />} onClick={alterQty(-1)} />
      </Box>
    </Box>
  );
}
export default QuantityCell;
