import { Button, Card, CardBody, CardFooter, Stack, TextInput } from 'grommet';
import { Checkmark, Close, Microphone } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import DictateButton from 'react-dictate-button';
import Unsplash from 'react-unsplash-wrapper';
import uuid from 'react-uuid';
import styled from 'styled-components';
import OverlayLoaderContext from '../../../contexts/main-loader';
import { } from 'firebase';
import { itemsDB } from '../../../database/models/items';

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

  itemsDB.on('value', snapshot => {
    console.log(snapshot);
  })


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
