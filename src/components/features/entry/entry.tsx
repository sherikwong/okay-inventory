import React from 'react';
import { useEffect, useState } from 'react';
import { entriesDB } from '../../../database/entry';
import { modelsDB } from '../../../database/models';
import { IEntry } from '../../../models/entry';
import { IModel } from '../../../models/models';
import { DynamicForm } from '../../dynamic-form/dynamic-form';

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

  return <DynamicForm fields={model?.fields || []} />;
};
