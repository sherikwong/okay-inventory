import { Box, Button, Calendar, Heading, TextInput } from 'grommet';
import { Close, Microphone, Previous, Menu } from 'grommet-icons';
import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import DictateButton from 'react-dictate-button';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { itemsDB } from '../../../database/items';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import TagsInput, { renderTags } from '../../reusable/Tags/Tags';
import { IItem } from '../../../models/items';
import { tagsDB, ITag } from '../../../database/tags';

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
  TAG = 'tags',
  DATE = 'date'
}


export const ServerStatusContext = createContext({});

const EditItem = ({ match, history }) => {
  const [id, setId] = useState(match && match.params && match.params.id ? match.params.id : '');
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([] as { [id: string]: ITag }[]);
  const [loading, setLoading] = useState(false);
  const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');

  const [details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: new Set([] as any)
  });


  useEffect(() => {
    if (id) {
      itemsDB.get(id).then(res => {
        setDetails({ ...details, ...res });
      });
    }

    tagsDB.getAll().then(res => {
      setTags(res as any);
      console.log(res);
    });
  }, []);

  const updateDetail = (detailType: ItemDetails, val) => {
    const updated: IItem = {
      ...details,
      [detailType]: val
    };

    setDetails(updated as any);
  }


  const onStep = (direction) => {
    let promise = id
      ? itemsDB.update(id, details as IItem)
      : itemsDB.add(details as IItem);

    promise.then(res => {
      setLoading(false);
      direction && setStep(direction > 0 ? step + 1 : step - 1);
    }).catch(error => {
      setLoading(false);
    });
  };

  const onDictate = res => {
    setDictating(false);

    if (res && res.result) {
      updateDetail(ItemDetails.NAME, res.result.transcript);
    }
  }

  const onDictationToggle = $event => {
    setDictating(!isDictating);
  }

  const alterTags = (tag, direction)  => {
    const tags = new Set([...details.tags]);

    tags[direction > 0 ? 'add' : 'delete'](tag.value);

    setDetails({
      ...details,
      tags
    });

    console.log(tags);
  };

  const onSelectDate = dateString => {
    setDetails({
      ...details,
      date: new Date(dateString)
    });

    history.push('/');
  }

  const stepsTemplates = [
    { name: 'Name', template: <TextInput value={details.name} onChange={$event => updateDetail(ItemDetails.NAME, $event.target.value)} /> },
    {
      name: 'Tags', template:
        <TextInput
          value={search}
          suggestions={Object.entries(tags).map(([key, value]) => ({
            label: value.name,
            value: key
          }))}
          onSelect={$event => {
            console.log($event.suggestion);
            alterTags($event.suggestion, 1);
          }}
        />
    },
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
    <Box direction="column" fill={true} id="edit-item">
      <Box direction="row" justify="between" pad="medium">
        {step > 0
          ? <Button secondary icon={<Previous />} onClick={() => onStep(-1)} />
          : <Button secondary icon={<Menu />} onClick={$event => history.push('/')} />
        }
        <Button secondary icon={<Close />} onClick={() => history.push(id ? `/item/${id}` : '/')} />
      </Box>

      <Box pad="large" fill={true} justify="between">
        {/* {(step === 1 && details.tags) && renderTags(details.tags)} */}


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
