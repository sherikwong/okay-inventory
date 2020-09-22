import React from 'react';
import { WhiteBgTextInput } from '../../item/EditItem/EditTags';
import { Box } from 'grommet';
import { useState } from 'react';

const ListNameFilter = props => {
  const { onFilter } = props;
  const [search, setSearch] = useState('');

  const onType = ({ target: { value: searchValue } }) => {
    setSearch(searchValue);
    onFilter({ name: searchValue });
  }
  return (
    <>
      <Box pad={{ left: 'large', right: 'large' }}>
        <WhiteBgTextInput
          value={search}
          onChange={onType}
          placeholder="Name"
        />
      </Box>
    </>
  )
}

export default ListNameFilter;
