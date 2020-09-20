/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { ITag, tagsDB } from '../../../database/tags';
import Tag from "./Tag";




const Tags = ({ tags, allTags, onRemove }) => {
  const [queriedTags, setQueriedTags] = useState([] as ITag[]);

  useEffect(() => {
    console.log(tags, allTags);
    const retrievedTags = [...tags].map(id => {
      const entry = allTags.get(id);
      return entry;
    });

    setQueriedTags(retrievedTags);
  }, [tags, allTags]);

  useEffect(() => {
    console.log(queriedTags);
  }, [queriedTags])

  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {queriedTags && queriedTags.length && queriedTags.map((tag, i) => {
        return tag ? (
          <Tag key={tag.id} onRemove={() => {
            onRemove(tag);
          }}>
            {tag.name}
          </Tag>)
          : <div key={i} />
      })}
    </Box>
  );
};

export default Tags;
