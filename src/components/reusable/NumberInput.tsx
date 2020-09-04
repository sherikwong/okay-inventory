import React, { useState } from 'react';
import { Box, TextInput, Button } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';
import { useEffect } from 'react';

const NumberInput = ({ onChange }) => {
  const [num, setNum] = useState(0);

  const onArrowClick = (step: number) => {
    setNum(step > 0 ? num + 1 : num - 1);
  }

  useEffect(() => {
    onChange(num);
  }, [num])

  return (
    <Box direction="row">
      <TextInput value={num} />
      <Box direction="column">
        <Button primary icon={<FormUp />} onClick={() => onArrowClick(1)}></Button>
        <Button primary icon={<FormDown />} onClick={() => onArrowClick(-1)}></Button>
      </Box>
    </Box>
  );
}

export default NumberInput;
