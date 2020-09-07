import React, { useState } from "react";

import { Box, TextInput } from "grommet";

import Tag from "./Tag";
import { useEffect } from 'react';
import { ITag } from '../../../database/tags';

interface ITagsCollection {
  [key: string]: ITag;
}

export const renderTags = (tags: ITagsCollection, onRemove?) => {
  console.log(tags);
  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {tags && Object.entries(tags).map((entry, index) => {

        return (

          <Tag key={entry[0]} onRemove={onRemove ? () => onRemove(index) : undefined}>
            {/* {ent/ry[1]['name']} */}
          </Tag>
        )
      })}
    </Box>
  );
};

const Tags = ({ suggestions, value, onRemove, onSelect, }) => {
  const [values, setValues] = useState([...value]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setValues([...value]);
  }, [value])

  return (

    <TextInput
      placeholder="Select tags"
      type="search"
      value={search}
      onChange={({ target: { value: searchValue } }) => setSearch(searchValue)}
      onSelect={({ suggestion }) => {
        setSearch('');
        onSelect(suggestion);
      }
      }
      suggestions={suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(search.toLowerCase()) >= 0
      )}
    />
  );
}

export default Tags;
