import React from 'react';
import { Box, Button } from 'grommet';
import { Trash, Checkmark, Next } from 'grommet-icons';
import { itemsDB } from '../../../database/items';

const ActionsCell = ({ datum, refresh, onSave, selectedID, setSelectedID, history }) => {
  const deleteItem = () => {
    itemsDB.delete(datum.id);
    refresh();
  }

  const navigateToItem = () => {
      history.push(`/item/${datum.id}`);
  };

  return datum.id === selectedID ? (
    <Box direction="row">
      {datum.isNewItem
        ? <Button icon={<Checkmark />} onClick={() => onSave()} />
        : (
          <>
            <Button icon={<Trash />} onClick={deleteItem} />
            <Button icon={<Next />} onClick={deleteItem} />
          </>
        )
      }
    </Box>
  ) : (<></>);
}

export default ActionsCell;
