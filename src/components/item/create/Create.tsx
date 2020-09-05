import { } from 'firebase';
import { Button, Card, CardBody, CardFooter, Layer, Stack, TextInput } from 'grommet';
import { Checkmark, Close, Microphone, MoreVertical } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import DictateButton from 'react-dictate-button';
import Unsplash from 'react-unsplash-wrapper';
import uuid from 'react-uuid';
import styled from 'styled-components';
import OverlayLoaderContext from '../../../contexts/main-loader';
import CategoryModal from './Category/Category';

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
`;


const Create = () => {
  const randomID = uuid();
  const [itemName, setItemName] = useState('');
  const [showCategoriesModal, setCategoriesModal] = useState(false);
  const [category, setCategory] = useState();


  const onDictate = res => {
    if (res) {
      setItemName(res.result.transcript);
      console.log(itemName);
    }
  }

  const onInputChange = $event => {
    setItemName($event.target.value);
  }

  const onSelectCategory = selected => {
    setCategory(selected);
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
          <CardBody>
            <Card height="medium" width="medium">

              <Stack>
                <QrCode
                  value={randomID} />
                {itemName && <Unsplash keywords={itemName} img />}
              </Stack>

            </Card>
          </CardBody>

          <CardFooter direction="row" align="center" justify="center" background="light-1orga
          2" pad="large">

            <TextInput value={itemName} onChange={onInputChange} />


            <DictationButtonWrapper ref={buttonRef} id="dictation-button" onDictate={onDictate}>
              <Microphone />
            </DictationButtonWrapper>

            <Button secondary onClick={onAttemptSave} icon={<Checkmark />}></Button>
            <Button secondary icon={<Close />}></Button>
            <Button secondary onClick={onClickShowModal(true)} icon={<MoreVertical />}>
            </Button>


              <CategoryModal setCategoriesModal={setCategoriesModal} showCategoriesModal={showCategoriesModal}/>


          </CardFooter>




        </>
        );
      }}
    </OverlayLoaderContext.Consumer>
  );
};

export default Create;
