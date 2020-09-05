import { Box, Button, Layer } from 'grommet';
import { Close, Previous } from 'grommet-icons';
import React, { useState } from 'react';
import 'react-day-picker/lib/style.css';
import Categories from './Categories';
import DateEdit from './Date';
import NameInput from './Name';

enum ServerReponse {
  Succeeds,
  Fails
}

enum ItemDetails {
  NAME = 'name',
  CATEGORY = 'category',
  DATE = 'date'
}

const EditItem = ({ toggleEditModal, showEditModal }) => {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({
    name: '',
    date: new Date().toISOString(),
    category: ''
  });

  const updateDetail = (detailType: ItemDetails, val) => {
    console.log(val);

    setDetails({
      ...details,
      [detailType]: val
    });
  }

  const onStep = direction => {
    setStep(direction > 0 ? step + 1 : step - 1)
  };

  const [serverResponse, setServerReponse] = useState(undefined);


  const stepsTemplates = [
    <NameInput onStep={onStep} value={details.name} onChange={value => updateDetail(ItemDetails.NAME, value)} />,
    <Categories onStep={onStep} value={details.category} onChange={value => updateDetail(ItemDetails.CATEGORY, value)} />,
    <DateEdit toggleEditModal={toggleEditModal} value={details.date} onChange={date => updateDetail(ItemDetails.DATE, date)} />
  ];

  return (
    // showEditModal &&
    (
      <Layer >
        <Box direction="column" fill={true}>
          <Box direction="row" justify="between" pad="medium">
            <Button secondary icon={<Previous />} />
            <Button secondary icon={<Close />} onClick={() => toggleEditModal(false)} />
          </Box>

          {stepsTemplates[step]}

        </Box>
      </Layer>
    ));
}

export default EditItem;
