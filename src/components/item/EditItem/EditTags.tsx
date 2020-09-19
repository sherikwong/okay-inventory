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

export interface InputSuggestion {
  value: string;
  label: string;
}

const WhiteBgTextInput = styled(TextInput)`
background-color: rgba(255, 255, 255, .5);
`;

const EditTags = props => {
  const { match, incomingTags } = props;
  const id = match.params.id;
  const [tags, setTags] = useState(new Set(incomingTags as string[]));
  const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');
  const [allTags, setAllTags] = useState(new Map([]));
  const [suggestions, setSuggestions] = useState([] as InputSuggestion[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tagsDB.getAll().then(res => {
      // console.log(res);
      const newMap = new Map([]);
      const newSuggestions: InputSuggestion[] = [];

      Object.values(res).forEach(details => {
        newSuggestions.push({ label: details.name, value: details.id });
        newMap.set(details.id, details);
      });
      setSuggestions(newSuggestions);
      setAllTags(newMap)
    });
  }, []);


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

      console.log(tags, allTags);

    });
  };

  const onSelect = $event => {
    const safeTags = [...tags];
    safeTags.push($event.suggestion.value);
    setTags(new Set(safeTags));
  }

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <Stack fill={true}>

      <Box justify="start" fill={true}>

        <Box direction="row">
          <Tags tags={tags} />
        </Box>

      </Box>

      <Box justify="center" fill={true}>
        <Keyboard onEnter={onCustomTag}>

          <WhiteBgTextInput
            value={search}
            suggestions={suggestions}
            onSelect={onSelect}
            onChange={onType}
            icon={
              <Box direction="row" align="center">
                {search && <Button icon={<Add />} onClick={onCustomTag} />}
                <SpinnerButton onClick={() => { }} loading={false} setLoading={setLoading} />
              </Box>
            }
            reverse={true}
          />
        </Keyboard>
      </Box>
    </Stack>
  );
}

export default withRouter(EditTags);
