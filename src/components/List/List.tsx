import { Box, Button, DataTable } from 'grommet';
import { Add, Up, Down } from 'grommet-icons';
import { createBrowserHistory } from 'history';
import { intersection } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Router, withRouter } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import styled from 'styled-components';
import { itemsDB } from '../../database/items';
import { IItem } from '../../models/items';
import Tags from '../reusable/Tags/Tags';
import ListNameFilter from './Filters/name';
import ListTagsFilter from './Filters/tags';

export const listHistory = createBrowserHistory();

const FilledSwipable = styled(Swipeable)`
  flex: 1 2 auto;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
`;

const List = ({ history }) => {
  const [items, setItems] = useState([] as IItem[]);
  const [isAscendingSort, setAsscendingSort] = useState(false);

  const toggleSort = () => setAsscendingSort(!isAscendingSort);

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
      header: 'Tags',
      render: datum => <Tags tags={datum.tags} />
    },
    {
      property: 'quantity',
      header: (
        <Box direction="row" align="center">
          <span>Qty</span>
          <Button icon={isAscendingSort ? <Up /> : <Down />} onClick={toggleSort} />
        </Box>
      )
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
    console.log(newFilter);
    setHasHadInitialFilter(true);

    if (!newFilter.name && !newFilter.tags) {
      setFilter(undefined);
    } else {
      setFilter({ ...filter ? filter : [], ...newFilter } as ListFilters | undefined);
    }
  }

  const [hasHadInitialFilter, setHasHadInitialFilter] = useState(false);

  const [filteredData, setFilteredData] = useState([] as IItem[]);

  useEffect(() => {
    updateFilteredData();
  }, [filter, items]);

  const updateFilteredData = () => {
    const filterCb = (item: IItem) => {
      if (item && filter) {
        const hasMatchingName = item.name && filter.name && item.name.toLowerCase().includes(filter.name.toLowerCase()) || false;
        const hasMatchingTags = filter.tags.size ? !!intersection(item.tags, filter.tags ? [...filter.tags] : []).length : true;

        return hasMatchingName || hasMatchingTags;
      }
      return true;
    }

    const sort = (a: IItem, b: IItem) => {
      return isAscendingSort ? a.quantity - b.quantity : b.quantity - a.quantity;
    };

    const data = Object.values(items)
      .filter(hasHadInitialFilter ? filterCb : () => true)
      .map(item => {
        if (!(item.quantity >= 0)) {
          item.quantity = 0;
        }
        return item;
      })
      .sort(sort);

    setFilteredData(data);
  };

  useEffect(() => {
    updateFilteredData();
  }, [isAscendingSort]);

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
