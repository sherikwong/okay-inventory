import { Layer, List, DateInput, Box, Button } from 'grommet';
import React, { useState } from 'react';
import { categoriesDB } from '../../../../database/models/categories';
import CloseButton from '../../../reusable/CloseButton/CloseButton';
import { Next, Previous } from '../../../../../node_modules/grommet-icons';
import { Close } from 'grommet-icons';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DetailsModal = ({ setCategoriesModal, showCategoriesModal }) => {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState([]);

  const [details, setDetails] = useState({
    date: new Date().toISOString(),
    category: ''
  });

  const onClickCategory = ({ target }) => {
    const category = target.innerHTML;

    setDetails({
      ...details,
      category
    });

    setStep(1);
  };

  const onDateInput = date => {
    setDetails({
      ...details,
      date
    })

    setCategoriesModal(false);
  };

  const onStep = num => () => {
    setStep(num > 0 ? step + 1 : step - 1);
  };

  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  return (
    showCategoriesModal && (
      <Layer>
        <Box direction="column" justify="between">
          <Box direction="row" justify={!step ? 'end' : 'between'} pad="medium">
            {step === 1 && (<Button secondary icon={<Previous />} onClick={onStep(-1)} />)}
            <Button secondary icon={<Close />} onClick={() => setCategoriesModal(false)} />
          </Box>


          {!step && (<List data={categories} onClickItem={onClickCategory} />)}


          {step === 1 && (
            <Box pad="medium">
              <DayPicker
                onDayClick={onDateInput}
              />
            </Box>
          )}
        </Box>
      </Layer>
    ));
}

export default DetailsModal;
