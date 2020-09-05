import { Box, Button, TextInput, List } from 'grommet';
import { Close, Microphone, Previous } from 'grommet-icons';
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import DictateButton from 'react-dictate-button';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { categoriesDB, CATEGORIES } from '../../../database/categories';
import { itemsDB } from '../../../database/items';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import Tags from '../../reusable/Tags/Tags';

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
`;

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
  const [categories, setCategories] = useState([]);

  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: ['']
  });


  useEffect(() => {
    itemsDB.get(id).then(res => {
      setDetails({ ...details, ...res });
    });

    categoriesDB.once('value', res => {
      const unordered = res.val();
      const ordered = unordered.sort();

      setCategories(ordered);
    });
  }, []);

  const updateDetail = (detailType: ItemDetails, val) => {
    setDetails({
      ...details,
      [detailType]: val
    });
  }

  const [status, toggleServerReponse] = useState(undefined);
  const succeeds = status === ServerReponse.Succeeds;
  const fails = status === ServerReponse.Fails;


  const onStep = direction => {
    if (!id) {
      itemsDB.add(details);
    } else {
      itemsDB.update(id, details);
    }

    setStep(direction > 0 ? step + 1 : step - 1);
  };

  const onDictate = res => {
    console.log(res);
    if (res) {
      updateDetail(ItemDetails.NAME, res.result.transcript);
    }
  }

  const addTags = tag => {
    console.log(tag);
    const draftTags = [...details.tags, tag];
    setDetails({
      ...details,
      tags: draftTags
    })
  };

  const stepsTemplates = [
    (<Box pad="large" fill={true}>

      <TextInput value={details.name} onChange={$event => updateDetail(ItemDetails.NAME, $event.target.value)} />

      <Box direction="row" justify="center">

        <DictationButtonWrapper id="dictation-button" onDictate={onDictate}>
          <Microphone />
        </DictationButtonWrapper>

        <SpinnerButton onClick={() => onStep(1)} suceeds={succeeds} fails={fails} />

      </Box>
    </Box>),

    (
      <Box pad="large" fill={true}>
        <Tags value={details.tags} suggestions={categories} onSelect={newTag => addTags(newTag)} onRemove={() => undefined} />
      </Box>
    ),
    // <DateEdit toggleEditModal={() => undefined} value={declose alltails.date} onChange = { date => updateDetail(ItemDetails.DATE, date) } />
  ];

  return (
    <Box direction="column" fill={true}>
      <Box direction="row" justify="between" pad="medium">
        <Button secondary icon={<Previous />} onClick={() => onStep(-1)} />
        <Button secondary icon={<Close />} onClick={() => undefined} />
      </Box>

      {stepsTemplates[step]}

    </Box>
  );
}

export default withRouter(EditItem);
