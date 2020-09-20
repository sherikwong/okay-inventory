/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { ITag, tagsDB } from '../../../database/tags';
import Tag from "./Tag";




const Tags = ({ tags, allTags, onRemove }) => {
  const [queriedTags, setQueriedTags] = useState([] as ITag[]);

  useEffect(() => {
    console.log(tags);
    // if (tags.size) {
    //   tags.forEach(id => {
    //     tagsDB.get(id).then(tag => {
    //       setQueriedTags([...queriedTags, tag]);
    //     });
    //   });
    // } else {
    //   setQueriedTags([]);
    // }
    const retrievedTags = [...tags].map(id => {
      const entry = allTags.get(id);
      return entry;
    });

    setQueriedTags(retrievedTags);
  }, [tags]);



  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {queriedTags.map((tag: ITag) => {
        return (
          <Tag key={tag.id} onRemove={() => {
            onRemove(tag);
          }}>
            {tag.name}
          </Tag>
        )
      })}
    </Box>
  );
};

export default Tags;
