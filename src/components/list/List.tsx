import React, { useState } from 'react';
import { itemsDB } from '../../database/items';
import { IItem } from '../../models/items';
import './List.scss';

const List = () => {
  const [items, setItems] = useState([] as IItem[]);

  itemsDB.getAll()
    .then(items => setItems(items))
    .catch(error => console.error(error));



  return (
    <>
      {/* {items.map(item => (

      ))} */}
      {/*
      <DataTable
  columns={[
    {
      property: 'name',
      header: <Text>Name</Text>,
      primary: true,
    },
    {
      property: 'percent',
      header: 'Complete',
      render: datum => (
        <Box pad={{ vertical: 'xsmall' }}>
          <Meter
            values={[{ value: datum.percent }]}
            thickness="small"
            size="small"
          />
        </Box>
      ),
    },
  ]}
  data={[
    { name: 'Alan', percent: 20 },
    { name: 'Bryan', percent: 30 },
    { name: 'Chris', percent: 40 },
    { name: 'Eric', percent: 80 },
  ]}
/> */}
    </>



  );
};

export default List;
