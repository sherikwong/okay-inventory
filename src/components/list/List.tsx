import React, { useState } from 'react';
import { itemsDB } from '../../database/items';
import { IItem } from '../../models/items';
import './List.scss';
import { DataTable, Text } from 'grommet';
import { useEffect } from 'react';
import { renderTags } from '../reusable/Tags/Tags';

const List = () => {
  const [items, setItems] = useState([] as IItem[]);


  useEffect(() => {
    itemsDB.getAll()
      .then(items => setItems(items))
      .catch(error => console.error(error));

  }, [])

  console.log(items);

  const columns = [
    {
      property: 'name',
      primary: true,
      header: (
        <Text>Name</Text>
      ),
    },
    {
      property: 'tags',
      primary: true,
      header: (
        <Text>Tags</Text>
      ),
      render: entry => renderTags(entry.tags)
    },
    {
      property: 'quantity',
      header: (
        <Text>#</Text>
      ),
    }
  ];


  return (
    <DataTable columns={columns} data={Object.values(items)} />

  );
};

export default List;
