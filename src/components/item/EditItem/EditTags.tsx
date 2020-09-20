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

export const WhiteBgTextInput = styled(TextInput)`
background-color: rgba(255, 255, 255, .5);
`;

const CenteredBox = styled(Box)`
position: absolute;
top: 50%;
`

const EditTags = props => {
  const { match, details } = props;
  const id = match.params.id;
  const [tags, setTags] = useState(new Set([] as string[]));
  const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');
  const [allTags, setAllTags] = useState(new Map([]));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tagsDB.getAll().then(res => {
      const newMap = new Map([]);

      Object.values(res).forEach(details => {
        newMap.set(details.id, details);
      });
      setAllTags(newMap);
    });
  }, []);

  useEffect(() => {
    setTags(new Set(details.tags));
  }, [details]);


  const removeExistingTags = () => {
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
    console.log('Selecting', id);

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

    props.onUpdate();
  }

  const onRemove = (tag: ITag) => {
    const withRemoved = new Set(tags);
    withRemoved.delete(tag.id);
    setTags(withRemoved);
    updateDBTags([...withRemoved]);
  }

  return (
    <Box justify="start" fill={true}>

      <Box direction="row">
        <Tags tags={tags} allTags={allTags} onRemove={onRemove} />
      </Box>

      <CenteredBox fill="horizontal" pad="large">
        <Keyboard onEnter={onCustomTag}>

          <WhiteBgTextInput
            value={search}
            suggestions={removeExistingTags()}
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
      </CenteredBox>

    </Box>
  );
}

export default withRouter(EditTags);
