import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router';

export const ServerStatusContext = createContext({});

const EditItem = ({ match, history }) => {

  const [tags, setTags] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // tagsDB.once('value', res => {
    //   const unordered = res.val();
    //   const ordered = unordered.sort();

    //   setTags(ordered);
    // });
  }, []);

  return (
    <></>
    // <Tags value={details.tags} suggestions={tags} onSelect={alterTags(1)} onRemove={alterTags(-1)} />
  );
}

export default withRouter(EditItem);
