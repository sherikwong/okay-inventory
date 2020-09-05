import { Box, Button, Layer } from 'grommet';
import { Close, Previous } from 'grommet-icons';
import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Categories from './Categories';
import NameInput from './Name';
import DateEdit from './Date';

enum ItemDetails {
  NAME = 'name',
  CATEGORY = 'category',
  DATE = 'date'
}

const EditItem = ({ setCategoriesModal, showCategoriesModal }) => {
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


  const stepsTemplates = [
    <NameInput onStep={onStep} value={details.name} onChange={value => updateDetail(ItemDetails.NAME, value)} />,
    <Categories onStep={onStep} value={details.category} onChange={value => updateDetail(ItemDetails.CATEGORY, value)} />,
    <DateEdit setCategoriesModal={setCategoriesModal} value={details.date} onChange={date => updateDetail(ItemDetails.DATE, date)} />
  ];

  return (
    // showCategoriesModal &&
    (
      <Layer >
        <Box direction="column" fill={true}>
          <Box direction="row" justify="between" pad="medium">
            <Button secondary icon={<Previous />} />
            <Button secondary icon={<Close />} onClick={() => setCategoriesModal(false)} />
          </Box>

          {stepsTemplates[step]}

        </Box>
      </Layer>
    ));
}

export default EditItem;
