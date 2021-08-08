import { Box } from 'grommet';
import React, { useState } from 'react';


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

      </Box>
    </>
  )
}

export default ListNameFilter;
