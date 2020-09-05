import { Box, Button, Layer, List, TextInput } from 'grommet';
import { Close, Previous } from 'grommet-icons';
import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { categoriesDB } from '../../../database/models/categories';

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

  console.log(ItemDetails);

  // Load Categories
  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  const updateDetail = (detailType: ItemDetails, val) => () => {
    setDetails({
      ...details,
      [detailType]: val
    });


    setStep(1);
  }

  const steps = {
    [ItemDetails.NAME]: (
      <TextInput value={details.name} onChange={$event => updateDetail(ItemDetails.NAME, $event.target.value)} />
    ),
    [ItemDetails.CATEGORY]: (
      <List data={categories} onClickItem={$event => updateDetail(ItemDetails.CATEGORY, $event.target.innerHTML)} />
    ),
    [ItemDetails.DATE]: (
      <DayPicker onDayClick={date => updateDetail(ItemDetails.DATE, date)} />
    )
  };

  return (
    showCategoriesModal && (
      <Layer>
        <Box direction="column" justify="between">
          <Box direction="row" justify={!step ? 'end' : 'between'} pad="medium">
            {step === 1 && (<Button secondary icon={<Previous />} />)}
            <Button secondary icon={<Close />} onClick={() => setCategoriesModal(false)} />
          </Box>



        </Box>
      </Layer>
    ));
}

export default EditItem;
