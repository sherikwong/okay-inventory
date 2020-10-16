import React from 'react';
import { Box, Button } from 'grommet';
import { Trash } from 'grommet-icons';
import { itemsDB } from '../../../database/items';

const ActionsCell = ({ datum, refresh }) => {
  const deleteItem = () => {
    itemsDB.delete(datum.id);
    refresh(0);
  }

  return (
    <Box direction="row">
      <Button icon={<Trash />} onClick={deleteItem} />
    </Box>
  );
}

export default ActionsCell;
