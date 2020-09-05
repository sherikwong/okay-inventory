import React, { useState } from 'react';
import { itemsDB } from '../../database/items';
import './List.scss';


const List = () => {
  const [items, setItems] = useState();

  const itemsFromDb = itemsDB.getAll();

  setItems(itemsFromDb);

  console.log(items);

  return (
    <></>


  );
};

export default List;
