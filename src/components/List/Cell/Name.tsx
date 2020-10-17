import { TextInput, Box } from 'grommet';
import React, { useState } from 'react';
import { Swipeable } from 'react-swipeable';

const NameCell = ({ datum, updateDatum, selectedIDs, history }) => {
  const [name, setName] = useState(datum.name);

  const navigateToItem = () => {
    history.push(`/item/${datum.id}`);
  };

  const updateName = ({ target }) => {
    const name = target.value;

    setName(name);

    updateDatum({
      ...datum,
      name
    }, false)
  };

  const clickEdit = event => {
    event.stopPropagation();
  }

  return (
    <Swipeable onSwipedRight={navigateToItem}>
      <Box onClick={clickEdit}>
        <TextInput placeholder="Name" onChange={updateName} value={name} />
      </Box>
    </Swipeable>
  );
}
export default NameCell;
