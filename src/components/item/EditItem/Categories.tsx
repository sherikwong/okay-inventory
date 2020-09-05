import { List } from 'grommet';
import React, { useState } from 'react';
import { categoriesDB } from '../../../database/models/categories';


const Categories = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  return (
    <List data={categories} onClickItem={$event => onChange($event.target.innerHTML)} />
  );
}

export default Categories;
