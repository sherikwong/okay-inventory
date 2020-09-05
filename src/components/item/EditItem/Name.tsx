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

  return onChange && onStep ? (
    <ServerStatusContext.Consumer>
      {(context: IServerContext) => {

        const suceeds = context.status === ServerReponse.Succeeds;
        const fails = context.status === ServerReponse.Fails;

        return (
          <Box pad="large" fill={true}>

            <TextInput value={value} onChange={$event => onChange($event.target.value)} />

            <Box direction="row" justify="center">

              <DictationButtonWrapper id="dictation-button" onDictate={onDictate}>
                <Microphone />
              </DictationButtonWrapper>

              <SpinnerButton onClick={() => onStep(1)} suceeds={suceeds} fails={fails} />

            </Box>
          </Box>
        )
      }}
    </ServerStatusContext.Consumer>
  ) : (<></>);
}

export default NameInput;
