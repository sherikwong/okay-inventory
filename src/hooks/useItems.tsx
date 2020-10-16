import { useEffect } from 'react';
import { itemsDB } from '../database/items';
import {useState} from 'react';
import { IItem } from '../models/items';

const useItems = ({dependencies}) => {
  const [items, setItems] = useState([] as IItem[]);

  useEffect(() => {
    itemsDB.getAll()
      .then(_items => {
        if (_items) {
          setItems(_items);
        }
      }).catch(error => console.error(error));
  }, [dependencies]);

  return items;
};

export default useItems;
