import React, { useState, MutableRefObject } from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Heading, TextInput } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';
import { usePrev } from '../../utils/hooks';
import OverlayLoader from '../reusable/OverlayLoader';

const Item = () => {
  const [num, setNum] = useState(0);
  const [itemName, setItemName] = useState('Beans');

  const onArrowClick = (step: number) => {
    setNum(step > 0 ? num + 1 : num - 1);
  }

  return (
    <Box fill={true} align="center" justify="center">
      <Heading> {itemName}</Heading>
      <Box direction="row">
        <TextInput value={num} />
        <Box direction="column">
          <Button primary icon={<FormUp />} onClick={() => onArrowClick(1)}></Button>
          <Button primary icon={<FormDown />} onClick={() => onArrowClick(-1)}></Button>
        </Box>
      </Box>
    </Box>
  );
}

export default withRouter(Item);
