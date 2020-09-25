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

  const [isAscQty, setAscQty] = useState(false);
  const toggleSortQty = () => setAscQty(!isAscQty);

  const [isAscDate, setAscDate] = useState(false);
  const toggleSortDate = () => setAscDate(!isAscDate);

  // useEffect(() => {
  let columns = [
    {
      property: 'date',
      header: (
        <Box direction="row" align="center">
          <span>Date</span>
          <Button icon={isAscDate ? <Up /> : <Down />} onClick={toggleSortDate} />
        </Box>
      ),
      render: datum => datum.date ? (<span>{new Date(datum.date).toLocaleDateString("en-US")}</span>) : <></>
    },
    {
      property: 'id',
      primary: true,
      render: datum => <></>,
      header: <></>,
    },
    {
      property: 'tags',
      // header: 'Tags',
      render: datum => (
        <Box>
          <span>{datum.name}</span>
          <Tags tags={datum.tags} />
        </Box>
      )
    },

    {
      property: 'quantity',
      header: (
        <Box direction="row" align="center">
          <span>Qty</span>
          <Button icon={isAscQty ? <Up /> : <Down />} onClick={toggleSortQty} />
        </Box>
      ),
    }
  ];

  useEffect(() => {
    itemsDB.getAll()
      .then(items => {
        if (items) {
          setItems(items);
        }
      }).catch(error => console.error(error));
  }, [])

  const createNew = () => {
    history.push('/items/new')
  }

  const onClickRow = ({ datum }) => {
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

    const sortQty = (a: IItem, b: IItem) => {
      return isAscQty ? a.quantity - b.quantity : b.quantity - a.quantity;
    };
    const sortDate = (a: IItem, b: IItem) => {
      return isAscDate ? +a.date - +b.date : +b.date - +a.date;
    };

    const data = Object.values(items)
      .filter(hasHadInitialFilter ? filterCb : () => true)
      .map(item => {
        if (!(item.quantity >= 0)) {
          item.quantity = 0;
        }
        return { ...item, date: new Date(item.date) };
      })
      .sort(sortQty)
      .sort(sortDate);

    setFilteredData(data);
  };

  useEffect(() => {
    updateFilteredData();
  }, [isAscQty, isAscDate]);

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
