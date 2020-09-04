import React, { useState, MutableRefObject } from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Heading, TextInput } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';
import { usePrev } from '../../utils/hooks';
import OverlayLoader from '../reusable/OverlayLoader';
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
