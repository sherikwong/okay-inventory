import { TextInput } from 'grommet';
import React from 'react';



const NameCell = ({ datum, updateDatum }) => {
  const updateName = ({target}) => {
    updateDatum({
      ...datum,
      name: target.value
    }, false)
  };

  return datum.isNewItem ? (
    <TextInput placeholder="Name" onChange={updateName}/>
  ) : <span>{datum.name || 'N/A'}</span>;
}
export default NameCell;
