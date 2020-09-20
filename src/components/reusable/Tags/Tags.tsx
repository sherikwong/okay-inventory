/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { ITag, tagsDB } from '../../../database/tags';
import Tag from "./Tag";




const Tags = props => {
  const [queriedTags, setQueriedTags] = useState([] as ITag[]);

  useEffect(() => {
    // if (props.tags.size) {
    //   props.tags.forEach(id => {
    //     tagsDB.get(id).then(tag => {
    //       setQueriedTags([...queriedTags, tag]);
    //     });
    //   });
    // } else {
    //   setQueriedTags([]);
    // }
    const tags = [...props.tags].map(id => {
      const entry = props.allTags.get(id);
      console.log(entry);
      return entry;
    });

    setQueriedTags(tags);
    console.log(props.tags);
  }, [props.tags]);



  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {queriedTags.map((tag: ITag) => {
        return (
          <Tag key={tag.id} onRemove={() => {
            props.onRemove(tag);
          }}>
            {tag.name}
          </Tag>
        )
      })}
    </Box>
  );
};

export default Tags;
