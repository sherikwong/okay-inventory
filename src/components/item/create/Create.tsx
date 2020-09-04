import { Box, TextInput, Stack, Card, CardFooter, CardBody, Button } from 'grommet';
import { Microphone, Checkmark, Close } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import DictateButton from 'react-dictate-button';
import uuid from 'react-uuid';
import styled from 'styled-components';
import Unsplash from 'react-unsplash-wrapper'
import OverlayLoaderContext from '../../../contexts/main-loader';

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
    <OverlayLoaderContext.Consumer>
      {({ loadOverlay, setLoadOverlay }) => {

        const onAttemptSave = () => {
          setLoadOverlay && setLoadOverlay(true);
        };

        return (<>
          <CardBody>
            <Card height="medium" width="medium">

              <Stack>
                <QrCode
                  value={randomID} />
                {itemName && <Unsplash keywords={itemName} img />}
              </Stack>

            </Card>
          </CardBody>

          <CardFooter direction="row" align="center" justify="center" background="light-2" pad="large">
            <TextInput value={itemName} />
            <DictationButtonWrapper ref={buttonRef} id="dictation-button" onDictate={onDictate}>
              <Microphone />
            </DictationButtonWrapper>

            <Button secondary onClick={onAttemptSave} icon={<Checkmark />}></Button>
            <Button secondary icon={<Close />}></Button>

          </CardFooter>
        </>
        );
      }}
    </OverlayLoaderContext.Consumer>
  );
};

export default Create;
