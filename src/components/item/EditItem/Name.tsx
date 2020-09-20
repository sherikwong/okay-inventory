import React, { useState, useEffect } from 'react';
import { Box, TextInput } from 'grommet';
import { WhiteBgTextInput } from './EditTags';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import { itemsDB } from '../../../database/items';

const Name = props => {
  const { details, onUpdate, history } = props;
  const [name, setName] = useState('Name');

  useEffect(() => {
    setName(details.name);
  }, [details]);


  const onType = $event => {
    setName($event.target.value);
  }

  const onSubmit = () => {
    console.log('Submit', name);
    itemsDB.update(details.id, {
      ...details,
      name
    });

    onUpdate();

    history.push(`/item/${details.id}/edit/tags`);
  }

  return (
    <Box fill={true} justify="center" pad="large" direction="row">
      <WhiteBgTextInput
        value={name}
        onChange={onType} />
      <Box pad={{ left: 'medium' }}>
        <SpinnerButton onClick={onSubmit} loading={false} setLoading={false} />
      </Box>
    </Box>
  )
};

export default Name;
