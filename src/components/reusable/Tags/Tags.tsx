import React, { useState } from "react";

import { Box, TextInput } from "grommet";

import Tag from "./Tag";
import { useEffect } from 'react';

export const renderTags = (tags, onRemove) => {
  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {tags.map((tag, index) => (
        <Tag key={tag} onRemove={() => onRemove(index)}>
          {tag}
        </Tag>
      ))}
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
