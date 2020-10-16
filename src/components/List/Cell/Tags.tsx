import React from 'react';
import Tags from '../../reusable/Tags/Tags';
import ListTagsFilter from '../Filters/tags';

const TagsCell = ({ datum, updateDatum, toggleEditMode }) => {
  const addTag = ({tags}) => {
    updateDatum({
      ...datum,
      tags: [...tags]
    }, false);
  }
  return datum.isNewItem ? (
    <ListTagsFilter onFilter={addTag} />
  ) : <Tags tags={datum.tags} />;
}

export default TagsCell;
