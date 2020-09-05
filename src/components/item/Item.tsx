import { } from 'firebase';
import { Box, Button, Stack, Heading, Card, CardBody } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import QrCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import Unsplash from 'react-unsplash-wrapper';
import uuid from 'react-uuid';
import OverlayLoaderContext from '../../contexts/main-loader';
import EditItem from './EditItem/EditItem';



const Item = () => {
  const randomID = uuid();
  const details = {
    name: 'Chicken Thighs',
    date: new Date(),
    category: 'protein'
  }

  const itemName = details.name;

  const [showEditModal, toggleEditModal] = useState(false);


  const buttonRef = useRef(null);

  const onClickShowModal = boolean => () => {
    toggleEditModal(boolean);
  }

  return (
    <OverlayLoaderContext.Consumer>
      {({ loadOverlay, setLoadOverlay }) => {

        const onAttemptSave = () => {
          setLoadOverlay && setLoadOverlay(true);
        };

        return (<>

          <Stack fill={true}>

            {itemName && <Unsplash keywords={itemName} img />}
            <Box align="end" fill={true} justify="end">
              <Card background="light-1" margin="medium">
                <CardBody
                  pad="medium" direction="row">
                  <QrCode value={randomID} />

                  <Box direction="column">
                    <Heading margin={{ left: 'medium' }}>{itemName}</Heading>
                    {details.date.toLocaleDateString("en-US")}
                    {details.category}
                  </Box>
                </CardBody>
              </Card>
            </Box>


          </Stack>







          <Button secondary onClick={onClickShowModal(true)} icon={<MoreVertical />}>
          </Button>


          <EditItem toggleEditModal={toggleEditModal} showEditModal={showEditModal} />


        </>
        );
      }}
    </OverlayLoaderContext.Consumer>
  );
};

export default Item;
