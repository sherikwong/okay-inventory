import React, { useState } from 'react';
import DictateButton from 'react-dictate-button';
import styled from 'styled-components';
import { Microphone } from 'grommet-icons';

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
  svg, button {
    transition: .2s;
    height: 10vh;
    width: 10vh;
  }

  &.active svg {
    stroke: #00C781;
  }
`;

const DictationButton = ({ }) => {
  const [isDictating, setDictating] = useState(false);
  const onDictate = res => {
    setDictating(false);

    if (res && res.result) {
      // updateDetail(ItemDetails.NAME, res.result.transcript);
    }
  }


  const onDictationToggle = $event => {
    setDictating(!isDictating);


    return (
      <DictationButtonWrapper id="dictation-button" onDictate={onDictate} onClick={onDictationToggle} className={isDictating ? 'active' : ''}>
        <Microphone />
      </DictationButtonWrapper>
    );
  }
}

export default DictationButton;
