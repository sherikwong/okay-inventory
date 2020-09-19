/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

import { Box, TextInput } from "grommet";

import Tag from "./Tag";
import { ITag, tagsDB } from '../../../database/tags';
import { InputSuggestion } from "../../Item/EditItem/EditTags";


const Tags = props => {
  const [queriedTags, setQueriedTags] = useState([] as ITag[]);


  useEffect(() => {
    props.tags.forEach(id => {
      tagsDB.get(id).then(tag => {
        setQueriedTags([...queriedTags, tag]);
      });
    });

  }, [props.tags]);

  useEffect(() => {
    console.log(queriedTags);
  }, [queriedTags])


  return (
    <Box align="center" direction="row" wrap={true} pad={{ left: "xsmall" }}>
      {queriedTags.map((tag: ITag) => {
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
