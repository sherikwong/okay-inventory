import { Box, Button, Layer } from 'grommet';
import { Close, Previous } from 'grommet-icons';
import React, { useState, SetStateAction, Context } from 'react';
import 'react-day-picker/lib/style.css';
import Categories from './Categories';
import DateEdit from './Date';
import NameInput from './Name';
import { createContext, Dispatch } from 'react';
import { itemsDB } from '../../../database/items';
import { IItem } from '../../../models/items';
import { withRouter } from 'react-router';

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

const EditItem = (props) => {
  const { toggleEditModal, showEditModal } = props;
  const [step, setStep] = useState(0);

  const [id, setId] = useState('');
  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    category: ''
  });

  const updateDetail = (detailType: ItemDetails, val) => {

    setDetails({
      ...details,
      [detailType]: val
    });
  }

  const [status, toggleServerReponse] = useState(undefined);

  const onStep = direction => {
    console.log('Stepping');
    if (!id) {
      itemsDB.add(details);
    } else {

    }

    setStep(direction > 0 ? step + 1 : step - 1);
  };



  const stepsTemplates = [
    <NameInput onStep={onStep} value={details.name} onChange={value => updateDetail(ItemDetails.NAME, value)} />,
    <Categories onStep={onStep} value={details.category} onChange={value => updateDetail(ItemDetails.CATEGORY, value)} />,
    <DateEdit toggleEditModal={toggleEditModal} value={details.date} onChange={date => updateDetail(ItemDetails.DATE, date)} />
  ];

  return (
    // showEditModal &&
    (
      <ServerStatusContext.Provider value={{ status, toggleServerReponse }}>

        <Layer >
          <Box direction="column" fill={true}>
            <Box direction="row" justify="between" pad="medium">
              <Button secondary icon={<Previous />} onClick={() => onStep(-1)} />
              <Button secondary icon={<Close />} onClick={() => toggleEditModal(false)} />
            </Box>

            {stepsTemplates[step]}

          </Box>
        </Layer>

      </ServerStatusContext.Provider>
    ));
}

export default withRouter(EditItem);
