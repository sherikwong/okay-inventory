import { DataTable } from 'grommet';
import React, { useEffect, useState } from 'react';
import { IField } from '../../../types/form/field';
import { useExistingModel } from './new/new-model.utils';
export const Model = ({ match }) => {
  const existingModel = useExistingModel(match);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    if (existingModel) {
      const _columns = (existingModel.fields as IField[]).map(({ name }) => ({
        property: name,
        header: name
      }));

      setColumns(_columns);
    }
  }, [existingModel]);

  return <DataTable columns={columns} />;
};
