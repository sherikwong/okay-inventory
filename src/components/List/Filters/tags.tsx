/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import { ITag } from '../../../database/tags';

import Tags, { getAllTags } from '../../reusable/Tags/Tags';

const ListTagsFilter = props => {
  const { onFilter } = props;
  const [tags, setTags] = useState(new Set([] as string[]));
  // const [isDictating, setDictating] = useState(false);
  const [search, setSearch] = useState('');
  const [allTags, setAllTags] = useState(new Map([]));
  const [loading, setLoading] = useState(false);

  useEffect(getAllTags(setAllTags), []);

  // useEffect(() => {
  //   setTags(new Set(details ? details.tags : state.details.tags));
  // }, [details]);

  const removeExistingTags = () => {
    return [...allTags.values()].filter(tag => {
      return !tags.has((tag as ITag).id);
    }).map(tag => ({
      label: (tag as ITag).name,
      value: (tag as ITag).id
    }));
  }

  const onType = ({ target: { value: searchValue } }) => {
    setSearch(searchValue);
  }

  const onSelect = $event => {
    const id = $event.suggestion.value;

    const safeTags = new Set(tags);
    safeTags.add(id);
    console.log('Selecting', safeTags);
    setTags(safeTags);
    onFilter({ tags: safeTags });

  }

  const onRemove = (tag: ITag) => {
    const withRemoved = new Set(tags);
    withRemoved.delete(tag.id);
    setTags(withRemoved);
    onFilter({ tags: withRemoved });
  }

  return (
    <Box justify="start" fill="horizontal" pad={{
      left: 'large',
      right: 'large'
    }
    }>

      <Box pad={{ top: 'large' }}>
        <Tags tags={tags} onRemove={onRemove} />
      </Box>

      <Box pad={{ top: 'medium', bottom: 'large' }}>
        <TextInput
          value={search}
          suggestions={removeExistingTags()}
          onSelect={onSelect}
          onChange={onType}
          placeholder="Tags"
        />
      </Box>



    </Box>
  );
}


export default ListTagsFilter;
