import { Box, Button, Calendar, Heading, TextInput } from 'grommet';
import { Close, Microphone, Previous } from 'grommet-icons';
import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import DictateButton from 'react-dictate-button';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { categoriesDB } from '../../../database/categories';
import { itemsDB } from '../../../database/items';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import Tags, { renderTags } from '../../reusable/Tags/Tags';

// const CalendarWithTopMargin = styled(Calendar)

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
  svg, button {
    transition: .2s;
    height: 10vh;
    width: 10vh;
  }

  &.active svg {
    stroke: #00C781;
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
  const [isDictating, setDictating] = useState(false);
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


  const onStep = (direction) => {
    let promise = id
      ? itemsDB.update(id, details)
      : itemsDB.add(details);

    promise.then(res => {
      setLoading(false);
      direction && setStep(direction > 0 ? step + 1 : step - 1);
    }).catch(error => {
      setLoading(false);
    });
  };

  const onDictate = res => {
    setDictating(false);
    console.log(res);

    if (res && res.result) {
      updateDetail(ItemDetails.NAME, res.result.transcript);
    }
  }

  const onDictationToggle = $event => {
    setDictating(!isDictating);
  }

  const alterTags = direction => tag => {
    const tags = new Set(details.tags);
    tags[direction > 0 ? 'add' : 'delete'](tag);
    setDetails({
      ...details,
      tags
    });
  };

  const onSelectDate = dateString => {
    setDetails({
      ...details,
      date: new Date(dateString)
    });

    onStep(0);
  }

  const stepsTemplates = [
    { name: 'Name', template: <TextInput value={details.name} onChange={$event => updateDetail(ItemDetails.NAME, $event.target.value)} /> },
    { name: 'Tags', template: <Tags value={details.tags} suggestions={categories} onSelect={alterTags(1)} onRemove={alterTags(-1)} /> },
    {
      name: 'Date', template: <Calendar
        margin={{ top: 'xlarge' }}
        size="medium"
        date={(details.date && details.date.toISOString ? details.date : new Date()).toISOString()}
        onSelect={onSelectDate}
      />
    }
  ];

  return (
    <Box direction="column" fill={true}>
      <Box direction="row" justify={step > 0 ? 'between' : 'end'} pad="medium">
        {step > 0 && <Button secondary icon={<Previous />} onClick={() => onStep(-1)} />}
        <Button secondary icon={<Close />} onClick={() => undefined} />
      </Box>
      <Box pad="large" fill={true} justify="between">
        {(step === 1 && details.tags) && renderTags([...details.tags], alterTags(-1))}


        <Box fill={true} justify="center">
          <Box pad={{ bottom: '25vh' }}>

            <StepHeading>{stepsTemplates[step].name}</StepHeading>

            <Box direction="row" align="center">
              {stepsTemplates[step].template}

              {step !== 2 && <Box pad={{ left: 'medium' }}>
                <SpinnerButton onClick={() => onStep(1)} loading={loading} setLoading={setLoading} />
              </Box>}
            </Box>
          </Box>
        </Box>

        <Box direction="row" justify="center" align="end">
          <DictationButtonWrapper id="dictation-button" onDictate={onDictate} onClick={onDictationToggle} className={isDictating ? 'active' : ''}>
            <Microphone />
          </DictationButtonWrapper>
        </Box>
      </Box>
    </Box>
  );
}

export default withRouter(EditItem);


// https://loading.io/pattern/m-wave
