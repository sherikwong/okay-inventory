import { Heading } from 'grommet';
import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import DictateButton from 'react-dictate-button';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { tagsDB } from '../../../database/tags';
import Tags from '../../reusable/Tags/Tags';

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
  TAG = 'tag',
  DATE = 'date'
}


export const ServerStatusContext = createContext({});

const EditItem = ({ match, history }) => {

  const [tags, setTags] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tagsDB.once('value', res => {
      const unordered = res.val();
      const ordered = unordered.sort();

      setTags(ordered);
    });
  }, []);

  return (
    <Tags value={details.tags} suggestions={tags} onSelect={alterTags(1)} onRemove={alterTags(-1)} />
  );
}

export default withRouter(EditItem);
