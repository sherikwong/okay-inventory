import { Box, Button, DataTable, Heading } from 'grommet';
import { Add, Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { modelsDB } from '../../../database/models';
import NavBox from '../../reusable/NavBox/NavBox';

export const Models = ({ history }) => {
  const [models, setModels] = useState<any[]>([]);
  useEffect(() => {
    modelsDB
      .getAll()
      .then((models) =>
        setModels(Object.values(models).filter((model) => model.id))
      );
  }, []);

  const goToModel = ({ datum }) => {
    history.push(`/model/${datum.id}`);
  };

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
        const onClick = ($event) => {
          $event.stopPropagation();
          history.push(`model/${id}/edit`);
        };

        return (
          <Box>
            <Button alignSelf="end" icon={<Edit />} onClick={onClick} />
          </Box>
        );
      },
    },
  ];

  const goToAddModel = () => {
    history.push('/model/new');
  };

  return (
    <>
      <NavBox />
      <Box margin="medium">
        <Heading level={3} alignSelf="center">
          Models
        </Heading>
        <DataTable
          columns={columns}
          data={models}
          onClickRow={goToModel}
          primaryKey="id"
          pad="xxsmall"
        />
        <Button alignSelf="center" icon={<Add />} onClick={goToAddModel} />
      </Box>
    </>
  );
};
