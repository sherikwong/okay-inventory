import React, { useState } from 'react';
import { itemsDB } from '../../database/items';
import { IItem } from '../../models/items';
import './List.scss';
import { DataTable, Text, Box, Button } from 'grommet';
import { useEffect } from 'react';
import { renderTags } from '../reusable/Tags/Tags';
import { Add } from 'grommet-icons';
import { withRouter } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import styled from 'styled-components';

const FilledSwipable = styled(Swipeable)`
  flex: 1 2 auto;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
`;

const List = ({ history }) => {
  const [items, setItems] = useState([] as IItem[]);


  useEffect(() => {
    itemsDB.getAll()
      .then(items => setItems(
        Object.entries(items).map(([id, item]) => ({ ...item, id }))
      )).catch(error => console.error(error));

  }, [])

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

  const createNew = () => {
    history.push('/items/new')
  }




  const onClickRow = ({ datum }) => {
    console.log(datum, history);
    history.push(`/item/${datum.id}`);
  };

  return (

    <Box justify="between" direction="column" align="center" fill={true} id="list">
      <FilledSwipable onSwipedDown={createNew} >
        <DataTable columns={columns} data={Object.values(items).map((item, i) => ({ ...item, index: i }))} onClickRow={onClickRow} />

        <Box direction="row" justify="center" pad="medium">
          <Button primary icon={<Add />} onClick={createNew} />
        </Box>
      </FilledSwipable>
    </Box>


  );
};

export default withRouter(List);
