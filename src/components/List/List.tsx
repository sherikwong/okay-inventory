import { Box, Button, DataTable, Keyboard } from 'grommet';
import { Add, Camera, Down, Refresh, Up, Copy, Trash } from 'grommet-icons';
import { createBrowserHistory } from 'history';
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
import SelectedCell from './Cell/Selected';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DateCell from './Cell/Date';
import { SmallButton } from './Cell/Selected';
import {Table, Tag} from 'antd';
import Tags from '../reusable/Tags/Tags';

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
  index?: number;
}

const List = ({ history }) => {
  const [filteredData, setFilteredData] = useState([] as IItem[]);
  const [reload, triggerReload] = useState(0);

  // const toggleSortQty = () => setAscQty(!isAscQty);
  // const toggleSortDate = () => setAscDate(!isAscDate);

  const items = useItems({ dependencies: reload });

  const [filter, setFilter] = useState({} as ListFilters | undefined);

  useEffect(() => {
    const data = Object.values(items)
      .map((item, index) => {
        if (!(item.quantity >= 0)) {
          item.quantity = 0;
        }
        return { ...item, date: new Date(item.date), index };
      });

    setFilteredData(data);
  }, [, items]);

  const updateDatum = (newItem: IEditableItem, triggerUpdate = true) => {
    const sanitizedItem: IEditableItem = { ...newItem };
    delete sanitizedItem.index;

    itemsDB.update(newItem.id, sanitizedItem);

    if (triggerUpdate) {
      triggerReload(reload + 1);
    }
  };

  const addNewItem = () => {
    const newItem = {
      date: new Date(),
    };

    itemsDB.add(newItem).then((item) => {
      triggerReload(reload + 1);
    });
  };


  const [selectedIDs, setSelectedIDs] = useState(new Set([] as string[]));

  const onItemSelect = ({ datum }: { datum: IEditableItem }) => {
    const _selectedIDs = new Set(selectedIDs);

    if (selectedIDs.has(datum.id)) {
      _selectedIDs.delete(datum.id);
    } else {
      _selectedIDs.add(datum.id);
    }

    setSelectedIDs(_selectedIDs);
  };


  const deleteItems = () => {
    selectedIDs.forEach((id) => {
      itemsDB.delete(id).then((res) => {
        const _selectedIDs = new Set(selectedIDs);
        _selectedIDs.delete(id);
        setSelectedIDs(_selectedIDs);
        triggerReload(reload + 1);
      });
    });
  };


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (value: any) => ( <span>{new Date(value).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>)
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (values: any[]) => values ? <Tags tags={values}/> : <></>
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <Keyboard>
      <ListContainer fill={true}>
        <Router history={listHistory}>
          <FilledSwipable>
          <Table dataSource={filteredData} columns={columns} />;
          </FilledSwipable>

          <Box direction="row" justify="center" margin="medium">
            <Button icon={<Add />} onClick={addNewItem} />


            <Button icon={<Trash />} onClick={deleteItems} />
          </Box>
        </Router>
      </ListContainer>
    </Keyboard>
  );
};

export default withRouter(List);

export interface ListFilters {
  name: string;
  tags: Set<string>;
}
