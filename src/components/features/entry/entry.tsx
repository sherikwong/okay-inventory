import { Button, Form } from 'grommet';
import { Save, Trash } from 'grommet-icons';
import React from 'react';
import { entriesDB } from '../../../database/entry';
import { useEntry } from '../../../hooks/useEntry';
import { useModel } from '../../../hooks/useModel';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import NavBox from '../../reusable/NavBox/NavBox';

export const Entry = ({ match }) => {
  const entry = useEntry(match.params.id);
  const model = useModel(entry?.modelID);

  const updateEntry = ({ value }) => {
    if (entry) {
      entriesDB.update(entry.id, { ...entry, ...value });
    }
  };

  const deleteEntry = () => {
    if (entry) {
      entriesDB.delete(entry.id);
    }
  };

  return (
    <>
      <NavBox>
        <Button icon={<Trash />} onClick={deleteEntry} />
      </NavBox>
      <Form onSubmit={updateEntry}>
        <DynamicForm fields={model?.fields || {}} />
        <Button icon={<Save />} type="submit" />
      </Form>
    </>
  );
};
