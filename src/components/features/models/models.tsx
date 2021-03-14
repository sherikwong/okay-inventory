import { Box, DataTable } from 'grommet';
import React, { useEffect, useState } from 'react';
import { modelsDB } from '../../../database/models';

const columns = [
  {
    property: 'name',
    header: (
      <Box direction="row" align="center">
        <span>Name</span>
      </Box>
    ),
  },
];

export const Models = () => {
  const [models, setModels] = useState<any[]>([]);
  useEffect(() => {
    modelsDB.getAll().then((models) => setModels(Object.values(models)));
  }, []);

  useEffect(() => {
    console.log(models);
  }, [models]);

  return (
    <>
      Models
      <DataTable
        columns={columns}
        data={models}
        // onClickRow={}
        primaryKey="id"
        pad="xxsmall"
      />
    </>
  );
};
