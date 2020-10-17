import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Box, Button } from 'grommet';
import { useDoubleClick } from '@zattoo/use-double-click';
import BlackOverlay from '../../reusable/BlackOverlay';
import DayPicker from 'react-day-picker';
import { Close } from '../../../../node_modules/grommet-icons';

const DateCell = ({ datum, selectedIDs, updateDatum }) => {
  const dateOpts = { month: 'short', day: 'numeric' };
  const [showDatepicker, toggleDatepicker] = useState(false);

  useEffect(() => {
    console.log(showDatepicker);
  }, [showDatepicker])

  const onDatePicked = date => {
    toggleDatepicker(false);

    updateDatum({
      ...datum,
      date
    });
  }

  const closeDatepicker = () => {
    toggleDatepicker(false);
  }



  const editDate = () => {
    toggleDatepicker(true);
  }

  return (<Box onClick={editDate}>
    <span>{new Date(datum.date).toLocaleDateString("en-US", dateOpts)}</span>

    {showDatepicker &&
    // <BlackOverlay percent="90%">

      // <Button icon={<Close />} onClick={closeDatepicker} />
      <DayPicker selectedDays={[datum.date || new Date()]} onDayClick={onDatePicked} />
    // </BlackOverlay>
  }

  </Box>
  );

}
export default DateCell;
