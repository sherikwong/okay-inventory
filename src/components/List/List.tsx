import { Box, Button, DataTable } from 'grommet';
import { Add, Camera, Down, Refresh, Up } from 'grommet-icons';
import { createBrowserHistory } from 'history';
import { intersection } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Router, withRouter } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import styled from 'styled-components';
import { itemsDB } from '../../database/items';
import useItems from '../../hooks/useItems';
import { IItem } from '../../models/items';
import ActionsCell from './Cell/actions';
import NameCell from './Cell/Name';
import QuantityCell from './Cell/Quantity';
import TagsCell from './Cell/Tags';
import ListNameFilter from './Filters/name';
import ListTagsFilter from './Filters/tags';
import './List.scss';

export const listHistory = createBrowserHistory();

const ListContainer = styled(Box)`
  height: 100vh;
`;

const FilledSwipable = styled(Swipeable)`
  flex: 1 2 auto;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  overflow: auto;
  width: 100%;
`;

interface IEditableItem extends IItem {
  isNewItem?: boolean;
}

const List = ({ history }) => {
  const [isAscQty, setAscQty] = useState(false);
  const [isAscDate, setAscDate] = useState(false);
  const [hasHadInitialFilter, setHasHadInitialFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([] as IItem[]);
  const [newItem, setNewItem] = useState({} as IEditableItem);
  const [dataIncludingNew, setDataIncludingNew] = useState(filteredData);
  const [isEditMode, toggleEditMode] = useState(false);
  const [reload, triggerReload] = useState(0);

  const toggleSortQty = () => setAscQty(!isAscQty);
  const toggleSortDate = () => setAscDate(!isAscDate);



  const items = useItems({ dependencies: reload });



  const [filter, setFilter] = useState({
  } as ListFilters | undefined);

  const onFilter = (newFilter: ListFilters) => {
    setHasHadInitialFilter(true);

    if (!newFilter.name && !newFilter.tags) {
      setFilter(undefined);
    } else {
      setFilter({ ...filter ? filter : [], ...newFilter } as ListFilters | undefined);
    }
  }

  useEffect(() => {
    const filterCb = (item: IItem) => {
      if (!!item && !!filter) {
        const hasMatchingName = (item.name && filter.name) ? item.name.toLowerCase().includes(filter.name.toLowerCase()) : false;
        const hasMatchingTags = (filter.tags && filter.tags.size) ? !!intersection(item.tags, filter.tags ? [...filter.tags] : []).length : true;

        return hasMatchingName && hasMatchingTags;
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
  }, [filter, items, isAscQty, isAscDate, hasHadInitialFilter, newItem]);


  const dateOpts = { month: 'short', day: 'numeric' };


  const updateDatum = (newItem: IEditableItem, triggerUpdate = true) => {
    const sanitizedItem: IEditableItem = { ...newItem };
    delete sanitizedItem.isNewItem;

    itemsDB.update(newItem.id, sanitizedItem);

    if (triggerUpdate) {
      refresh();
    }
  }


  const addNewItem = () => {
    const newItem = {
      date: new Date(),
    };

    itemsDB.add(newItem).then(item => {
      setNewItem({
        ...newItem,
        ...item,
        id: item.id,
        isNewItem: true
      });
    });
  };

  let columns = [
    {
      property: 'date',
      header: (
        <Box direction="row" align="center">
          <span>Date</span>
          <Button icon={isAscDate ? <Up /> : <Down />} onClick={toggleSortDate} />
        </Box>
      ),
      render: datum => datum.date ? (<span>{new Date(datum.date).toLocaleDateString("en-US", dateOpts)}</span>) : <></>
    },
    {
      property: 'id',
      primary: true,
      render: datum => (<></>),
      header: <></>,
    },
    {
      property: 'name',
      header: (
        <ListNameFilter onFilter={onFilter} />
      ),
      render: datum => <NameCell datum={datum} updateDatum={updateDatum} />
    },
    {
      property: 'tags',
      header: (
        <ListTagsFilter onFilter={onFilter} />
      ),
      render: datum => <TagsCell datum={datum} updateDatum={updateDatum} toggleEditMode={toggleEditMode} />
    },

    {
      property: 'quantity',
      header: (
        <Box direction="row" align="center">
          <span>Qty</span>
          <Button icon={isAscQty ? <Up /> : <Down />} onClick={toggleSortQty} />
        </Box>
      ),
      render: datum => <QuantityCell datum={datum} updateDatum={updateDatum} toggleEditMode={toggleEditMode} />
    }, {
      property: 'actions',
      header: <></>,
      render: datum => <ActionsCell datum={datum}  history={history} refresh={refresh} onSave={onSaveNew} selectedID={selectedID} setSelectedID={setSelectedID}/>
    }];

  const refresh = () => {
    triggerReload(reload + 1);
  }

  const onSaveNew = () => {
    setNewItem({} as IEditableItem);
    refresh();
    setSelectedID('');
  }

  const [selectedID, setSelectedID] = useState('');

  const onItemSelect = ({datum}) => {
    setSelectedID(datum.id);
  }

  useEffect(() => {
    setDataIncludingNew([newItem, ...filteredData]);
  }, [filteredData, newItem]);

  const goToCamera = () => {
    history.push('/');
  }

  return (
    <ListContainer fill={true}>
      <Box direction="row" margin="medium" justify="between">
        <Button icon={<Camera />} onClick={goToCamera} />
        <Button icon={<Refresh />} onClick={refresh} />
      </Box>


      <Router history={listHistory}>
        <FilledSwipable >
          <DataTable columns={columns}
            data={dataIncludingNew}
            onClickRow={onItemSelect}
            primaryKey="id"
            pad="xxsmall"
          />
        </FilledSwipable>

        <Box direction="row" justify="center" margin="medium">
          <Button icon={<Add />} onClick={addNewItem} />
        </Box>
      </Router>

    </ListContainer>
  );
};

export default withRouter(List);

export interface ListFilters {
  name: string;
  tags: Set<string>;
}
