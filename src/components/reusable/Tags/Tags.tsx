import React, { useState } from "react";

import { Box, TextInput } from "grommet";

import Tag from "./Tag";
import { useEffect } from 'react';
import { ITag, tagsDB } from '../../../database/tags';


const Tags = props => {
  const [allTagsDetails, setAllTags] = useState([...props.tags] || [] as ITag[]);

  useEffect(() => {
    props.tags.forEach(tagId => {
      tagsDB.get(tagId).then((tag: ITag) => {
        setAllTags([...allTagsDetails, tag])

        console.log(allTagsDetails);
      });
    });
  }, [props.tags]);

  // console.log('Rendered', tags);
  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {allTagsDetails.map((tag: ITag) => {
        return (

          <Tag key={tag.id} onRemove={() => undefined}>
            {tag.name}
          </Tag>
        )
      })}
    </Box>
  );
};

export default Tags;

// const TagsInput = ({ suggestions, value, onRemove, onSelect, }) => {
//   const [values, setValues] = useState([...value]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     setValues([...value]);


//   }, [value, suggestions])
//   return (

//     <TextInput
//       placeholder="Select tags"
//       type="search"
//       value={search}
//       onChange={({ target: { value: searchValue } }) => setSearch(searchValue)}
//       onSelect={({ suggestion }) => {
//         setSearch('');
//         onSelect(suggestion);
//       }
//       }
//       suggestions={suggestions}
//     />
//   );
// }

// export default TagsInput;
