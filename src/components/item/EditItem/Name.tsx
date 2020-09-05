import { Box, TextInput } from 'grommet';
import { Microphone, Next } from 'grommet-icons';
import React from 'react';
import DictateButton from 'react-dictate-button';
import styled from 'styled-components';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';


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

        <SpinnerButton secondary icon={<Next />} onClick={() => onStep(1)} />

      </Box>
    </Box>
  );
}

export default NameInput;
