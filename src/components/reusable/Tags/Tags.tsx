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
    let tempTags = [];
    if (tags) {
      const retrievedTags: any = [...tags].map(id => {
        const entry = (allTags).get(id);
        return entry;
      }).filter(tag => tag);

      if (retrievedTags.length) {
        tempTags = retrievedTags;
      }
    }
    setQueriedTags(tempTags);
  }, [allTags, tags]);

  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {queriedTags && queriedTags.map((tag, i) => {

        return <Tag key={tag.id} onRemove={onRemove ? () =>
          onRemove(tag) : undefined}>
          {tag.name}
        </Tag>
      })}
    </Box>
  );
};

export default Tags;
