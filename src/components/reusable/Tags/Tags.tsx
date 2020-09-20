/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { ITag, tagsDB } from '../../../database/tags';
import Tag from "./Tag";

export const getAllTags = setAllTags => () => {
  tagsDB.getAll().then(res => {
    const newMap = new Map([]);

    Object.values(res).forEach(details => {
      newMap.set(details.id, details);
    });
    setAllTags(newMap);
  });
}

const Tags = props => {
  const { tags, onRemove } = props;
  const [queriedTags, setQueriedTags] = useState([] as ITag[]);
  const [allTags, setAllTags] = useState(new Map([]));

  useEffect(getAllTags(setAllTags), [tags]);

  useEffect(() => {
    const retrievedTags = [...tags].map(id => {
      const entry = (allTags).get(id);
      return entry;
    });

    setQueriedTags(retrievedTags as any);
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
