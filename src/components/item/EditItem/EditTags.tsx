/* eslint-disable @typescript-eslint/no-unused-vars */

import { withRouter } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';
import { ITag, tagsDB } from "../../../database/tags";
import { TextInput, Box, Button, Keyboard, Stack } from 'grommet';
import styled from 'styled-components';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import { Add } from 'grommet-icons'; import Tags from "../../reusable/Tags/Tags";
import { itemsDB } from '../../../database/items';
import { IItem } from '../../../models/items';
import { getAllTags } from '../../reusable/Tags/Tags';

export interface InputSuggestion {
  value: string;
  label: string;
}

export const WhiteBgTextInput = styled(TextInput)`
background-color: rgba(255, 255, 255, .5);
`;

const CenteredBox = styled(Box)`
position: absolute;
top: 50%;
`

const EditTags = props => {
  const { match, details, location: { state }, history } = props;
  const id = match.params.id;
  const [tags, setTags] = useState(new Set([] as string[]));
  const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');
  const [allTags, setAllTags] = useState(new Map([]));
  const [loading, setLoading] = useState(false);

  useEffect(getAllTags(setAllTags), []);

  useEffect(() => {
    setTags(new Set(details ? details.tags : state.details.tags));
  }, [details]);

  const removeExistingTags = () => {
    console.log(allTags);
    return [...allTags.values()].filter(tag => {
      return !tags.has((tag as ITag).id);
    }).map(tag => ({
      label: (tag as ITag).name,
      value: (tag as ITag).id
    }));
  }

  const onType = ({ target: { value: searchValue } }) => {
    setSearch(searchValue);
  }

  const onCustomTag = () => {
    tagsDB.add({
      name: search
    }).then((newTag: ITag) => {
      tags.add(newTag.id);
      allTags.set(newTag.id, newTag);
      itemsDB.update(id, {
        id,
        tags: [...tags] as string[]
      });


    });
  };

  const onSelect = $event => {
    const id = $event.suggestion.value;
    // console.log('Selecting', id);

    const safeTags = [...tags];
    safeTags.push(id);
    setTags(new Set(safeTags));

    updateDBTags(safeTags);
  }

  const updateDBTags = tags => {
    itemsDB.update(id, {
      ...props.details,
      tags: tags
    });

    // props.onUpdate();
  }

  const onRemove = (tag: ITag) => {
    const withRemoved = new Set(tags);
    withRemoved.delete(tag.id);
    setTags(withRemoved);
    updateDBTags([...withRemoved]);
  }

  const navToDate = () => {
    history.push(`/item/${details.id}/edit/date`);
  }

  return (
    <Box justify="start" fill={true}>

      <Box direction="row">
        <Tags tags={tags} onRemove={onRemove} />
      </Box>

      <Keyboard onEnter={onCustomTag}>
        <CenteredBox fill="horizontal" pad="large">

          <Box direction="row">
            <WhiteBgTextInput
              value={search}
              suggestions={removeExistingTags()}
              onSelect={onSelect}
              onChange={onType}
            />

            <Box direction="row" align="center" pad={{ left: 'large' }}>
              {search && <Button icon={<Add />} onClick={onCustomTag} />}
              <SpinnerButton onClick={navToDate} loading={loading} setLoading={setLoading} />
            </Box>
          </Box>
        </CenteredBox>
      </Keyboard>

    </Box>
  );
}

export default withRouter(EditTags);
