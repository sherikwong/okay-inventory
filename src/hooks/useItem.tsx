import { useEffect, useState } from 'react';
import { itemsDB } from '../database/items';
import { IItem } from '../models/items';


interface IUseItem {
  details: IItem;
  setDetails: Function;
}

const useItem: (id: string) => IUseItem = (id) => {
  const [_details, setDetails] = useState({
    name: '',
    date: new Date(),
    tags: [],
    quantity: 0
  });

  useEffect(() => {
    if (id) {
      itemsDB.get(id).then(res => {
        res.quantity = res.quantity === undefined ? 0 : res.quantity;
        setDetails({ ..._details, ...res });
      });
    }
  }, [id])

  const details = (_details || {}) as any as IItem;

  return { details, setDetails };
}

export default useItem;
