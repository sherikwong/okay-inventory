import { Box, Button, Collapsible, DataTable, Form } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { entriesDB } from '../../../database/entry';
import { modelsDB } from '../../../database/models';
import { IField } from '../../../types/form/field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { Container } from '../../reusable/container';
import { useExistingModel } from './new/new-model.utils';
export const Model = ({ match }) => {
  const modelID = match.params.id;
  const existingModel = useExistingModel(match);
  const [columns, setColumns] = useState<any[]>([]);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);

  useEffect(() => {
    if (existingModel) {
      const _columns = (existingModel.fields as IField[]).map(({ name }) => ({
        property: name,
        header: name,
      }));

      setColumns(_columns);
    }
  }, [existingModel]);

  const onSubmit = ({ value }) => {
    if (Object.entries(value).length) {
      // const existingItem = existingModel?.entries?.[modelID] || {};

      // if (!existingItem) {
      entriesDB.add(value).then((entry) => {
        modelsDB
          .update(match.params.id, {
            ...existingModel,
            entries: { ...existingModel.entries, [entry.id]: entry },
          })
          .then((res) => {
            setShowAddEntryForm(false);
          });
      });
      // }
    }
  };

  return (
    <>
      <DataTable columns={columns} />
      <Box margin={{ vertical: 'large' }} alignContent="center">
        <Button
          style={{ textAlign: 'center' }}
          icon={<Add />}
          size="small"
          onClick={() => setShowAddEntryForm(!showAddEntryForm)}
        />
      </Box>

      <Collapsible direction="vertical" open={showAddEntryForm}>
        <Container>
          <Form onSubmit={onSubmit}>
            <DynamicForm fields={existingModel?.fields || []} />
            <Button type="submit" label="Add Field" />
          </Form>
        </Container>
      </Collapsible>
    </>
  );
};
