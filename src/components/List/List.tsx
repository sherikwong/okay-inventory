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
  const [isAscQty, setAscQty] = useState(false);
  const [isAscDate, setAscDate] = useState(false);
  const [hasHadInitialFilter, setHasHadInitialFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([] as IItem[]);
  const [reload, triggerReload] = useState(0);

  const toggleSortQty = () => setAscQty(!isAscQty);
  const toggleSortDate = () => setAscDate(!isAscDate);

  const items = useItems({ dependencies: reload });

  const [filter, setFilter] = useState({} as ListFilters | undefined);

  const onFilter = (newFilter: ListFilters) => {
    setHasHadInitialFilter(true);

    if (!newFilter.name && !newFilter.tags) {
      setFilter(undefined);
    } else {
      setFilter({ ...(filter ? filter : []), ...newFilter } as
        | ListFilters
        | undefined);
    }
  };

  useEffect(() => {
    const filterCb = (item: IItem) => {
      if (!!item && !!filter) {
        const hasMatchingName =
          item.name && filter.name
            ? item.name.toLowerCase().includes(filter.name.toLowerCase())
            : false;
        // const hasMatchingTags =
        //   filter.tags && filter.tags.size
        //     ? !!_.intersection(item.tags, filter.tags ? [...filter.tags] : [])
        //         .length
        //     : true;
        // TODO: Fix
        const hasMatchingTags = false;

        return hasMatchingName && hasMatchingTags;
      }
      return true;
    };

    const sortQty = (a: IItem, b: IItem) => {
      return isAscQty ? a.quantity - b.quantity : b.quantity - a.quantity;
    };
    const sortDate = (a: IItem, b: IItem) => {
      return isAscDate ? +a.date - +b.date : +b.date - +a.date;
    };

    const data = Object.values(items)
      .filter(hasHadInitialFilter ? filterCb : () => true)
      .map((item, index) => {
        if (!(item.quantity >= 0)) {
          item.quantity = 0;
        }
        return { ...item, date: new Date(item.date), index };
      });
    // .sort(sortQty)
    // .sort(sortDate);

    setFilteredData(data);
  }, [filter, items, isAscQty, isAscDate, hasHadInitialFilter]);

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

  let columns = [
    {
      property: 'selected',
      header: <></>,
      render: (datum) => (
        <SelectedCell datum={datum} selectedIDs={selectedIDs} />
      ),
    },
    {
      property: 'date',
      header: (
        <Box direction="row" align="center">
          <span>Date</span>
          <SmallButton
            icon={isAscDate ? <Up /> : <Down />}
            onClick={toggleSortDate}
            isSelected={true}
          />
        </Box>
      ),
      render: (datum) => (
        <DateCell
          datum={datum}
          selectedIDs={selectedIDs}
          updateDatum={updateDatum}
        />
      ),
    },
    {
      property: 'id',
      primary: true,
      render: (datum) => <></>,
      header: <></>,
    },
    {
      property: 'name',
      header: <ListNameFilter onFilter={onFilter} />,
      render: (datum) => (
        <NameCell
          datum={datum}
          selectedIDs={selectedIDs}
          updateDatum={updateDatum}
          history={history}
        />
      ),
    },
    {
      property: 'tags',
      header: <ListTagsFilter onFilter={onFilter} />,
      render: (datum) => (
        <TagsCell
          datum={datum}
          selectedIDs={selectedIDs}
          updateDatum={updateDatum}
        />
      ),
    },

    {
      property: 'quantity',
      header: (
        <Box direction="row" align="center">
          <span>Qty</span>
          <SmallButton
            icon={isAscQty ? <Up /> : <Down />}
            onClick={toggleSortQty}
            isSelected={true}
          />
        </Box>
      ),
      render: (datum) => (
        <QuantityCell
          datum={datum}
          selectedIDs={selectedIDs}
          updateDatum={updateDatum}
          selectedID={selectedIDs}
        />
      ),
    },
    {
      property: 'actions',
      header: <></>,
      render: (datum) => (
        <ActionsCell
          datum={datum}
          selectedIDs={selectedIDs}
          history={history}
          refresh={() => triggerReload(reload + 1)}
          selectedID={selectedIDs}
          setSelectedID={setSelectedIDs}
        />
      ),
    },
  ];

  // const onSaveNew = () => {
  //   setNewItem({} as IEditableItem);
  //   triggerReload(reload + 1);
  //   setSelectedIDs(new Set([]));
  // }

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

  // useEffect(() => {
  //   setDataIncludingNew(newItem.id ? [newItem, ...filteredData] : filteredData);
  // }, [filteredData, newItem]);

  const goToCamera = () => {
    history.push('/');
  };

  const [highlightIndex, setHighlightIndex] = useState(0);

  const selectedStyle = {
    background: 'rgba(255, 255, 255, .1)',
  };

  const [rowStyles, setRowStyles] = useState({});
  const [linksToCopy, setLinksToCopy] = useState('');

  const generateLinks = () => {
    const prefix = 'http://sherikwong.com/item/';
    return [...selectedIDs].map((id) => prefix + id).join('\n\n');
  };

  useEffect(() => {
    const stylesAppliedToSelected = [...selectedIDs].reduce((obj, id) => {
      return {
        ...obj,
        [id]: selectedStyle,
      };
    }, {});
    setRowStyles(stylesAppliedToSelected);

    setLinksToCopy(generateLinks());
  }, [selectedIDs]);

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

  return (
    <Keyboard>
      <ListContainer fill={true}>
        <Box direction="row" margin="medium" justify="between">
          <Button icon={<Camera />} onClick={goToCamera} />
          <Button
            icon={<Refresh />}
            onClick={() => triggerReload(reload + 1)}
          />
        </Box>

        <Router history={listHistory}>
          <FilledSwipable>
            <DataTable
              columns={columns}
              rowProps={rowStyles}
              data={filteredData}
              onClickRow={onItemSelect}
              primaryKey="id"
              pad="xxsmall"
            />
          </FilledSwipable>

          <Box direction="row" justify="center" margin="medium">
            <Button icon={<Add />} onClick={addNewItem} />

            {selectedIDs.size > 0 && (
              <CopyToClipboard text={linksToCopy}>
                <Button icon={<Copy />} />
              </CopyToClipboard>
            )}

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
