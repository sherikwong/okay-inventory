import React, { createContext, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router';
import { TextInput, Button, Keyboard, Box } from 'grommet';
import { Add } from 'grommet-icons';
import { tagsDB, ITag } from '../../../database/tags';
import SpinnerButton from '../../reusable/SpinnerButton/SpinnerButton';
import { renderTags } from '../../reusable/Tags/Tags';

export const ServerStatusContext = createContext({});

const Tags = ({ match, history }) => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    tagsDB.getAll()
      .then(incomingTags => {
        setTags(incomingTags);
        console.log(incomingTags);
      }).catch(error => console.log('Error fetching tags'));
  }, []);

  // suggestions={tags}
  // =1 { alterTags(1) } onRemove = { alterTags(- 1)

  const onSelect = suggestion => {
    console.log(suggestion);
  };

  const onAddNewTag = () => {
    if (search) {
      setError(false);
      setLoading(true);

      tagsDB.add({
        name: search,
        children: []
      }).then(res => {

        // tags.add(search);
        setSearch('');
        setLoading(false);
      }).catch(error => {
        console.log(error);
        setLoading(false);
        setError(true);
      })
    } else {
      setError(true);
    }
  }
  const inputBorderStyle = error ? {
    borderColor: '#FF4040'
  } : undefined;


  return (<>
    {renderTags(tags)}

    <Box direction="row">
      <Keyboard onEnter={onAddNewTag}>
        <TextInput
          style={inputBorderStyle}
          placeholder="Select tags"
          type="search"
          value={search}
          onChange={({ target: { value: searchValue } }) => setSearch(searchValue)}

          onSelect={({ suggestion }) => {
            setSearch('');
            onSelect(suggestion);
          }}
        /></Keyboard>

      <SpinnerButton icon={Add} onClick={onAddNewTag} loading={loading} setLoading={setLoading} />
    </Box>
  </>
  );
}

export default withRouter(Tags);
