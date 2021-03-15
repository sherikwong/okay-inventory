import { Box, Button, DataTable, Header } from 'grommet';
import { Edit, LinkNext } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { modelsDB } from '../../../database/models';
import CloseButton from '../../reusable/CloseButton/CloseButton';
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

        return <Button icon={<Edit />} onClick={onClick} />;
      },
    },
    // {
    //   property: 'goTo',
    //   render: ({ id }) => {
    //     const onClick = () => history.push(`model/${id}`);

    //     return <Button icon={<LinkNext />} onClick={onClick} />;
    //   },
    // },
  ];

  return (
    <>
      <NavBox />
      <Header>Models</Header>
      <DataTable
        columns={columns}
        data={models}
        onClickRow={goToModel}
        primaryKey="id"
        pad="xxsmall"
      />
    </>
  );
};
