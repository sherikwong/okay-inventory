import { Box, Button, Layer } from 'grommet';
import { Close, Previous } from 'grommet-icons';
import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { categoriesDB } from '../../../database/models/categories';
import Categories from './Categories';
import NameInput from './Name';

enum ItemDetails {
  NAME = 'name',
  CATEGORY = 'category',
  DATE = 'date'
}

const EditItem = ({ setCategoriesModal, showCategoriesModal }) => {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState([]);
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


  // Load Categories
  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  const stepsTemplates = [
    <NameInput onStep={onStep} value={details.name} onChange={value => updateDetail(ItemDetails.NAME, value)} />,
    <Categories value={details.category} onChange={value => updateDetail(ItemDetails.CATEGORY, value)} />,
    <DayPicker onDayClick={date => updateDetail(ItemDetails.DATE, date)} />
  ];

  return (
    // showCategoriesModal &&
    (
      <Layer >
        <Box direction="column" justify="between" fill={true}>
          <Box direction="row" justify={!step ? 'end' : 'between'} pad="medium">
            {step === 1 && (<Button secondary icon={<Previous />} />)}
            <Button secondary icon={<Close />} onClick={() => setCategoriesModal(false)} />
          </Box>

          {stepsTemplates[step]}

        </Box>
      </Layer>
    ));
}

export default EditItem;
