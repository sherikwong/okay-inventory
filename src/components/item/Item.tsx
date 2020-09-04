import { Box, Heading } from 'grommet';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import NumberInput from '../reusable/NumberInput';

const Item = () => {
  const [itemName, setItemName] = useState('Beans');

  const onChange = newNum => {
    console.log(newNum);
  };

  return (
    <Box fill={true} align="center" justify="center">
      <Heading> {itemName}</Heading>
      <NumberInput onChange={onChange} />
    </Box>
  );
}

export default withRouter(Item);
