import React, { useState } from "react";

import { Box, TextInput } from "grommet";

import Tag from "./Tag";

const renderTags = (tags, onRemove) => {
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

const Tags = ({ suggestions, value, onRemove, onSelect }) => {
  const [values, setValues] = useState([]);
  const [search, setSearch] = useState('');

  return (
    <Box
      wrap={true}
      direction="row"
      align="center"
      border="all"
      round="xsmall"
      pad="xxsmall"
    >
      {values.length > 0 && renderTags(values, onRemove)}
      <Box
        alignSelf="stretch"
        align="start"
        flex={true}
        style={{ minWidth: "240px" }}
      >
        <TextInput
          plain={true}
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
      </Box>
    </Box>
  );
}

export default Tags;
