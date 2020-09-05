import { Layer, List } from 'grommet';
import React, { useState } from 'react';
import { categoriesDB } from '../../../../database/models/categories';
import CloseButton from '../../../reusable/CloseButton/CloseButton';

const CategoryModal = ({ setCategoriesModal, showCategoriesModal }) => {
  const [categories, setCategories] = useState([]);

  const onClickItem = ({ target }) => {
    const category = target.innerHTML;


  };

  categoriesDB.once('value', res => {
    const unordered = res.val();
    const ordered = unordered.sort();

    setCategories(ordered);
  });

  return (
    showCategoriesModal && (
      <Layer>
        <List data={categories} onClickItem={onClickItem} />

        <CloseButton onClick={() => setCategoriesModal(false)} />

      </Layer>
    ));
}

export default CategoryModal;
