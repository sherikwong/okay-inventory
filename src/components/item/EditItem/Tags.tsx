import { Box, Button, Calendar, Heading, TextInput } from 'grommet';
import { Close, Microphone, Previous, Menu } from 'grommet-icons';
import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import DictateButton from 'react-dictate-button';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { categoriesDB } from '../../../database/categories';
import { itemsDB } from '../../../database/items';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import Tags, { renderTags } from '../../reusable/Tags/Tags';
import { IItem } from '../../../models/items';

// const CalendarWithTopMargin = styled(Calendar)

const DictationButtonWrapper = styled(DictateButton)`
  background-color: transparent;
  border-color: transparent;
  margin: 10px;
  svg, button {
    transition: .2s;
    height: 10vh;
    width: 10vh;
  }

  &.active svg {
    stroke: #00C781;
  }
`;

const StepHeading = styled(Heading)`
  margin: 10px 0;
`;

enum ItemDetails {
  NAME = 'name',
  CATEGORY = 'category',
  DATE = 'date'
}


export const ServerStatusContext = createContext({});

const EditItem = ({ match, history }) => {

  const [tags, setTags] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    categoriesDB.once('value', res => {
      const unordered = res.val();
      const ordered = unordered.sort();

      setTags(ordered);
    });
  }, []);

  return (
    <Tags value={details.tags} suggestions={categories} onSelect={alterTags(1)} onRemove={alterTags(-1)} />
  );
}

export default withRouter(EditItem);
