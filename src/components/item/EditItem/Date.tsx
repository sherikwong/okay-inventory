import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DateEdit = ({ value, onChange, setCategoriesModal }) => {
  return (
    <DayPicker selectedDays={[value]} onDayClick={date => {
      onChange(date);
      setCategoriesModal(false)
    }} />
  );

}

export default DateEdit;
