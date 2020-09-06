import { Box, Button, TextInput, Heading } from 'grommet';
import { Close, Microphone, Previous } from 'grommet-icons';
import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import DictateButton from 'react-dictate-button';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { categoriesDB } from '../../../database/categories';
import { itemsDB } from '../../../database/items';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import Tags from '../../reusable/Tags/Tags';

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
  svg, button {
    height: 10vh;
    width: 10vh;
  }
`;

const StepHeading = styled(Heading)`
  margin: 10px 0;
`;

enum ItemDetails {
  NAME = 'name',
  CATEGORY = 'category',
  DATE = 'date'
}


export const ServerStatusContext = createContext({});

const EditItem = ({ match }) => {
  const [id, setId] = useState(match.params.id);
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: new Set()
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


  const onStep = direction => {
    let detailsWithTagsAsArray = {
      ...details,
      tags: [...details.tags].filter(el => el)
    };

    let promise = id
      ? itemsDB.update(id, detailsWithTagsAsArray)
      : itemsDB.add(detailsWithTagsAsArray);

    promise.then(res => {
      setLoading(false);
      setStep(direction > 0 ? step + 1 : step - 1);
    }).catch(error => {
      setLoading(false);
    });
  };

  const onDictate = res => {
    if (res) {
      updateDetail(ItemDetails.NAME, res.result.transcript);
    }
  }

  const alterTags = direction => tag => {
    const tags = new Set(details.tags);
    tags[direction > 0 ? 'add' : 'delete'](tag);
    setDetails({
      ...details,
      tags
    });
  };

  const stepsTemplates = [
    { name: 'Name', template: <TextInput value={details.name} onChange={$event => updateDetail(ItemDetails.NAME, $event.target.value)} /> },
    { name: 'Tags', template: <Tags value={details.tags} suggestions={categories} onSelect={alterTags(1)} onRemove={alterTags(-1)} /> },
    // <DateEdit toggleEditModal={() => undefined} value={declose alltails.date} onChange = { date => updateDetail(ItemDetails.DATE, date) } />
  ];

  return (
    <Box direction="column" fill={true}>
      <Box direction="row" justify="between" pad="medium">
        <Button secondary icon={<Previous />} onClick={() => onStep(-1)} />
        <Button secondary icon={<Close />} onClick={() => undefined} />
      </Box>
      <Box pad="large" fill={true} justify="between">

        <Box fill={true} justify="center">
          <StepHeading>{stepsTemplates[step].name}</StepHeading>
          {stepsTemplates[step].template}
        </Box>

        <Box direction="row" justify="between" align="end">
          <Box></Box>

          <DictationButtonWrapper id="dictation-button" onDictate={onDictate}>
            <Microphone />
          </DictationButtonWrapper>

          <SpinnerButton onClick={() => onStep(1)} loading={loading} setLoading={setLoading} />
        </Box>
      </Box>
    </Box>
  );
}

export default withRouter(EditItem);
