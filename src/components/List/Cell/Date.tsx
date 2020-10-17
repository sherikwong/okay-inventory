import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Box } from 'grommet';
import { useDoubleClick } from '@zattoo/use-double-click';
import BlackOverlay from '../../reusable/BlackOverlay';
import DayPicker from 'react-day-picker';

const DateCell = ({ datum, selectedIDs, updateDatum }) => {
  const dateOpts = { month: 'short', day: 'numeric' };
  const [showDatepicker, toggleDatepicker] = useState(false);

  useEffect(() => {
    if (!selectedIDs.has(datum.id)) {
      toggleDatepicker(false);
    }
  }, [selectedIDs, datum])

  const onDatePicked = date => {
    toggleDatepicker(false);

    updateDatum({
      ...datum,
      date
    });
  }



  const editDate = () => {
    toggleDatepicker(true);
  }

  return (<Box onClick={editDate}>
    <span>{new Date(datum.date).toLocaleDateString("en-US", dateOpts)}</span>

    {showDatepicker && <BlackOverlay percent="90%">
      <DayPicker selectedDays={[datum.date || new Date()]} onDayClick={onDatePicked} />
    </BlackOverlay>}

  </Box>
  );

}
export default DateCell;
