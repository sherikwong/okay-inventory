import { Box, Button } from 'grommet';
import { Close, Previous } from 'grommet-icons';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router';
import { itemsDB } from '../../../database/items';
import Categories from './Categories';
import DateEdit from './Date';
import NameInput from './Name';

export enum ServerReponse {
  Succeeds,
  Fails
}

enum ItemDetails {
  NAME = 'name',
  CATEGORY = 'category',
  DATE = 'date'
}

export interface IServerContext {
  status?: ServerReponse;
  toggleStatus?: Dispatch<SetStateAction<ServerReponse>>;
}

export const ServerStatusContext = createContext({});

const EditItem = ({ match }) => {
  const [id, setId] = useState(match.params.id);
  const [step, setStep] = useState(0);

  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    category: ''
  });
  {

    itemsDB.get(id).then(res => {
      setDetails({ ...details, ...res });
    });
  };


  const updateDetail = (detailType: ItemDetails, val) => {
    setDetails({
      ...details,
      [detailType]: val
    });
  }

  const [status, toggleServerReponse] = useState(undefined);

  const onStep = direction => {
    if (!id) {
      itemsDB.add(details);
    } else {

    }

    setStep(direction > 0 ? step + 1 : step - 1);
  };


  const stepsTemplates = [
    <NameInput onStep={onStep} value={details.name} onChange={value => updateDetail(ItemDetails.NAME, value)} />,
    <Categories onStep={onStep} value={details.category} onChange={value => updateDetail(ItemDetails.CATEGORY, value)} />,
    <DateEdit toggleEditModal={() => undefined} value={details.date} onChange={date => updateDetail(ItemDetails.DATE, date)} />
  ];

  return (
    <ServerStatusContext.Provider value={{ status, toggleServerReponse }}>

      <Box direction="column" fill={true}>
        <Box direction="row" justify="between" pad="medium">
          <Button secondary icon={<Previous />} onClick={() => onStep(-1)} />
          <Button secondary icon={<Close />} onClick={() => undefined} />
        </Box>

        {stepsTemplates[step]}

      </Box>

    </ServerStatusContext.Provider>
  );
}

export default withRouter(EditItem);
