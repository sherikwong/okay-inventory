import { withRouter } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import { ITag, tagsDB } from "../../../database/tags";
import { TextInput, Box, Button, Keyboard } from 'grommet';
import styled from 'styled-components';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import { Add } from 'grommet-icons'; import Tags from "../../reusable/Tags/Tags";

const WhiteBgTextInput = styled(TextInput)`
background-color: rgba(255, 255, 255, .5);
`;

const EditTags = props => {
  const details = props.details;
  const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState(new Set([] as string[]));
  const [loading, setLoading] = useState(false);

  const onType = ({ target: { value: searchValue } }) => {
    setSearch(searchValue);
  }

  const onCustomTag = () => {
    tagsDB.add({
      name: search
    }).then((newTag: ITag) => {
      tags.add(newTag.id);


    });
  }

  return (
    <Box direction="row">
      <Tags tags={tags} />

      {/* <Box direction="row" fill="horizontal"> */}
      <Keyboard onEnter={onCustomTag}>
        <WhiteBgTextInput
          value={search}
          suggestions={Object.entries(tags).map(([key, value]) => ({
            label: value.name,
            value: key
          }))}
          onSelect={$event => {
            console.log($event.suggestion);
            // alterTags($event.suggestion, 1
          }}
          onChange={onType}
          icon={
            <Box direction="row" align="center">
              {search && <Button icon={<Add />} onClick={onCustomTag} />}
              <SpinnerButton onClick={() => { }} loading={false} setLoading={setLoading} />
            </Box>
          }
          reverse={true}
        />
      </Keyboard><form action=""></form>
      {/* </Box> */}

    </Box>
  );
}

export default withRouter(EditTags);
