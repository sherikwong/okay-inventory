import { Box, TextInput } from 'grommet';
import { Microphone } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import DictateButton from 'react-dictate-button';
import uuid from 'react-uuid';
import styled from 'styled-components';

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
`;


const Create = () => {
  const randomID = uuid();
  const [itemName, setItemName] = useState('');

  const onDictate = res => {
    if (res) {
      console.log(res);
      setItemName(res.result.transcript);
    }
  }

  const buttonRef = useRef(null);
  const onClick = event => {
    console.log(event);
    console.log(buttonRef)
  }


  return (
    <Box align="center" justify="center">
      <QrCode
        value={randomID} />
      <Box direction="row" align="center">

        <TextInput value={itemName} />
        <DictationButtonWrapper ref={buttonRef} id="dictation-button" onDictate={onDictate}>
          <Microphone />
        </DictationButtonWrapper>
      </Box>
    </Box>
  );
};

export default Create;
