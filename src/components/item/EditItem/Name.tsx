import React, { useState, useEffect } from 'react';
import { Box, TextInput } from 'grommet';
import { WhiteBgTextInput } from './EditTags';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import { itemsDB } from '../../../database/items';
import { withRouter } from 'react-router-dom';

const Name = props => {
  const { details, onUpdate, history } = props;
  const [name, setName] = useState('Name');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(details.name);
  }, [details]);


  const onType = $event => {
    setName($event.target.value);
  }

  const onSubmit = () => {
    itemsDB.update(details.id, {
      ...details,
      name
    }).then(res => {
      setLoading(false);
    }).then(res => {
      history.push(`/item/${details.id}/edit/tags`);
    })

  }

  return (
    <Box fill={true} justify="center" pad="large" direction="row">
      <WhiteBgTextInput
        value={name}
        onChange={onType} />
      <Box pad={{ left: 'medium' }}>
        <SpinnerButton onClick={onSubmit} loading={loading} setLoading={setLoading} />
      </Box>
    </Box>
  )
};

export default withRouter(Name);
