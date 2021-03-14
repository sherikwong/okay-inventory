import { Box, Button, DataTable } from 'grommet';
import { Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { modelsDB } from '../../../database/models';
import CloseButton from '../../reusable/CloseButton/CloseButton';

export const Models = ({ history }) => {
  const [models, setModels] = useState<any[]>([]);
  useEffect(() => {
    modelsDB
      .getAll()
      .then((models) =>
        setModels(Object.values(models).filter((model) => model.id))
      );
  }, []);

  useEffect(() => {
    console.log(models);
  }, [models]);

  const columns = [
    {
      property: 'name',
      header: (
        <Box direction="row" align="center">
          <span>Name</span>
        </Box>
      ),
    },
    {
      property: 'edit',
      render: ({ id }) => {
        const onClick = () => history.push(`model/${id}`);

        return <Button icon={<Edit />} onClick={onClick} />;
      },
    },
  ];

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
