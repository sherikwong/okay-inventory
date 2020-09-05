import { Box, TextInput } from 'grommet';
import { Microphone, Next } from 'grommet-icons';
import React from 'react';
import DictateButton from 'react-dictate-button';
import styled from 'styled-components';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import { ServerStatusContext, IServerContext, ServerReponse } from './EditItem';


const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
`;

const NameInput = ({ value = '', onChange, onStep }) => {

  const onDictate = res => {
    console.log(res);
    if (res) {
      onChange(res.result.transcript);
    }
  }

  return (<></>);
}

export default NameInput;
