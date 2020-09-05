import { Button, List, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React, { useState } from 'react';
import { categoriesDB } from '../../../../database/models/categories';
import './Category.scss';

const CategoryModal = ({ setCategoriesModal, showCategoriesModal }) => {
  const [categories, setCategories] = useState([]);

  const onClickItem = item => console.log(item.target.innerHTML);

  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  return (
    showCategoriesModal && (
      <Layer>
        <List data={categories} onClickItem={onClickItem} />


      </Layer>
    ));
}

export default CategoryModal;
