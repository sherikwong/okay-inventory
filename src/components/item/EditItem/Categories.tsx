import { List } from 'grommet';
import React, { useState } from 'react';
import { categoriesDB } from '../../../database/models/categories';


const Categories = ({ value, onChange, onStep }) => {
  const [categories, setCategories] = useState([]);

  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  const onClick = $event => {
    onChange($event.target.innerHTML);
    onStep(1)
  }

  return (
    <List data={categories} onClickItem={onClick} />
  );
}

export default Categories;


// https://codesandbox.io/s/3y0wzv59om?file=/components/Tag.js:164-551
