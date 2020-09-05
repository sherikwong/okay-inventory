import { Box, Button, TextInput } from 'grommet';
import { Microphone, Previous, Next } from 'grommet-icons';
import React from 'react';
import DictateButton from 'react-dictate-button';
import styled from 'styled-components';


const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
`;

const NameInput = ({ value = '', onChange, onStep }) => {

  const onDictate = res => {
    if (res) {
      onChange(res.result.transcript);
    }
  }

  return (
    <Box pad="large" fill={true}>

      <TextInput value={value} onChange={$event => onChange($event.target.value)} />

      <Box direction="row" justify="center">

        <DictationButtonWrapper id="dictation-button" onDictate={onDictate}>
          <Microphone />
        </DictationButtonWrapper>

        <Button secondary icon={<Next />} onClick={() => onStep(1)} />

      </Box>
    </Box>
  );
}

export default NameInput;
