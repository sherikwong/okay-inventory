import { Box } from 'grommet';
import React, { useEffect, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { itemsDB } from '../../../database/items';

export const WhiteBgBox = styled(Box)`
background-color: rgba(255, 255, 255, .5);
`;

const EditDate = props => {
  const { details, history } = props;
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(details.date);
  }, [details]);

  const onChange = clickedDate => {
    itemsDB.update(details.id, {
      ...details,
      date: clickedDate
    });

    history.push(`/item/${details.id}`);
  }

  return (
    <WhiteBgBox>
      <DayPicker selectedDays={[date]} onDayClick={onChange} />
    </WhiteBgBox>
  );

}

export default withRouter(EditDate);
