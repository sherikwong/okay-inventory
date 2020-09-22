import React, { useState } from 'react';
import { itemsDB } from '../../database/items';
import { IItem } from '../../models/items';
import { DataTable, Text, Box, Button } from 'grommet';
import { useEffect } from 'react';
import { Add } from 'grommet-icons';
import { withRouter, BrowserRouter, Router, Route } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import ListTagsFilter from './Filters/tags';
import ListNameFilter from './Filters/name';
import { intersection } from 'lodash';

export const listHistory = createBrowserHistory();

const FilledSwipable = styled(Swipeable)`
  flex: 1 2 auto;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
`;

const List = ({ history }) => {
  const [items, setItems] = useState([] as IItem[]);

  // let columns;

  // useEffect(() => {
  let columns = [
    // columns = [
    {
      property: 'id',
      primary: true,
      render: datum => <></>,
      header: <></>,
    },
    {
      property: 'name',
      header: 'Name'
    },
    {
      property: 'tags',
      header: 'Tags'
    },
    {
      property: 'quantity',
      header: '#'
    }
  ];
  // }, [items])


  useEffect(() => {
    itemsDB.getAll()
      .then(items => {
        if (items) {
          setItems(items);

          // updateFilteredData();
        }
      }).catch(error => console.error(error));



  }, [])

  const createNew = () => {
    history.push('/items/new')
  }


  const onClickRow = ({ datum }) => {
    // console.log(datum, history);
    history.push(`/item/${datum.id}`);
  };

  const [filter, setFilter] = useState({
    name: '',
    tags: new Set([])
  } as ListFilters | undefined);

  const onFilter = (newFilter: ListFilters) => {
    if (!newFilter.name && !newFilter.tags) {
      setFilter(undefined);
    } else {
      setFilter({ ...filter ? filter : [], ...newFilter } as ListFilters | undefined);
    }
  }

  const [filteredData, setFilteredData] = useState([] as IItem[]);

  useEffect(() => {
    updateFilteredData();
  }, [filter, items]);

  const updateFilteredData = () => {

    const data = Object.values(items)
      .filter((item: IItem) => {
        if (item && filter) {
          const hasMatchingName = item.name && filter.name && item.name.includes(filter.name) || false;
          const hasMatchingTags = !!intersection(item.tags, [...filter.tags]).length

          return hasMatchingName || hasMatchingTags;
        }
        return true;
      })
      .map((item, i) => ({ ...item }));

    setFilteredData(data);
  };

  useEffect(() => {
  }, [filteredData, items])

  return (
    <Router history={listHistory}>


      {/* <Route path="/list/filter/tags">

{/* </Route> */}


      <ListNameFilter onFilter={onFilter} />
      <ListTagsFilter onFilter={onFilter} />

      {/* <Route exact path="/list"> */}
      <Box justify="between" direction="column" align="center" fill={true} id="list">
        <FilledSwipable onSwipedDown={createNew} >
          <DataTable columns={columns} data={filteredData}
            onClickRow={onClickRow}
            primaryKey="id" />

          <Box direction="row" justify="center" pad="medium">
            <Button primary icon={<Add />} onClick={createNew} />
          </Box>
        </FilledSwipable>
      </Box>
      {/* </Route> */}
    </Router>





  );
};

export default withRouter(List);

export interface ListFilters {
  name: string;
  tags: Set<string>;
}
