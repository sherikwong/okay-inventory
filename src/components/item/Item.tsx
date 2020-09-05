import { } from 'firebase';
import { Box, Button, Card, CardBody, CardFooter, Stack, TextInput } from 'grommet';
import { Checkmark, Close, Microphone, MoreVertical } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import DictateButton from 'react-dictate-button';
import Unsplash from 'react-unsplash-wrapper';
import uuid from 'react-uuid';
import styled from 'styled-components';
import OverlayLoaderContext from '../../contexts/main-loader';

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
`;


const Item = () => {
  const randomID = uuid();
  const [itemName, setItemName] = useState('');
  const [showCategoriesModal, setCategoriesModal] = useState(false);
  const [category, setCategory] = useState();
  const [details, setDetails] = useState({
    name: '',
    date: '',
    category: ''
  });


  const onDictate = res => {
    if (res) {
      setItemName(res.result.transcript);
      console.log(itemName);
    }
  }



  const onFinishedDetails = selected => {

  }

  const buttonRef = useRef(null);

  const onClickShowModal = boolean => () => {
    setCategoriesModal(boolean);
  }

  return (
    <OverlayLoaderContext.Consumer>
      {({ loadOverlay, setLoadOverlay }) => {

        const onAttemptSave = () => {
          setLoadOverlay && setLoadOverlay(true);
        };

        return (<>

          <Box direction="row" justify="between">


            <Button secondary onClick={onAttemptSave} icon={<Checkmark />}></Button>

            <Button secondary icon={<Close />}></Button>


          </Box>

          <CardBody pad="medium">
            <Card height="medium" width="medium">

              <Stack fill={true}>
                <Box
                  align="end" fill={true} justify="end">

                  {itemName && <Unsplash keywords={itemName} img />}

                  <Box pad="medium">
                    <QrCode value={randomID} />
                  </Box>
                </Box>

              </Stack>

            </Card>
          </CardBody>

          <CardFooter direction="row" align="center" justify="center" background="light-2">

            <Box pad="medium">
              <TextInput value={itemName} onChange={onInputChange} />
            </Box>


            <DictationButtonWrapper ref={buttonRef} id="dictation-button" onDictate={onDictate}>
              <Microphone />
            </DictationButtonWrapper>

            <Button secondary onClick={onClickShowModal(true)} icon={<MoreVertical />}>
            </Button>


            {/* <EditItem setCategoriesModal={setCategoriesModal} showCategoriesModal={showCategoriesModal} /> */}


          </CardFooter>




        </>
        );
      }}
    </OverlayLoaderContext.Consumer>
  );
};

export default Item;
