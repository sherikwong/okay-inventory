import React from 'react';
import { Box, Button } from 'grommet';
import { Trash, Checkmark, Next } from 'grommet-icons';
import { itemsDB } from '../../../database/items';

const ActionsCell = props => {
  const { datum, refresh, onSave, selectedID, setSelectedID, history } = props;


  const navigateToItem = () => {
    history.push(`/item/${datum.id}`);
  };

  return selectedID.has(datum.id) ? (
    <Box direction="row">
      {datum.isNewItem
        ? <Button icon={<Checkmark />} onClick={() => onSave()} />
        : (
          <>
            <Button icon={<Next />} onClick={navigateToItem} />
          </>
        )
      }
    </Box>
  ) : (<></>)

}

export default ActionsCell;
