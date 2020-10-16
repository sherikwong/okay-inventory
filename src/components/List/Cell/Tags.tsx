import React from 'react';
import ListTagsFilter from '../Filters/tags';
import Tags from '../../reusable/Tags/Tags';

const TagsCell = ({ datum, updateDatum, toggleEditMode }) => {
  const addTag = tags => {
    updateDatum({
      ...datum,
      tags: [...tags]
    })
  }
  return datum.isNewItem ? (
    <ListTagsFilter onFilter={addTag} />
  ) : <Tags tags={datum.tags} />;
}

export default TagsCell;
