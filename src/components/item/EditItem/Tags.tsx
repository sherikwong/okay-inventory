import { withRouter } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import { ITag } from "../../../database/tags";
import { TextInput } from 'grommet';

const Tags = props => {
  const details = props.details;
  const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([] as { [id: string]: ITag }[]);

  return (
    <TextInput
      value={search}
      suggestions={Object.entries(tags).map(([key, value]) => ({
        label: value.name,
        value: key
      }))}
      onSelect={$event => {
        console.log($event.suggestion);
        // alterTags($event.suggestion, 1);
      }}
    />
  );
}

export default withRouter(Tags);
