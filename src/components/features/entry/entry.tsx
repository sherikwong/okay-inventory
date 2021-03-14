import { Box, Button, Form } from 'grommet';
import { Save, Trash } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { entriesDB } from '../../../database/entry';
import { modelsDB } from '../../../database/models';
import { IEntry } from '../../../models/entry';
import { IModel } from '../../../models/models';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import BackButton from '../../reusable/BackButton/BackButton';
import NavBox from '../../reusable/NavBox/NavBox';

export const Entry = ({ match }) => {
  const entryID = match.params.id;
  const [entry, setEntry] = useState<IEntry | undefined>();
  const [model, setModel] = useState<IModel | undefined>();

  useEffect(() => {
    entriesDB.get(entryID).then((_entry) => {
      if (_entry) {
        setEntry(_entry);
        modelsDB.get(_entry.modelID).then((model) => {
          console.log(model);
          setModel(model);
        });
      }
    });
  }, [match]);

  const updateEntry = ({ value }) => {
    entriesDB.update(entryID, { ...entry, ...value });
  };

  const deleteEntry = () => {
    entriesDB.delete(entryID);
  };

  return (
    <>
      <NavBox>
        <Button icon={<Trash />} onClick={deleteEntry} />
      </NavBox>
      <Form onSubmit={updateEntry}>
        <DynamicForm fields={model?.fields || []} />
        <Button icon={<Save />} type="submit" />
      </Form>
    </>
  );
};
